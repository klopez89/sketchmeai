let isCurrentlyPaginatingPrompts = false;
let collectionId_Test = 'aHTPJCMl5mVgrZzZhNHP'

window.onload = function() {
    console.log("window.onload from generate page");
    addImageGrid();
    configureGenerateForm();
    resizeGrid();
    configureInfiniteScroll();

    let userRecId = getUserRecId();
    let lastDocId = null;
    fetchGenerations(userRecId, collectionId_Test, lastDocId);
}

window.onresize = function() {
    resizeGrid();
}

let cold_boot_delay = 180000; // 3 minutes in milliseconds for custom models
let cold_booting_time = 600000; // 10 minutes in milliseconds for custom models to turn cold w/o use
let status_check_interval = 2500; // 5 seconds in milliseconds
var coldBootedModels = {};

function configureGenerateForm() {
    document.getElementById("generateForm").addEventListener("submit", generateButtonPressed, true);
}


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


            if (generations.length === 0) {
                console.log('Didnt find any more images to load. all done paginating!');
                hideInfiniteLoader();
                saveLastDocIdLocally(null);
                setTimeout(function() {
                  isCurrentlyPaginatingPrompts = false;
                }, 50);
                return
            }

            if (hasAnotherPage === false) {
                hideInfiniteLoader();
            }

            generations.forEach(function(generation) {
                let new_grid_item_html = newGridItemHTML({ generationId: generation.rec_id });
                let new_grid_item_div = $($.parseHTML(new_grid_item_html));

                new_grid_item_div.find('p').html('');

                new_grid_item_div.hide().appendTo('#collection-grid').fadeIn(function() {
                    new_grid_item_div.find('img').first().removeClass('hidden');

                    let actualImage = new Image();
                    actualImage.onload = function() {
                        new_grid_item_div.find('img').attr('src', this.src);
                        new_grid_item_div.find('#gen-loader').hide();
                    };
                    actualImage.src = generation.signed_gen_url;
                });
            });

            saveLastDocIdLocally(lastDocId);
            isCurrentlyPaginatingPrompts = false;

            $('#grid-loader').addClass('hidden');
            $('#infiniteLoader').removeClass('hidden');
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
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
    console.log("fireGenerateCall");

    let new_grid_item_html = newGridItemHTML({ generationId: jsonObject.generationId });
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
            console.log("error");
            console.log(data);
        }
    });
}

const PredictionStatus = {
    IN_PROGRESS: 'in_progress',
    BEING_HANDLED: 'being_handled',
    FAILED: 'failed',
    SUCCEEDED: 'succeeded',
    CANCELED: 'canceled'
};


function startListeningForGenerationUpdates(userRecId, collectionId, generationId) {
    console.log('startListeningForGenerationUpdates');
    console.log(`userRecId: ${userRecId}, collectionId: ${collectionId}, generationId: ${generationId}`);
    let unsubscribe = db.collection('users').doc(userRecId)
        .collection('collections').doc(collectionId)
        .collection('generations').doc(generationId)
        .onSnapshot((doc) => {

            generation_dict = doc.data();
            prediction_status = generation_dict['prediction_status'];
            signed_gen_url = generation_dict['signed_gen_url'];

            const gen_element = document.querySelector(`li[generation-id="${generationId}"]`);

            if (prediction_status === PredictionStatus.BEING_HANDLED) {
                gen_element.querySelector('#gen-status').innerHTML = '...generating';
            }

            if (prediction_status === PredictionStatus.SUCCEEDED) {
                gen_element.querySelector('#gen-loader').classList.add('hidden');
                gen_element.querySelector('img').src = signed_gen_url;
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.FAILED) {
                console.log('generation failed');
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.CANCELED) {
                console.log('generation canceled');
                unsubscribe(); // Stop listening for updates
            }

            console.log(`for gen_id: ${generationId} prediction_status is ${prediction_status}`);
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
        console.log(`scrollTop: ${scrollableContainer.scrollTop}, clientHeight: ${scrollableContainer.clientHeight}, scrollHeight: ${scrollableContainer.scrollHeight}`);

        if ((scrollableContainer.scrollTop + scrollableContainer.clientHeight) >= scrollableContainer.scrollHeight) {
            console.log(`The value of isCurrentlyPaginatingPrompts is: ${isCurrentlyPaginatingPrompts}`)
            if (isCurrentlyPaginatingPrompts) {
                console.log("Already paginating prompts, so don't do it again!");
                return
            } else {
                const last_doc_id = getLastDocIdFromLocalStorage();
                console.log(`We are at the bottom of the generation grid! With last_doc_id: ${last_doc_id}`);
                if (last_doc_id != null) {
                    isCurrentlyPaginatingPrompts = true;
                    console.log("the value of isCurrentlyPaginatingPrompts is now: ", isCurrentlyPaginatingPrompts);
                    fetchGenerations(getUserRecId(), collectionId_Test, last_doc_id);
                }
            }
        }
    });
  }

function hideInfiniteLoader() {
    $('#infiniteLoader').addClass('hidden');
}

function saveLastDocIdLocally(last_doc_id) {
    localStorage.setItem('last_doc_id', last_doc_id);
  }
  
function getLastDocIdFromLocalStorage() {
    return localStorage.getItem('last_doc_id');
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