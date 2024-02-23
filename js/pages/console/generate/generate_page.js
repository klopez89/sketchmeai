let isCurrentlyPaginatingPrompts = false;
let collectionId_Test = 'VZZnwEopc3TyE7gJV2Oc'
let cold_boot_delay = 180000; // 3 minutes in milliseconds for custom models
let cold_booting_time = 600000; // 10 minutes in milliseconds for custom models to turn cold w/o use
let status_check_interval = 2500; // 5 seconds in milliseconds
var coldBootedModels = {};

console.log("configuring generatation page");
addImageGrid();
addBaseGenMenu();
configureGenerateForm();
resizeGrid();
configureInfiniteScroll();
setupAccordion();

let userRecId = getUserRecId();
let lastDocId = null;
fetchGenerations(userRecId, collectionId_Test, lastDocId);
fetchWorkingModels(userRecId);

/////////////////////////////////////////////////////////////////////

window.onresize = function() {
    resizeGrid();
}

function configureGenerateForm() {
    document.getElementById("generateForm").addEventListener("submit", generateButtonPressed, true);
}

function randomizeSeed(event) {
    event.preventDefault();
    document.getElementById('seed').value = -1;
}

function setupAccordion() {
    const accordionButton = document.querySelector('[data-te-target="#collapseOne5"]');
    const accordionContent = document.querySelector('#collapseOne5');

    accordionButton.addEventListener('click', function() {
        // Listen for the end of the transition on the accordionContent
        accordionContent.addEventListener('transitionend', function handler(e) {
            // Ensure the transitionend event is for the property you're interested in, if necessary
            // For example, if you're only interested in the height property completing its transition:
            // if (e.propertyName === 'height') {
            const buttonText = accordionButton.lastChild;
            console.log('Transition ended. Current content classlist: ', accordionContent.classList);
            if (accordionContent.classList.contains('hidden')) {
                console.log('about to make it say Show Settings');
                buttonText.nodeValue = buttonText.nodeValue.replace('Hide Settings', 'Show Settings');
            } else {
                buttonText.nodeValue = buttonText.nodeValue.replace('Show Settings', 'Hide Settings');
                console.log('about to make it say Hide Settings');
            }
            // Remove this event listener once the transition is complete to avoid it being called multiple times
            accordionContent.removeEventListener('transitionend', handler);
            // }
        });
    });
}

function fetchWorkingModels(userRecId) {
    $.ajax({
        url: CONSTANTS.BACKEND_URL + 'models/working',
        type: 'POST',
        data: JSON.stringify({
            userRecId: userRecId,
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            models = data.models;
            models.forEach(function(model) {
                
                let model_id = model.rec_id;
                let replicate_name = model.replicate_name;
                let instKey = model.token_string ? model.token_string : "zxc";
                let long_version = model.version;
                let short_version = long_version.includes(':') ? long_version.split(':')[1] : long_version;
                console.log('long version: ', long_version, 'short version: ', short_version);
                let model_name = model.name;
            
                let new_model_option_html = new_model_option(model_id, instKey, replicate_name, short_version, model_name);
                let new_model_option_div = $($.parseHTML(new_model_option_html));
                new_model_option_div.hide().appendTo('#model-dropdown').fadeIn();
            });
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}


var sample_new_grid_item = null;

function fetchGenerations(userRecId, collectionId, lastDocId) {
    $.ajax({
        url: CONSTANTS.BACKEND_URL + 'generations',
        type: 'POST',
        data: JSON.stringify({
            userRecId: userRecId,
            collectionId: collectionId,
            lastDocId: lastDocId
        }),
        contentType: 'application/json',
        dataType: 'json',
        success: function(data) {
            generations = data.generations;
            hasAnotherPage = data.has_another_page;
            lastDocId = data.last_doc_id;
            // console.log(`data from generations: ${generations}`)
            // console.log(`hasAnotherPage: ${hasAnotherPage}, lastDocId: ${lastDocId}`);


            if (generations == null) {
                console.log('Didnt find any more images to load. all done paginating!');
                $('#grid-loader').addClass('hidden');
                hideInfiniteLoader();
                removeLastDocId();
                setTimeout(function() {
                  isCurrentlyPaginatingPrompts = false;
                }, 50);
                return
            }

            generations.forEach(function(generation) {
                
                let new_grid_item_html = newGenItem_FromExistingGen(generation);
                let new_grid_item_div = $($.parseHTML(new_grid_item_html));
                new_grid_item_div.find('img').first().removeClass('hidden');

                new_grid_item_div.hide().appendTo('#collection-grid').fadeIn(function() {

                    let gen_element = document.querySelector(`div[generation-id="${generation.rec_id}"]`);

                    if (generation.prediction_status === PredictionStatus.IN_PROGRESS) {
                        gen_element.querySelector('#gen-status').innerHTML = '...queued';
                        startListeningForGenerationUpdates(userRecId, collectionId, generation.rec_id);
                    } else if (generation.prediction_status === PredictionStatus.BEING_HANDLED) {
                        gen_element.querySelector('#gen-status').innerHTML = '...generating';
                    
                        let cancel_button = gen_element.querySelector('#cancel-button');
                        cancel_button.addEventListener('click', function() {
                            gen_element.querySelector('#gen-status').innerHTML = '...cancelling';
                            cancelGeneration(generation.replicate_prediction_id, gen_element, generation);
                            cancel_button.classList.add('hidden');
                        });
                        cancel_button.classList.remove('hidden');
                        startListeningForGenerationUpdates(userRecId, collectionId, generation.rec_id);
                    } else if (generation.prediction_status === PredictionStatus.CANCELED) {
                        gen_element.querySelector('img').classList.remove('hidden');
                        gen_element.querySelector('#gen-status').innerHTML = '';
                        loadGenImage(CANCELED_IMG_URL, gen_element);
                        configureCopyButton(generation, gen_element);
                    } else if (generation.prediction_status === PredictionStatus.FAILED) {
                        gen_element.querySelector('img').classList.remove('hidden');
                        gen_element.querySelector('#gen-status').innerHTML = '';
                        loadGenImage(FAILED_IMG_URL, gen_element);
                        configureCopyButton(generation, gen_element);
                    } else if (generation.prediction_status === PredictionStatus.SUCCEEDED) {
                        gen_element.querySelector('#gen-status').innerHTML = '';
                        gen_element.querySelector('img').classList.remove('hidden');
                        loadGenImage(generation.signed_gen_url, gen_element);
                        configureCopyButton(generation, gen_element);
                    }
                });
            });

            saveLastDocIdLocally(lastDocId);
            isCurrentlyPaginatingPrompts = false;
            $('#grid-loader').addClass('hidden');
            
            if (hasAnotherPage === false) {
                console.log('reaady to hide the infinite loader');
                hideInfiniteLoader();
                removeLastDocId();
            } else {
                showInfiniteLoader();
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

function loadGenImage(gen_url, new_grid_item_div) {
    let genCompMenu = document.querySelector('#console-content .gen-comp-menu');
    let actionContainer = new_grid_item_div.querySelector('#action-container');

    let genCompMenuCopy = genCompMenu.cloneNode(true);
    genCompMenuCopy.classList.remove('hidden');
    actionContainer.appendChild(genCompMenuCopy);
    actionContainer.classList.remove('hidden');

    let imgElement = new_grid_item_div.querySelector('img');
    let actualImage = new Image();
    actualImage.onload = function() {
        imgElement.src = this.src;
        imgElement.setAttribute('data-te-img', this.src);
        new_grid_item_div.querySelector('#gen-loader').classList.add('hidden');
        imgElement.classList.add('opacity-100');
        imgElement.classList.remove('opacity-0');
    };
    actualImage.src = gen_url;
}

function configCopyButton(div, generation) {
    div.find('button').click(function() {
        copyPromptInfoFromGen(generation);
        console.log(`clicked on generation button, gen info: ${generation.rec_id}`);
    });
}

function copyPromptInfoFromGen(generation) {
    document.getElementById("prompt").value = generation.gen_recipe.prompt;
    document.getElementById("neg-prompt").value = generation.gen_recipe.neg_prompt;
    document.getElementById('gen-count').value = 1;
    document.getElementById('denoising-steps').value = generation.gen_recipe.inference_steps;
    document.getElementById('guidance-scale').value = generation.gen_recipe.guidance_scale;
    document.getElementById('seed').value = generation.gen_recipe.seed;
    document.getElementById('img-2-img').value = generation.gen_recipe.img2img_url;
    document.getElementById('prompt-strength').value = generation.gen_recipe.prompt_strength;
    document.getElementById('lora-scale').value = generation.gen_recipe.lora_scale;

    var options = document.getElementById('model-dropdown').options;
    var selected = false; // Flag to keep track if a matching option was found
    var potentiallyTweakedPrompt = generation.gen_recipe.prompt;
    console.log('about to try to set model: ', generation.model_version);
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute('version') === generation.model_version) {
        let instanceKey = options[i].getAttribute('instkey');
        if (potentiallyTweakedPrompt.includes(instanceKey)) {
          potentiallyTweakedPrompt = potentiallyTweakedPrompt.replace(instanceKey,'zxc');
        }
  
        options[i].selected = true;
        selected = true;
      } else {
        options[i].selected = false;
      }
    }
  
    // If no matching option was found, only select the first option and deselect all others
    if (!selected) {
      for (var i = 0; i < options.length; i++) {
        if (i === 0) {
          options[i].selected = true;
        } else {
          options[i].selected = false;
        }
      }
    }
}

function generateButtonPressed(event) {
    event.preventDefault();

    let userRecId = getUserRecId();
    if (userRecId == null) {
        console.log("User is signed out. Message user to sign in.");
        return;
    }
    console.log('we have userRecId: ', userRecId);

    let promptValues = promptInputValues();
    console.log("promptValues: ", promptValues);

    isUrlExpired = isImageUrlExpired(promptValues.img2imgUrl);
    if (isUrlExpired) {
        console.log('url is expired');
        displayErrorBanner('Reference image url is expired. Try a different a different url.');
        return;
    }

    let prompt = promptValues.prompt;
    
    var seedToUse = promptValues.seed;
    let hasChosenSeed = seedToUse != -1;
    let numberOfImages = hasChosenSeed ? 1 : promptValues.numberOfImages;
    let shouldResetSeed = !hasChosenSeed && promptValues.shouldUseRandomSeedAcrossModels

    let modelValues = promptValues.modelValues;
    let versionValues = promptValues.versionValues;
    let instanceKeys = promptValues.instanceKeys;

    for (var j = 0; j < numberOfImages; j++) {
        if (shouldResetSeed) {
            seedToUse = Math.floor(Math.random() * 429496719);
        }
        for (var i = 0; i < modelValues.length; i++) {
            let modelName = modelValues[i];
            let versionName = versionValues[i];
            let instanceKey = instanceKeys[i];

            let genericPersonId = 'zxc';
            let personalizedPrompt = prompt.includes(genericPersonId) ? prompt.replace(genericPersonId, instanceKey) : prompt;

            var jsonObject = {
                generationId: generateId(),
                userRecId: userRecId,
                modelName: modelName,
                modelVersion: versionName,
                prompt: personalizedPrompt,
                negativePrompt: promptValues.negativePrompt,
                gscale: promptValues.gscale,
                seed: promptValues.seed,
                img2imgUrl: promptValues.img2imgUrl,
                promptStrength: promptValues.promptStrength,
                inferenceSteps: promptValues.inferenceSteps,
                loraScale: promptValues.loraScale,
                resWidth: promptValues.resWidth,
                resHeight: promptValues.resHeight,
                scheduler: promptValues.scheduler,
                refine: promptValues.refine,
                highNoiseFrac: promptValues.highNoiseFrac,
            };

            fireGenerateCall(jsonObject);
        }
    }
}

function fireGenerateCall(jsonObject) {
    console.log("fireGenerateCall, with jsonObject: ", jsonObject);

    let new_grid_item_html = newGenItem_FromNewGen(jsonObject.generationId);
    let new_grid_item_div = $($.parseHTML(new_grid_item_html));
    new_grid_item_div.hide().prependTo('#collection-grid').fadeIn(function() {
        new_grid_item_div.find('img').first().removeClass('hidden');
    });
    
    let action = `${CONSTANTS.BACKEND_URL}generate/new`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify(jsonObject),
        contentType: "application/json",
        dataType: 'json',
        success: function(data) {
            console.log("success");
            console.log(data);
            collection_id = data.collection_id;
            generation_id = data.generation_id;
            console.log(`the locally created gen id: ${jsonObject.generationId}, and served gen id: ${generation_id}`)
            startListeningForGenerationUpdates(jsonObject.userRecId, collection_id, generation_id);
        },
        error: function(data) {
            new_grid_item_div.fadeOut(function() {
                new_grid_item_div.remove();
            });
            let responseText = data.responseText;
            let statusCode = data.status;
            console.log('The type of error for generate new endpoint is: ', responseText);
            if (statusCode === 414) { // insufficient funds
                showPaymentModal(true);
            }
        }
    });
}

function cancelGeneration(predictionId, gen_element, generation) {
    let action = `${CONSTANTS.BACKEND_URL}generate/cancel`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            replicate_prediction_id: predictionId
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function(data) {
            console.log(data);
            gen_element.querySelector('img').classList.remove('hidden');
            gen_element.querySelector('#gen-status').innerHTML = '';
            loadGenImage(CANCELED_IMG_URL, gen_element);
            configureCopyButton(generation, gen_element);
        },
        error: function(data) {
            console.log("error cancelling generation");
            console.log(data);
        }
    });
}

function startListeningForGenerationUpdates(userRecId, collectionId, generationId) {
    console.log('startListeningForGenerationUpdates');
    console.log(`userRecId: ${userRecId}, collectionId: ${collectionId}, generationId: ${generationId}`);
    let unsubscribe = db.collection('users').doc(userRecId)
        .collection('collections').doc(collectionId)
        .collection('generations').doc(generationId)
        .onSnapshot((doc) => {
            let generation_dict = doc.data();
            let prediction_status = generation_dict['prediction_status'];
            let signed_gen_url = generation_dict['signed_gen_url'];

            const gen_element = document.querySelector(`div[generation-id="${generationId}"]`);
            if (prediction_status === PredictionStatus.IN_PROGRESS) {
                gen_element.querySelector('#gen-status').innerHTML = '...queued';
            } else if (prediction_status === PredictionStatus.BEING_HANDLED) {
                gen_element.querySelector('#gen-status').innerHTML = '...generating';
                let cancel_button = gen_element.querySelector('#cancel-button');
                cancel_button.addEventListener('click', function() {
                    gen_element.querySelector('#gen-status').innerHTML = '...cancelling';
                    cancelGeneration(generation_dict.replicate_prediction_id, gen_element, generation_dict);
                    cancel_button.classList.add('hidden');
                });
                cancel_button.classList.remove('hidden');
            } else if (prediction_status === PredictionStatus.SUCCEEDED) {
                gen_element.querySelector('#gen-loader').classList.add('hidden');
                gen_element.querySelector('#gen-status').innerHTML = '';
                loadGenImage(signed_gen_url, gen_element);
                // configure_main_gen_button(generation_dict, gen_element);
                configureCopyButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.FAILED) {
                console.log('generation failed');
                gen_element.querySelector('#gen-status').innerHTML = '';
                loadGenImage(FAILED_IMG_URL, gen_element);
                // configure_main_gen_button(generation_dict, gen_element);
                configureCopyButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.CANCELED) {
                console.log('generation canceled');
                gen_element.querySelector('#gen-status').innerHTML = '';
                loadGenImage(CANCELED_IMG_URL, gen_element);
                // configure_main_gen_button(generation_dict, gen_element);
                configureCopyButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            }

            console.log(`for gen_id: ${generationId} prediction_status is ${prediction_status}`);
    });
}

function configure_main_gen_button(gen_dict, gen_element) {
    let main_gen_button = gen_element.querySelector('#main-gen-button');
    main_gen_button.addEventListener('click', function() {
        copyPromptInfoFromGen(gen_dict);
    });
    main_gen_button.classList.remove('pointer-events-none');
}

function configureCopyButton(gen_dict, gen_element) {
    gen_element.querySelector('#action-container').classList.remove('hidden');
    copyButton = gen_element.querySelector('#copy-button');
    copyButton.addEventListener('click', function(event) {
        copyPromptInfoFromGen(gen_dict);
        event.stopPropagation();
    });
}

function checkStatusPeriodically(modelName) {
    if (modelName.includes('stability-ai')) {
        // Model does not require cold booting, start periodic checks immediately
    } else if (coldBootedModels[modelName]) {
        // Model has already been cold booted, reset the cold booting timer
        clearTimeout(coldBootedModels[modelName].coolingTimer);
        coldBootedModels[modelName].coolingTimer = setTimeout(function() {
            delete coldBootedModels[modelName]; // Clear the model from the coldBootedModels after 10 minutes
        }, cold_booting_time);
    } else {
        // Model requires cold booting, setup cooling timer
        coldBootedModels[modelName] = {
            coolingTimer: setTimeout(function() {
                delete coldBootedModels[modelName]; // Clear the model from the coldBootedModels after 10 minutes
            }, cold_booting_time) 
        };
    }
}

function addImageGrid() {
    let dummy_grid_html = dummyGridHTML();
    let dummy_grid_div = $($.parseHTML(dummy_grid_html));
    $('#console-content').append(dummy_grid_div);
}

function addBaseGenMenu() {
    let base_gen_menu_html = baseGenMenuHTML();
    let base_gen_menu_div = $($.parseHTML(base_gen_menu_html));
    $('#console-content').append(base_gen_menu_div);
}

function resizeGrid() {
    const leftColumnHeight = document.getElementById('generateForm').clientHeight;
    const adjustedForPaddingHeight = leftColumnHeight + 2 * 16;
    // Set the max-height of the collection grid container to the height of the left column
    document.getElementById('collection-grid-container').style.height = adjustedForPaddingHeight + 'px';
}

function configureInfiniteScroll() {
    const scrollableContainer = document.getElementById("collection-grid-container");
    scrollableContainer.addEventListener("scroll", () => {
        if ((scrollableContainer.scrollTop + scrollableContainer.clientHeight) >= scrollableContainer.scrollHeight) {
            if (isCurrentlyPaginatingPrompts) {
                return
            } else {
                const last_doc_id = getLastDocIdFromLocalStorage();
                if (last_doc_id != null) {
                    isCurrentlyPaginatingPrompts = true;
                    fetchGenerations(getUserRecId(), collectionId_Test, last_doc_id);
                }
            }
        }
    });
  }

function hideInfiniteLoader() {
    $('#infiniteLoader').addClass('hidden');
}

function showInfiniteLoader() {
    $('#infiniteLoader').removeClass('hidden');
}

function saveLastDocIdLocally(last_doc_id) {
    localStorage.setItem('last_doc_id', last_doc_id);
  }
  
function getLastDocIdFromLocalStorage() {
    return localStorage.getItem('last_doc_id');
}

function removeLastDocId() {
    localStorage.removeItem('last_doc_id');
}

function promptInputValues() {
    let prompt = document.getElementById("prompt").value;
    let numberOfImages = document.getElementById('gen-count').value;
    let inferenceSteps = document.getElementById('denoising-steps').value;
    let negativePrompt = document.getElementById("neg-prompt").value;
    let gscale = document.getElementById('guidance-scale').value;
    let seed = document.getElementById('seed').value;
    let img2imgUrl = document.getElementById('img-2-img').value;
    let promptStrength = document.getElementById('prompt-strength').value;
    let loraScale = document.getElementById('lora-scale').value;
    let shouldUseRandomSeedAcrossModels = document.getElementById('same-seed').checked;

    let dropdown = document.getElementById('model-dropdown');
    let selectedOptions = dropdown.selectedOptions;
    var modelValues = [];
    var versionValues = [];
    var instanceKeys = [];
    for (var i = 0; i < selectedOptions.length; i++) {
        modelValues.push(selectedOptions[i].getAttribute('model'));
        versionValues.push(selectedOptions[i].getAttribute('version'));
        instanceKeys.push(selectedOptions[i].getAttribute('instkey'));
    }
  
    return {
        prompt: prompt,
        numberOfImages: numberOfImages,
        inferenceSteps: inferenceSteps,
        negativePrompt: negativePrompt,
        gscale: gscale,
        seed: seed,
        img2imgUrl: img2imgUrl,
        promptStrength: promptStrength,
        loraScale: loraScale,
        resWidth: 1024,
        resHeight: 1024,
        scheduler: 'K_EULER',
        refine: 'no_refiner',
        highNoiseFrac: 0.9,
        shouldUseRandomSeedAcrossModels: shouldUseRandomSeedAcrossModels,
        modelValues: modelValues,
        versionValues: versionValues,
        instanceKeys: instanceKeys,
    }
}

function genMenuShowing(event) {
    event.preventDefault();
    closeAnyOpenGenMenus();
    let genElement = event.target.closest('[generation-id]');
    let genMenuShield = genElement.querySelector('#gen-menu-shield');
    genMenuShield.classList.remove('hidden');
    event.stopPropagation();
}

function deleteButtonPressed(event) {
    event.preventDefault();
    let genElement = event.target.closest('[generation-id]');
    hideGenMenuShield(genElement);
    let generationId = genElement.getAttribute('generation-id');
    console.log(`delete button pressed for generationId: ${generationId}`);
    setGenLoaderToDeleteMode(genElement);
    fireGenDeletion(generationId, genElement);
    event.stopPropagation();
}

function setGenLoaderToDeleteMode(genElement) {
    let genLoader = genElement.querySelector('#gen-loader');
    let actionContainer = genElement.querySelector('#action-container');
    genLoader.classList.remove('hidden');
    genLoader.classList.add('bg-opacity-75');
    actionContainer.classList.add('hidden');
}

function resetGenLoaderFromDelete(genElement) {
    let genLoader = genElement.querySelector('#gen-loader');
    let actionContainer = genElement.querySelector('#action-container');
    genLoader.classList.add('hidden');
    genLoader.classList.remove('bg-opacity-75');
    actionContainer.classList.remove('hidden');
}

function removeGenItem(genElement) {
    $(genElement).fadeOut(function() {
        $(this).remove();
    });
}

function fireGenDeletion(generationId, genElement) {
    let action = `${CONSTANTS.BACKEND_URL}generate/delete`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            generationId: generationId,
            collectionId: collectionId_Test,
            userRecId: getUserRecId()
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from delete gen endpoint for id: ', generationId);
            removeGenItem(genElement);
        },
        error: function (data) {
            console.log("error deleting generation with id: ", generationId);
            console.log('error from endpoint is: ', data);
            resetGenLoaderFromDelete(genElement);
        }
    });
}

function clickedOutsideOfGenMenu() {
    closeAnyOpenGenMenus();
}

function clickedOnEmptyPartOfGrid() {
    console.log('clickedOnEmptyPartOfGrid was called');
    closeAnyOpenGenMenus();
}

function closeAnyOpenGenMenus() {
    let genCompMenus = document.querySelectorAll('.gen-comp-menu');
    let openMenus = Array.from(genCompMenus).filter(menu => {
        return menu.__x.$data.open;
    });
    openMenus.forEach((menu) => {
        menu.__x.$data.open = false;
        let genElement = menu.closest('[generation-id]');
        hideGenMenuShield(genElement);
    });
}

function hideGenMenuShield(genElement) {
    let genMenuShield = genElement.querySelector('#gen-menu-shield');
    genMenuShield.classList.add('hidden');
}

function tappedGenMenuShield(event) {
    let genCompMenu = event.target.parentElement.querySelector('.gen-comp-menu');
    genCompMenu.__x.$data.open = false;
    event.target.classList.add('hidden');
    event.stopPropagation();
}

function goingToLightbox(event) {
    console.log('goingToLightbox was called');
    closeAnyOpenGenMenus();
    event.stopPropagation();
}