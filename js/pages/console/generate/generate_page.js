
let isCurrentlyPaginatingPrompts = false;
let collectionId_Test = 'VZZnwEopc3TyE7gJV2Oc'
let cold_boot_delay = 180000; // 3 minutes in milliseconds for custom models
let cold_booting_time = 600000; // 10 minutes in milliseconds for custom models to turn cold w/o use
let status_check_interval = 2500; // 5 seconds in milliseconds
var coldBootedModels = {};

console.log("configuring generatation page");
addImageGrid();
configureGenerateForm();
resizeGrid();
configureInfiniteScroll();

let userRecId = getUserRecId();
let lastDocId = null;
fetchGenerations(userRecId, collectionId_Test, lastDocId);

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
            console.log(`data from generations: ${generations}`)
            console.log(`hasAnotherPage: ${hasAnotherPage}, lastDocId: ${lastDocId}`);


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
                console.log(`generation time begun value is ${generation.time_begun}`);
                let new_grid_item_html = newGenItem_FromExistingGen(generation);
                let new_grid_item_div = $($.parseHTML(new_grid_item_html));
                new_grid_item_div.find('img').first().removeClass('hidden');

                new_grid_item_div.hide().appendTo('#collection-grid').fadeIn(function() {

                    if (sample_new_grid_item == null) {
                        sample_new_grid_item = new_grid_item_div;
                    }

                    // Alpine.initializeComponent(new_grid_item_div[0]);
                    let gen_element = document.querySelector(`div[generation-id="${generation.rec_id}"]`);
                
                    if (generation.prediction_status === PredictionStatus.IN_PROGRESS) {
                        new_grid_item_div.find('#gen-status').html('...queued');
                        startListeningForGenerationUpdates(userRecId, collectionId, generation.rec_id);
                    } else if (generation.prediction_status === PredictionStatus.BEING_HANDLED) {
                        new_grid_item_div.find('#gen-status').html('...generating');
                        cancel_button = gen_element.querySelector('#cancel-button');
                        cancel_button.addEventListener('click', function() {
                            gen_element.querySelector('#gen-status').innerHTML = '...cancelling';
                            cancelGeneration(generation.replicate_prediction_id);
                            cancel_button.classList.add('hidden');
                        });
                        cancel_button.classList.remove('hidden');
                        startListeningForGenerationUpdates(userRecId, collectionId, generation.rec_id);
                    } else if (generation.prediction_status === PredictionStatus.CANCELED) {
                        new_grid_item_div.find('img').first().removeClass('hidden');
                        new_grid_item_div.find('#gen-status').html('');
                        loadGenImage(CANCELED_IMG_URL, gen_element);
                        // configure_main_gen_button(generation, gen_element);
                        configureCopyButton(generation, gen_element);
                    } else if (generation.prediction_status === PredictionStatus.FAILED) {
                        new_grid_item_div.find('img').first().removeClass('hidden');
                        new_grid_item_div.find('#gen-status').html('');
                        loadGenImage(FAILED_IMG_URL, gen_element);
                        // configure_main_gen_button(generation, gen_element);
                        configureCopyButton(generation, gen_element);
                    } else if (generation.prediction_status === PredictionStatus.SUCCEEDED) {
                        new_grid_item_div.find('img').first().removeClass('hidden');
                        new_grid_item_div.find('#gen-status').html('');
                        loadGenImage(generation.signed_gen_url, gen_element);
                        // configure_main_gen_button(generation, gen_element);
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
    console.log('about to try to set model: ', generation.model_name);
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute('model') === generation.model_name) {
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

    Alpine.initializeComponent(new_grid_item_div[0]);

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
            console.log("error");
            console.log(data);
        }
    });
}

function cancelGeneration(predictionId) {
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
                cancel_button = gen_element.querySelector('#cancel-button');
                cancel_button.addEventListener('click', function() {
                    gen_element.querySelector('#gen-status').innerHTML = '...cancelling';
                    cancelGeneration(generation_dict.replicate_prediction_id);
                    cancel_button.classList.add('hidden');
                });
                cancel_button.classList.remove('hidden');
            } else if (prediction_status === PredictionStatus.SUCCEEDED) {
                gen_element.querySelector('#gen-loader').classList.add('hidden');
                loadGenImage(signed_gen_url, gen_element);
                // configure_main_gen_button(generation_dict, gen_element);
                configureCopyButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.FAILED) {
                console.log('generation failed');
                loadGenImage(FAILED_IMG_URL, gen_element);
                // configure_main_gen_button(generation_dict, gen_element);
                configureCopyButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.CANCELED) {
                console.log('generation canceled');
                loadGenImage(CANCELED_IMG_URL, gen_element);
                // configure_main_gen_button(generation_dict, gen_element);
                configureCopyButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            }

            console.log(`for gen_id: ${generationId} prediction_status is ${prediction_status}`);
    });
}

function configure_main_gen_button(gen_dict, gen_element) {
    main_gen_button = gen_element.querySelector('#main-gen-button');
    main_gen_button.addEventListener('click', function() {
        copyPromptInfoFromGen(gen_dict);
    });
    main_gen_button.classList.remove('pointer-events-none');
}

function configureCopyButton(gen_dict, gen_element) {
    gen_element.querySelector('#action-container').classList.remove('hidden');
    copyButton = gen_element.querySelector('#copy-button');
    copyButton.addEventListener('click', function() {
        copyPromptInfoFromGen(gen_dict);
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