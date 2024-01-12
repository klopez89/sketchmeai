
window.onload = function() {
    console.log("window.onload from genrate page");
    addImageGrid();
    configureGenerateForm();
    resizeGrid();
}

window.onresize = function() {
    resizeGrid();
}

let cold_boot_delay = 180000; // 3 minutes in milliseconds for custom models
let cold_booting_time = 600000; // 10 minutes in milliseconds for custom models to turn cold w/o use
var coldBootedModels = {};

function configureGenerateForm() {
    document.getElementById("generateForm").addEventListener("submit", generateButtonPressed, true);
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
    new_grid_item_div.hide().prependTo('#collection-grid').fadeIn();

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
            checkStatusPeriodically(jsonObject.userRecId, collection_id, generation_id, jsonObject.modelName);
        },
        error: function(data) {
            console.log("error");
            console.log(data);
        }
    });
}


function checkStatusPeriodically(userRecId, collectionId, generationId, modelName) {
    if (modelName.includes('stability-ai')) {
        // Model does not require cold booting, start periodic checks immediately
        startPeriodicChecks(0);
    } else if (coldBootedModels[modelName]) {
        // Model has already been cold booted, reset the cold booting timer
        clearTimeout(coldBootedModels[modelName].coolingTimer);
        coldBootedModels[modelName].coolingTimer = setTimeout(function() {
            delete coldBootedModels[modelName]; // Clear the model from the coldBootedModels after 10 minutes
        }, cold_booting_time); // 10 minutes in milliseconds
        startPeriodicChecks(0);
    } else {
        // Model requires cold booting, apply the delay and set up cooling timer
        startPeriodicChecks(cold_boot_delay); // 3 minutes in milliseconds for custom models
        coldBootedModels[modelName] = {
            coolingTimer: setTimeout(function() {
                delete coldBootedModels[modelName]; // Clear the model from the coldBootedModels after 10 minutes
            }, cold_booting_time) 
        };
    }

    function startPeriodicChecks(delay) {
        setTimeout(function() {
            dataObj = {
                userRecId: userRecId,
                collectionId: collectionId,
                generationId: generationId
            }
            var checkingTimer = setInterval(function() {
                $.ajax({
                    type: 'POST',
                    url: `${CONSTANTS.BACKEND_URL}generate/status`,
                    data: JSON.stringify(dataObj),
                    contentType: "application/json",
                    dataType: 'json',
                    success: function(data) {
                        
                        console.log(data);
                        
                        if (data.gen_url) {
                            const liElement = document.querySelector(`li[generation-id="${data.gen_id}"]`);
                            liElement.querySelector('.loader').classList.add('hidden');
                            liElement.querySelector('img').src = data.gen_url;
                        }

                        if (data.status !== 'in_progress' && data.status !== 'being_handled') {
                            console.log(`clearing interval check for generation id: ${data.gen_id}, and status: ${data.status}`);
                            clearInterval(checkingTimer); // Stop checking on satisfying success
                        } else {
                            console.log(`generation still being worked on with id: ${data.gen_id}, status: ${data.status}`);
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error("Failed to fetch status:", error);
                        clearInterval(checkingTimer); // Stop checking on error
                    }
                });
            }, 5000); // Check every 5 seconds (adjust interval as needed)
        }, delay);
    }
}

function addImageGrid() {
    let dummy_grid_html = dummyGridHTML();
    let dummy_grid_div = $($.parseHTML(dummy_grid_html));
    $('#console-content').append(dummy_grid_div);

    let dummy_grid_data_html = createGridHTML(20);
    let dummy_grid_data_div = $($.parseHTML(dummy_grid_data_html));
    $('#collection-grid').append(dummy_grid_data_div);
}

function resizeGrid() {
    const leftColumnHeight = document.getElementById('generateForm').clientHeight;
    const adjustedForPaddingHeight = leftColumnHeight + 2 * 16;
    // Set the max-height of the collection grid container to the height of the left column
    document.getElementById('collection-grid-container').style.maxHeight = adjustedForPaddingHeight + 'px';
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