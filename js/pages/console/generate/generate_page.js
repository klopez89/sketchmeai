let isCurrentlyPaginatingPrompts = false;
let cold_boot_delay = 180000; // 3 minutes in milliseconds for custom models
let cold_booting_time = 600000; // 10 minutes in milliseconds for custom models to turn cold w/o use
let status_check_interval = 2500; // 5 seconds in milliseconds
const genEstimateCostPerDenoisingStep = 0.00128;
var coldBootedModels = {};
var previousModelSelectionId = null;
let sdxlPlaceholderText = "Drawing of cute dalmation puppy in the backyard, highly detailed";
var promptPlaceholderText = sdxlPlaceholderText;

addImageGrid();
addBaseGenMenu();
configureGenerateForm();
resizeGrid();
configureInfiniteScroll();
setupAccordion();
showBasicExamplesButton();
configureModelListInput();
configurePromptInputPlaceholder(); 

let userRecId = getUserRecId();
let collectionId = getLastEditedCollection();
let lastDocId = null;
fetchGenerations(userRecId, collectionId, lastDocId);
fetchWorkingModels(userRecId);

document.querySelectorAll('.editable').forEach(function(element){
    element.contentEditable = true;
});

/////////////////////////////////////////////////////////////////////

window.onresize = function() {
    resizeGrid();
    moveForm()
}


function moveForm() {
    var form = document.getElementById('generateForm');
    if (window.innerWidth >= 768) { // Tailwind's 'md' breakpoint
        document.getElementById('generate-form-container').appendChild(form);
    } else {
        document.getElementById('sidebar-gen-form-container').prepend(form);
    }
}

function showBasicExamplesButton() {
    // document.getElementById('basic-examples-button').classList.remove('hidden');
}

function configurePromptInputPlaceholder() {
    let promptDiv = document.getElementById('prompt');
    promptDiv.addEventListener('focus', removePlaceholder);
    promptDiv.addEventListener('blur', promptAboutToLoseFocus);
    togglePlaceholder();
}

function promptAboutToLoseFocus() {
    togglePlaceholder();
    triggerModelNameInPromptFormatting();
}

function togglePlaceholder() {
    let promptDiv = document.getElementById('prompt');
    if (!promptDiv.textContent.trim().length ) {
        promptDiv.textContent = promptPlaceholderText;
        promptDiv.classList.remove('text-gray-900');
        promptDiv.classList.add('text-gray-400');
    }
}

function removePlaceholder() {
    let promptDiv = document.getElementById('prompt');

    console.log('In remove placeholder, textcontent: ', promptDiv.textContent, ' promptPlaceholderText: ', promptPlaceholderText);
    if (promptDiv.textContent === promptPlaceholderText) {
        if (promptDiv.classList.contains('text-gray-400')) {
            promptDiv.textContent = '';
        }
        promptDiv.classList.remove('text-gray-400');
        promptDiv.classList.add('text-gray-900');
    }
}

function isPromptInputShowingPlaceholder() {
    let promptDiv = document.getElementById('prompt');
    return promptDiv.classList.contains('text-gray-400');
}

function configureModelListInput() {
    const modelDropdown = document.getElementById('model-dropdown');
    previousModelSelectionId = modelDropdown.options[modelDropdown.selectedIndex].id; // Store the initial selection id

    modelDropdown.addEventListener('change', function() {
        const newSelectionId = modelDropdown.options[modelDropdown.selectedIndex].id;
        console.log('Model selection changed. New selection id:', newSelectionId, ", previous selection id: ", previousModelSelectionId);

        // Get the option elements for both previous and new selections
        const previousOption = modelDropdown.querySelector(`option[id="${previousModelSelectionId}"]`);
        const newOption = modelDropdown.querySelector(`option[id="${newSelectionId}"]`);

        // Get the modelname attribute values for both previous and new selections
        const previousModelName = previousOption ? previousOption.getAttribute('modelname') : '';
        const newModelName = newOption ? newOption.getAttribute('modelname') : '';

        const previousReplicateName = previousOption.getAttribute('model');
        const newReplicateName = newOption.getAttribute('model');

        console.log('New replicate model name:', newReplicateName);
        if (newReplicateName.includes('custom_sdxl')) {
            promptPlaceholderText = `Drawing of ${newModelName} wearing a sleek black leather jacket`;
        } else {
            promptPlaceholderText = sdxlPlaceholderText;
        }

        // Try to swap trained model name with another selected trained model. Else set the appropriate placeholder if in placeholder state 
        const promptInput = document.getElementById('prompt');
        
        if (previousReplicateName.includes('custom_sdxl') && newReplicateName.includes('custom_sdxl')) {
            // Swap the modelName in the prompt if it exists
            const promptInput = document.getElementById('prompt');
            const promptText = promptInput.textContent || promptInput.innerText;

            if (promptText.includes(previousModelName)) {
                promptInput.textContent = promptText.replace(previousModelName, newModelName);
            }
        } else if (isPromptInputShowingPlaceholder()) {
            promptInput.textContent = promptPlaceholderText;
        }

        // Update the previous selection id for the next change event
        previousModelSelectionId = newSelectionId;

        triggerModelNameInPromptFormatting();
        updateGenerationEstimateLabel();
    });
}

function triggerModelNameInPromptFormatting() {
    let promptInput = document.getElementById('prompt')
    let promptValues = promptInputValues();
    let modelNames = promptValues.modelNames;
    console.log("Model Names:", modelNames);
    console.log("Prompt Input:", promptInput.textContent);
    formatAroundModelName(modelNames, promptInput);
}

function configureGenerateForm() {
    document.getElementById("generateForm").addEventListener("submit", generateButtonPressed, true);
    let promptInput = document.getElementById('prompt')
    promptInput.addEventListener('input', function(event) {
        console.log('promptInput value: ', promptInput.innerHTML);
        let promptValues = promptInputValues();
        let modelNames = promptValues.modelNames;
        formatAroundModelName(modelNames, promptInput);
    });

    promptInput.addEventListener('paste', function(e) {
        // Prevent the default paste behavior
        e.preventDefault();
      
        // Get the text from the clipboard
        const text = (e.originalEvent || e).clipboardData.getData('text/plain');
      
        // Modern approach using the Clipboard API
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(text));
      });

    promptInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            generateButtonPressed(event)
        }
    });
    
    let negativePromptInput = document.getElementById('neg-prompt');
    negativePromptInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            generateButtonPressed(event)
        }
    });

    let denoisingStepsInput = document.getElementById('denoising-steps');
    denoisingStepsInput.addEventListener('input', function(event) {
        updateGenerationEstimateLabel();
    });

    const seedInput = document.getElementById('seed');
    seedInput.placeholder = 'Random';
    seedInput.addEventListener('blur', function() {
        if (seedInput.value.trim() === '') {
            // seedInput.value = '-1'; // Reset to default value when input loses focus and is empty
            seedInput.placeholder = 'Random'; // Reset placeholder
        }
    });

    let img2imgField = document.getElementById('img-2-img');
    document.getElementById('img-2-img').addEventListener('drop', function(event) {
        console.log('Received a drop event listener in img2img field');
        event.preventDefault();
        const dataTransfer = event.dataTransfer;
        if (dataTransfer && dataTransfer.items) {
            for (let item of dataTransfer.items) {
                if (item.kind === 'string' && item.type === 'text/html') {
                    item.getAsString(function(s) {
                        // Create a temporary element to parse the HTML string
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = s;
                        // Attempt to find an img element and retrieve its src
                        const img = tempDiv.querySelector('img');
                        if (img && img.src) {
                            // Now you have the src of the dragged image
                            console.log('Dragged image src:', img.src);
                            img2imgField.value = img.src;
                            // You can now use img.src as needed for your application
                        }
                    });
                }
            }
        }
    });
}

function formatAroundModelName(modelNames, promptInputDiv) {
    const initialCaretPos = getInitialCaretPosition(promptInputDiv);
    // Extract all substrings wrapped in <b></b> tags
    const boldedSubstrings = promptInputDiv.innerHTML.match(/<b>(.*?)<\/b>/g);

    // Check if the substrings match the modelName and remove the tags if they don't
    if (boldedSubstrings) {
        boldedSubstrings.forEach(substring => {
            // Extract the text inside the <b></b> tags
            const boldedModelName = substring.match(/<b>(.*?)<\/b>/)[1];
            // Strip any spaces from the model name in order to check against list of selected model names
            const cleanedModelName = boldedModelName.replace(/&nbsp;/g, ' ').replace(/\s+/g, '');
            if (!modelNames.includes(cleanedModelName)) {
                console.log('Removing bold tags from:', boldedModelName);
                promptInputDiv.innerHTML = promptInputDiv.innerHTML.replace(substring, boldedModelName);
                setCaretPosition(promptInputDiv, initialCaretPos);
            }
        });
    }

    // Loop through each modelName and apply the bold formatting to any instance of the model name
    for (let i = 0; i < modelNames.length; i++) {
        let modelName = modelNames[i];
        if (modelName == null) {
            continue;
        }

        const regex = new RegExp(`(?<!<b[^>]*>|<b>)\\b${modelName}\\b(?!<\/b>)`, 'g');

        if (promptInputDiv.innerHTML.includes(modelName)) {
            const modelInBoldRegex = new RegExp(`(<b>(?:\\s|&nbsp;)*${modelName}(?:\\s|&nbsp;)*<\/b>)`, 'gi');
            let doesModelNameHaveBoldTags = modelInBoldRegex.test(promptInputDiv.innerHTML);
           
            if (doesModelNameHaveBoldTags == false) {
                console.log('trying to add bold tags if model name doesnt have em');
                let newPromptValue = promptInputDiv.innerHTML.replace(regex, '<b>$&</b>');
                console.log('newPromptValue: ', newPromptValue);
                promptInputDiv.innerHTML = promptInputDiv.innerHTML.replace(regex, '<b>$&</b>');
                if (document.activeElement === promptInputDiv) {
                    setTimeout(() => {
                        setCaretPosition(promptInputDiv, initialCaretPos);
                    }, 0);
                }
            }
        }
    }
}

function getInitialCaretPosition(element) {
    let caretPos = 0;
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretPos = preCaretRange.toString().length;
    }
    return caretPos;
}

function setCaretPosition(element, offset) {
    let range = document.createRange();
    let sel = window.getSelection();
    let childNodes = element.childNodes;
    let length = 0;
    let foundNode = null;

    // Find the text node and the correct offset within that node
    for (let node of childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            length += node.length;
            if (length >= offset) {
                foundNode = node;
                offset -= (length - node.length);
                break;
            }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            length += node.textContent.length;
            if (length >= offset) {
                foundNode = node.childNodes[0]; // Assuming the element node has a single text node
                offset -= (length - node.textContent.length);
                break;
            }
        }
    }

    if (foundNode) {
        range.setStart(foundNode, offset);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}


function attemptAutoModelSelection() {
    var url = window.location.href;
    var urlObj = new URL(url);
    var params = new URLSearchParams(urlObj.search);
    let modelVersion = params.get('model_version');
    selectModelWithVersion(modelVersion);
}

function randomizeSeed(event) {
    event.preventDefault();
    document.getElementById('seed').value = "";
}


function tryShowingPromptSettings() {
    const accordionButton = document.querySelector('[data-te-target="#collapseOne5"]');
    const buttonHTMLElement = accordionButton.lastChild;
    const buttonText = buttonHTMLElement.nodeValue;

    if (buttonText.includes('Show')) {
        accordionButton.click();
    }
}

function tryShowingReferenceImageSettings() {
    const accordionButton = document.querySelector('[data-te-target="#nestedImg2ImgCollapse"]');
    const buttonHTMLElement = accordionButton.firstChild;
    const buttonText = buttonHTMLElement.nodeValue;

    if (buttonText.includes('Show')) {
        accordionButton.click();
    }
}


function setupAccordion() {
    const accordionButton = document.querySelector('[data-te-target="#collapseOne5"]');
    accordionButton.addEventListener('click', function() {
        const buttonHTMLElement = accordionButton.lastChild;
        const buttonText = buttonHTMLElement.nodeValue;

        if (buttonText.includes('Hide')) {
            buttonHTMLElement.nodeValue = buttonHTMLElement.nodeValue.replace('Hide Prompt Settings', 'Show Prompt Settings');
        } else {
            buttonHTMLElement.nodeValue = buttonHTMLElement.nodeValue.replace('Show Prompt Settings', 'Hide Prompt Settings');
        }
    });


    const img2imgAccordionButton = document.querySelector('[data-te-target="#nestedImg2ImgCollapse"]');
    img2imgAccordionButton.addEventListener('click', function() {
        const buttonHTMLElement = img2imgAccordionButton.firstChild;
        const buttonText = buttonHTMLElement.nodeValue;

        if (buttonText.includes('Hide')) {
            buttonHTMLElement.nodeValue = buttonHTMLElement.nodeValue.replace('Hide Image To Image fields', 'Show Image To Image fields');
        } else {
            buttonHTMLElement.nodeValue = buttonHTMLElement.nodeValue.replace('Show Image To Image fields', 'Hide Image To Image fields');
        }
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
            if (models != null && models.length > 0) {
                models.forEach(function(model) {
                    let new_model_option_html = new_model_option(model);
                    let new_model_option_div = $($.parseHTML(new_model_option_html));
                    new_model_option_div.hide().appendTo('#model-dropdown').fadeIn();
                });

                if (models.length == 1) {
                    let firstModelName = models[0].name;
                    let long_version = models[0].version;
                    let short_version = long_version.includes(':') ? long_version.split(':')[1] : long_version;
                    let promptDiv = document.getElementById('prompt');
                    promptPlaceholderText = `Drawing of ${firstModelName} wearing a sleek black leather jacket`;
                    promptDiv.textContent = promptPlaceholderText;
                    selectModelWithVersion(short_version);
                    promptDiv.blur();
                } else {
                    attemptAutoModelSelection();
                }
            }
            console.log('the base prices dict is: ', data.base_prices);
            storeBasePrices(data.base_prices);
            updateGenerationEstimateLabel();
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
                            // cancel_button.classList.add('hidden');
                        });
                        // cancel_button.classList.remove('hidden');
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
    document.getElementById("prompt").innerHTML = generation.gen_recipe.user_facing_prompt || generation.gen_recipe.prompt;
    document.getElementById("neg-prompt").value = generation.gen_recipe.neg_prompt;
    document.getElementById('gen-count').value = 1;
    document.getElementById('denoising-steps').value = generation.gen_recipe.inference_steps;
    document.getElementById('guidance-scale').value = generation.gen_recipe.guidance_scale;
    document.getElementById('seed').value = generation.gen_recipe.seed;
    document.getElementById('img-2-img').value = generation.gen_recipe.img2img_url;
    document.getElementById('prompt-strength').value = generation.gen_recipe.prompt_strength;
    document.getElementById('lora-scale').value = generation.gen_recipe.lora_scale;
    // Trigger some UI updates in the gen form
    document.getElementById('denoising-steps').dispatchEvent(new Event('input'));
    selectModelWithVersion(generation.model_version);
}

function selectModelWithVersion(version) {
    let modelDropdown = document.getElementById('model-dropdown');
    var options = modelDropdown.options;
    var selected = false; // Flag to keep track if a matching option was found

    // Find the first option w/ matching version if not set selection to false
    for (var i = 0; i < options.length; i++) {
      if (options[i].getAttribute('version') === version) {  
        options[i].selected = true;
        selected = true;
        // break;
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

    // Create a new 'change' event
    const event = new Event('change', {
        bubbles: true,
        cancelable: true,
    });

    // Dispatch it on the 'model-dropdown' element
    modelDropdown.dispatchEvent(event);
}

function generateButtonPressed(event) {
    event.preventDefault();
    removeErrorBanners();
    removeWarningBanners();

    let userRecId = getUserRecId();
    if (userRecId == null) {
        console.log("User is signed out. Message user to sign in.");
        return;
    }
    console.log('we have userRecId: ', userRecId);

    let promptValues = promptInputValues();
    console.log("promptValues: ", promptValues);

    let img2imgUrl = promptValues.img2imgUrl;
    if (img2imgUrl) {
        if (isValidImageUrl(img2imgUrl) == false) {
            displayErrorBanner('The provided image to image url does not seem to point to a valid image url. Try a different one.');
            return;
        }
    }

    let isUrlExpired = isImageUrlExpired(promptValues.img2imgUrl);
    if (isUrlExpired) {
        console.log('url is expired');
        displayErrorBanner('Reference image url is expired. Try a different a different url.');
        return;
    }


    var seedToUse = promptValues.seed;
    let hasChosenSeed = seedToUse != "";
    let numberOfImages = hasChosenSeed ? 1 : promptValues.numberOfImages;
    let shouldResetSeed = !hasChosenSeed && promptValues.shouldUseRandomSeedAcrossModels

    let modelValues = promptValues.modelValues;
    let modelNames = promptValues.modelNames;
    let modelIds = promptValues.modelIds;
    let versionValues = promptValues.versionValues;
    let instanceKeys = promptValues.instanceKeys;
    let trainingSubjects = promptValues.trainingSubjects;
    let genderTypes = promptValues.genderTypes;

    const customSdxlCount = modelValues.filter(modelValue => modelValue.includes('custom_sdxl')).length;

    let customSdxlModelNamesIncluded = modelValues.some((modelValue, index) => {
        console.log('Model value is: ', modelValue);
        return modelValue.includes('custom_sdxl') && promptValues.prompt.includes(modelNames[index]);
    });

    console.log('the customSdxlModelNamesIncluded value: ', customSdxlModelNamesIncluded);

    if (!customSdxlModelNamesIncluded && customSdxlCount > 0) {
        displayErrorBanner('A fine tuned model is selected but not mentioned in the prompt.');
        return;
    }

    var prompt = promptValues.prompt;
    if (isPromptInputShowingPlaceholder() == true) {
        removePlaceholder();
        document.getElementById('prompt').innerHTML = prompt;
        console.log('the prompt after removing placeholder: ', document.getElementById('prompt').innerHTML);
        triggerModelNameInPromptFormatting();
    }

    for (let modelName of modelNames) {
        const modelNameRegex = new RegExp(`\\b${modelName}\\b`, 'g');
        prompt = prompt.replace(modelNameRegex, 'tzk');
    }

    // Validate the generation form before proceeding to fire off an API call

    console.log(`inf steps (${typeof promptValues.inferenceSteps}): ${promptValues.inferenceSteps}, gscale (${typeof promptValues.gscale}): ${promptValues.gscale}, prompt (${typeof prompt}): ${prompt}, lorascale (${typeof promptValues.loraScale}): ${promptValues.loraScale}, img2imgurl (${typeof promptValues.img2imgUrl}): ${promptValues.img2imgUrl}, prompt strength (${typeof promptValues.promptStrength}): ${promptValues.promptStrength}`);
    let missingFields = [];
    if (!promptValues.inferenceSteps) missingFields.push('Denoising Steps');
    if (!promptValues.gscale) missingFields.push('Guidance Scale');
    if (!prompt) missingFields.push('Prompt');
    if (!promptValues.loraScale) missingFields.push('Lora Scale');

    if (promptValues.img2imgUrl) {
        if (!promptValues.promptStrength) {
            displayErrorBanner('Prompt strength is required for image-to-image generation.');
            return;
        }
    }

    if (missingFields.length > 0) {
        displayErrorBanner('Missing value(s) for: ' + missingFields.join(', '));
        return;
    }

    for (var j = 0; j < numberOfImages; j++) {
        if (shouldResetSeed) {
            seedToUse = Math.floor(Math.random() * 429496719);
        }
        for (var i = 0; i < modelValues.length; i++) {
            let replicateModelName = modelValues[i];
            let modelName = modelNames[i];
            let modelId = modelIds[i];
            let versionName = versionValues[i];
            var instanceKey = instanceKeys[i];
            let trainingSubject = trainingSubjects[i];
            let genderType = genderTypes[i];

            console.log('trainingSubject: ', trainingSubject, ' genderType: ', genderType);
            console.log('the model name before prompt tweaking: ', modelName);
            console.log('instance key is: ', instanceKey);

            // Normalize the user facing prompt to be specific to any custom model in a multi-selection scenario
            var userFacingPrompt = prompt;
            if (userFacingPrompt.includes('tzk')) {
                userFacingPrompt = userFacingPrompt.replace(/tzk/g, modelName);
            }

            const modelNameRegex = new RegExp(`\\btzk\\b`, 'g');
            let personalizedPrompt = modelNameRegex.test(prompt) ? prompt.replace(modelNameRegex, instanceKey) : prompt;
            console.log('The new personalized prompt is: ', personalizedPrompt);

            if (trainingSubject == 'person') {
                if (!personalizedPrompt.includes(`a ${instanceKey}`) && personalizedPrompt.includes(`${instanceKey}`)) {
                    personalizedPrompt = personalizedPrompt.replace(instanceKey, `a ${instanceKey}`);
                }
                if (!personalizedPrompt.includes(`${instanceKey} ${genderType}`) && personalizedPrompt.includes(`${instanceKey}`)) {
                    personalizedPrompt = personalizedPrompt.replace(instanceKey, `${instanceKey} ${genderType}`);
                }
            } else if (trainingSubject == null) {
                personalizedPrompt = personalizedPrompt.replace(instanceKey, 'person');
            }

            console.log('The final personalized prompt is: ', personalizedPrompt);


            var jsonObject = {
                generationId: generateId(),
                userRecId: userRecId,
                collectionId: getLastEditedCollection(),
                userFacingModelName: modelName,
                modelName: replicateModelName,
                modelId: modelId,
                modelVersion: versionName,
                userFacingPrompt: userFacingPrompt,
                prompt: personalizedPrompt,
                negativePrompt: promptValues.negativePrompt,
                gscale: promptValues.gscale,
                seed: seedToUse,
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
            let model_name = jsonObject.userFacingModelName;
            let is_warm = data.is_warm;
            let collection_id = data.collection_id;
            let generation_id = data.generation_id;
            console.log(`the locally created gen id: ${jsonObject.generationId}, and served gen id: ${generation_id}`)
            startListeningForGenerationUpdates(jsonObject.userRecId, collection_id, generation_id);
            // attemptToShowColdBootingBanner(model_name, is_warm);
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

function attemptToShowColdBootingBanner(model_name, is_warmed) {
    if (model_name == 'sdxl') {
        return;
    }

    if (!is_warmed) {
        let warningMessage = `The model, ${model_name}, is likely cold booting which may take 2-3 minutes before generation. The model will stay warm for a minute.`;
        let existingWarningBanners = document.getElementsByClassName('warning-banner');
        for (let i = 0; i < existingWarningBanners.length; i++) {
            if (existingWarningBanners[i].innerText.includes(model_name)) {
                return;
            }
        }
        displayWarningBanner(warningMessage);
    }
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
            if (!generation_dict) {
                unsubscribe();
                return;
            }
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
                    // cancel_button.classList.add('hidden');
                });
                // cancel_button.classList.remove('hidden');
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
        tryShowingPromptSettings();
        removePlaceholder();
        copyPromptInfoFromGen(gen_dict);
        triggerModelNameInPromptFormatting();
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

    let generate_form_html_instance = generate_form_html();
    let $generate_form_container = $('#generate-form-container');
    let parsedHTML = $.parseHTML(generate_form_html_instance);
    $generate_form_container.append(parsedHTML);
}

function addBaseGenMenu() {
    let base_gen_menu_html = baseGenMenuHTML();
    let base_gen_menu_div = $($.parseHTML(base_gen_menu_html));
    $('#console-content').append(base_gen_menu_div);
}

function resizeGrid() {
    if (window.innerWidth >= 768) { // Tailwind's medium size breakpoint is 768px
        const leftColumnHeight = document.getElementById('generateForm').clientHeight;
        const adjustedForPaddingHeight = leftColumnHeight + 2 * 12;
        // Set the max-height of the collection grid container to the height of the left column
        console.log('adjustedForPaddingHeight: ', adjustedForPaddingHeight)
        document.getElementById('collection-grid-container').style.height = adjustedForPaddingHeight + 'px';
    }
    else {
        document.getElementById('collection-grid-container').style.height = '';
    }
}

function configureInfiniteScroll() {
    const scrollableContainer = document.getElementById("collection-grid-container");
    scrollableContainer.addEventListener("scroll", () => {
        console.log("Scroll Top: ", scrollableContainer.scrollTop, 
                    "Client Height: ", scrollableContainer.clientHeight, 
                    "Scroll Height: ", scrollableContainer.scrollHeight);
        if ((scrollableContainer.scrollTop + scrollableContainer.clientHeight) >= scrollableContainer.scrollHeight - 5) {
            if (isCurrentlyPaginatingPrompts) {
                console.log('is currently paginating!');
                return
            } else {
                const last_doc_id = getLastDocIdFromLocalStorage();
                if (last_doc_id != null) {
                    console.log('has a last doc id of: ', last_doc_id);
                    isCurrentlyPaginatingPrompts = true;
                    fetchGenerations(getUserRecId(), getLastEditedCollection(), last_doc_id);
                } else {
                    console.log('doesnt have a last doc id, so no more things to fetch');
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

function sanitizePrompt(prompt) {
    // Remove any HTML tags
    let sanitizedPrompt = prompt.replace(/<[^>]*>?/gm, '');
    // Replace &nbsp; with a regular space
    sanitizedPrompt = sanitizedPrompt.replace(/&nbsp;/g, ' ');
    // Trim the prompt to remove leading and trailing spaces
    sanitizedPrompt = sanitizedPrompt.trim();
    return sanitizedPrompt;
}

function isValidImageUrl(url) {
    // This regex looks for the specified image extensions followed by either the end of the string
    // or a non-word character (like ?, &, or #), which would indicate the start of query parameters or a fragment.
    const pattern = /\.(jpg|jpeg|png|heic)(\W|$)/i;
    return pattern.test(url);
}

function promptInputValues() {
    var prompt = document.getElementById("prompt").innerHTML;
    prompt = sanitizePrompt(prompt);
    let numberOfImages = document.getElementById('gen-count').value;
    var inferenceSteps = document.getElementById('denoising-steps').value;
    let negativePrompt = document.getElementById("neg-prompt").value;
    var gscale = document.getElementById('guidance-scale').value;
    let seed = document.getElementById('seed').value;
    let img2imgUrl = document.getElementById('img-2-img').value;
    var promptStrength = document.getElementById('prompt-strength').value;
    var loraScale = document.getElementById('lora-scale').value;
    let shouldUseRandomSeedAcrossModels = true;

    if (promptStrength == '') {
        promptStrength = 0.8;
    }

    if (loraScale == '') {
        loraScale = 0.8;
    }

    if (gscale == '') {
        gscale = 13;
    }

    if (inferenceSteps == '') {
        inferenceSteps = 20;
    }

    let dropdown = document.getElementById('model-dropdown');
    let selectedOptions = dropdown.selectedOptions;
    var modelValues = [];
    var modelNames = [];
    var modelIds = [];
    var versionValues = [];
    var instanceKeys = [];
    var trainingSubjects = [];
    var genderTypes = [];
    for (var i = 0; i < selectedOptions.length; i++) {
        modelValues.push(selectedOptions[i].getAttribute('model'));
        modelNames.push(selectedOptions[i].getAttribute('modelname'));
        modelIds.push(selectedOptions[i].getAttribute('id'));
        versionValues.push(selectedOptions[i].getAttribute('version'));
        instanceKeys.push(selectedOptions[i].getAttribute('instkey'));
        trainingSubjects.push(selectedOptions[i].getAttribute('trainingSubject'));
        genderTypes.push(selectedOptions[i].getAttribute('genderType'));
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
        modelNames: modelNames,
        modelIds: modelIds,
        versionValues: versionValues,
        instanceKeys: instanceKeys,
        trainingSubjects: trainingSubjects,
        genderTypes: genderTypes
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

function useAsReferenceImagePressed(event) {
    event.preventDefault();
    let genElement = event.target.closest('[generation-id]');
    hideGenMenuShield(genElement);
    let generationId = genElement.getAttribute('generation-id');
    let imgElement = genElement.querySelector('img');
    let imgSrc = imgElement.getAttribute('src');
    document.getElementById('img-2-img').value = imgSrc;
    tryShowingPromptSettings();
    tryShowingReferenceImageSettings();
    console.log(`Image source URL for generationId ${generationId}: ${imgSrc}`);
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
            collectionId: getLastEditedCollection(),
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

function updateGenerationEstimateLabel() {
    let basePrices = getBasePrices();
    let inf_price = basePrices['inference_price'];
    let inference_steps = document.getElementById('denoising-steps').value;
    let base_price_estimate = inf_price * inference_steps;

    if (previousModelSelectionId.includes('sdxl')) {
        document.getElementById('generation-estimate-label').innerHTML = `Estimated cost: $${base_price_estimate}<br>@ ${inference_steps} denoising steps`
    } else {
        let cold_boot_upcharge = basePrices['cold_boot_upcharge'];
        let warmed_upcharge = basePrices['warmed_upcharge'];
        let estimatedColdPrice = base_price_estimate + cold_boot_upcharge;
        let estimatedWarmedPrice = base_price_estimate + warmed_upcharge;
        document.getElementById('generation-estimate-label').innerHTML = `Estimated cost: $${estimatedWarmedPrice.toFixed(2)} ($${estimatedColdPrice.toFixed(2)} from cold boot)<br>@ ${inference_steps} denoising steps`

    }
}

function basicPromptExampleButtonPressed(event) {
    event.preventDefault();
    window.open(`https://${CONSTANTS.SITE_URL}/prompt-examples/basic`, '_blank');
}