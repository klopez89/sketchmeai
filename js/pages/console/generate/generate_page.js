var isCurrentlyPaginatingPrompts = false;
let cold_boot_delay = 180000; // 3 minutes in milliseconds for custom models
let cold_booting_time = 600000; // 10 minutes in milliseconds for custom models to turn cold w/o use
let status_check_interval = 2500; // 5 seconds in milliseconds
const genEstimateCostPerDenoisingStep = 0.00128;
var coldBootedModels = {};
var previousModelSelectionId = 'no-lora-person-button';
var promptPlaceholderText = generatePrompt('');
let isSelectable = false;
let lastSelectedModelVersion = null;
let boundaryWidth = 1024; // Tailwind's 'lg' breakpoint (use to be 768 for md). Increased to lg to accomodate for huge pixel phones like Samsung S23 Ultra w/ a 916px width.
let selectedRefImgModes = [];

addImageGrid();
addBaseGenMenu();
configureGenerateForm();
configureRefImageButtons();
moveForm();
configureInfiniteScroll();
setupAccordion();
showBasicExamplesButton();
configurePromptInputPlaceholder(); 
addBottomGenerationMenu();
configureShareButton();
configureRefImageInfluenceFields(RefImageMode.IMG2IMG);
configureRefImageInfluenceFields(RefImageMode.IPADAPTER);
configureRefImageInfluenceFields(RefImageMode.OPENPOSE);
configureRefImageInfluenceFields(RefImageMode.CANNY);
configureRefImageInfluenceFields(RefImageMode.DEPTH);
configurePersonLoraFields();
updateAysToggle(false);

setInterval(function() {
    if (isPromptInputShowingPlaceholder()) {    
        let promptDiv = document.getElementById('prompt');
        let currentModelName = getCurrentPersonModelName();
        // console.log('currentModelName about to be used to gen new random default prompt: ', currentModelName);
        promptDiv.textContent = generatePrompt(currentModelName);
        triggerModelNameInPromptFormatting();
    } else {
        // console.log('promptDiv is not showing in placeholder state so skipping the setting of a random prompt!');
    }
}, 2000);


auth.onAuthStateChanged(function(user) {
    if (user) {
        console.log('User is signed in.');
        let userRecId = getUserRecId();
        let collectionInfo = getLastEditedCollectionInfo();
        let collectionId = collectionInfo.collectionId;
        let collectionName = collectionInfo.collectionName;
        let collectionNameLabel = document.getElementById('collection-name-label');
        collectionNameLabel.textContent = collectionName;
        let lastDocId = null;
        console.log('about to fetch generations initially, with collectionId, ', collectionId);
        fetchGenerations(userRecId, collectionId, lastDocId);
        fetchWorkingModels(userRecId);
        updateCurrentCollectionLabels();
    } else {
        console.log('No user is signed in.');
        navigationToHomePage();
    }
});

// let userRecId = getUserRecId();
// let collectionId = getLastEditedCollection();
// let lastDocId = null;
// fetchGenerations(userRecId, collectionId, lastDocId);
// fetchWorkingModels(userRecId);

document.querySelectorAll('.editable').forEach(function(element){
    element.contentEditable = true;
});

/////////////////////////////////////////////////////////////////////

var previousWindowWidth = window.innerWidth;

window.onresize = function() {
    let currentWindowWidth = window.innerWidth;
    if ((previousWindowWidth < boundaryWidth && currentWindowWidth >= boundaryWidth) || (previousWindowWidth >= boundaryWidth && currentWindowWidth < boundaryWidth)) {
        moveForm();
    }
    previousWindowWidth = currentWindowWidth;
}

function moveForm() {
    var form = document.getElementById('generateForm');
    if (window.innerWidth >= boundaryWidth) { // Tailwind's 'md' breakpoint
        document.getElementById('generate-form-container').appendChild(form);
    } else {
        document.getElementById('sidebar-gen-form-container').prepend(form);
    }
    selectModelWithVersion(lastSelectedModelVersion);
}

function showBasicExamplesButton() {
    // document.getElementById('basic-examples-button').classList.remove('hidden');
}

function toggleImageSelectability() {
    isSelectable = !isSelectable;
    const divs = document.querySelectorAll(".selectable");
    const selectionBar = document.querySelector(".selection-bar");
    const selectToShareButton = document.querySelector(".select-to-share-button");
    const mobileMenu = document.getElementById('mobile-bottom-menu');
    
    if (isSelectable) {
        selectionBar.classList.remove("hidden");
        selectToShareButton.classList.remove("text-gray-500");
        selectToShareButton.classList.add("text-gray-400");
        selectToShareButton.textContent = 'Cancel';
        mobileMenu.classList.add('hidden');
    } else {
        selectionBar.classList.add("hidden");
        selectToShareButton.classList.remove("text-gray-400");
        selectToShareButton.classList.add("text-gray-500");
        selectToShareButton.textContent = 'Multi-Select';
        mobileMenu.classList.remove('hidden');
    }
    
    divs.forEach(div => {
      configureSelectableDiv(div);
    });

    updateShareButton();
    updateDeleteSelectedButton();
}

function showGenTopMenu() {
    const genTopMenu = document.getElementById('gen-top-menu');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            genTopMenu.classList.remove('opacity-0');
            genTopMenu.classList.add('opacity-100');
        });
    });
}

function showMobileBottomGenMenu() {
    const mobileBottomMenu = document.getElementById('mobile-bottom-menu');
    mobileBottomMenu.classList.remove('hidden');
}

function configureSelectableDiv(div) {
    const checkbox = div.querySelector(".checkbox");
    const selectionOverlay = div.querySelector(".selection-overlay");
    const floatingCopyButton = div.querySelector("#copy-button");
  
    if (isSelectable) {
        checkbox.classList.remove("hidden"); 
        selectionOverlay.classList.remove("pointer-events-none");      
        floatingCopyButton.classList.remove('lg:flex');
    } else {
        div.classList.remove("selected");
        checkbox.classList.add("hidden");
        checkbox.classList.remove("fa-check-circle");
        checkbox.classList.add("fa-circle");
        selectionOverlay.classList.add("pointer-events-none"); 
        const overlay_bg = div.querySelector(".overlay-bg");
        overlay_bg.classList.remove("bg-white", "opacity-50");
        floatingCopyButton.classList.add('lg:flex');
    }
}

function updateShareButton() {
    let selectedCount = $('div.selectable.selected').length;
    let shareButton = $('.share-button');
    if (selectedCount > 0) {
        shareButton.removeClass('bg-gray-200');
        shareButton.addClass('bg-black hover:bg-gray-800');
        shareButton.prop('disabled', false);
    } else {
        shareButton.addClass('bg-gray-200');
        shareButton.removeClass('bg-black hover:bg-gray-800');
        shareButton.prop('disabled', true);
    }
}

function updateDeleteSelectedButton() {
    let selectedCount = $('div.selectable.selected').length;
    let deleteSelectedButton = $('#deleteSelectedButton');
    if (selectedCount > 0) {
        deleteSelectedButton.removeClass('bg-gray-200');
        deleteSelectedButton.addClass('bg-red-500 hover:bg-red-700');
        deleteSelectedButton.prop('disabled', false);
    } else {
        deleteSelectedButton.addClass('bg-gray-200');
        deleteSelectedButton.removeClass('bg-red-500 hover:bg-red-700');
        deleteSelectedButton.prop('disabled', true);
    }
}


function configureShareButton() {
    let shareButton = document.getElementById('share-button');

    shareButton.addEventListener("click", () => {

        showLoaderOnShareButton(shareButton);
          
        let selectedImages = $('div.selectable.selected img');
        let imageUrls = selectedImages.map(function() {
            return $(this).attr('src');
        }).get();

        console.log('Image URLs:', imageUrls);

        if (navigator.share) {
            generateFileArray(imageUrls).then(fileArray => {
                console.log(fileArray);
                navigator.share({
                files: fileArray,
                title: 'Shared Images',
                text: 'Here are some images I thought you might like.'
                }).then(() => {
                    console.log('Successful share');
                    hideLoaderOnShareButton(shareButton);
                })
                .catch((error) => {
                    console.log('Error sharing', error);
                    hideLoaderOnShareButton(shareButton);
                });
            });
          } else {
            console.log('Web Share API not supported in this browser');
            displayWarningNotification('Unable to Share', 'The web share API is not supported in this browser. Please try from a different browser / device.');
            hideLoaderOnShareButton(shareButton);
          }
    });
}

function showLoaderOnShareButton(shareButton) {
    let buttonLoaderIcon = shareButton.querySelector('i');
    let buttonText = shareButton.querySelector('p');
    buttonLoaderIcon.classList.remove('hidden');
    buttonText.classList.add('text-transparent');
}

function hideLoaderOnShareButton(shareButton) {
    let buttonLoaderIcon = shareButton.querySelector('i');
    let buttonText = shareButton.querySelector('p');
    buttonLoaderIcon.classList.add('hidden');
    buttonText.classList.remove('text-transparent');
}

function deleteSelectedPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let selectedGenDivs = $('div.selectable.selected');
    let genElements = [];
    selectedGenDivs.each(function() {
        let parentDiv = $(this).parent();
        genElements.push(parentDiv);
    });

    let generationIds = [];
    genElements.forEach(function(genElement) {
        let generationId = genElement.attr('generation-id');
        generationIds.push(generationId);
        configureGenElementforDeletion(genElement[0]);
    });

    console.log('Generation IDs to delete:', generationIds);
    fireGenDeletion(generationIds, genElements);
}


async function urlToFile(url, filename, mimeType) {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], filename, { type: mimeType });
}
  
async function generateFileArray(imageUrls) {
    const fileArray = [];
    for (let url of imageUrls) {
        const file = await urlToFile(url, 'filename.png', 'image/png');
        fileArray.push(file);
    }
    return fileArray;
}


function configurePromptInputPlaceholder() {
    let promptDiv = document.getElementById('prompt');
    promptDiv.addEventListener('focus', shiftAwayFromPromptPlaceholderState);
    promptDiv.addEventListener('blur', promptAboutToLoseFocus);
    togglePlaceholder();
}

function addBottomGenerationMenu() {
    let bttomGenMenuHTML = bottom_generation_menu_html();
    let bottomGenMenuDiv = $($.parseHTML(bttomGenMenuHTML));
    $('#console-content').append(bottomGenMenuDiv);
}

function promptAboutToLoseFocus() {
    togglePlaceholder();
    triggerModelNameInPromptFormatting();
}

function togglePlaceholder() {
    let promptDiv = document.getElementById('prompt');
    if (!promptDiv.textContent.trim().length ) {
        promptDiv.textContent = generatePrompt('');
        promptDiv.classList.remove('text-gray-900');
        promptDiv.classList.add('text-gray-400');
    }
}

function shiftAwayFromPromptPlaceholderState() {
    let promptDiv = document.getElementById('prompt');
    if (promptDiv.classList.contains('text-gray-400')) {
        promptDiv.classList.remove('text-gray-400');
        promptDiv.classList.add('text-gray-900');
    }
}

function isPromptInputShowingPlaceholder() {
    let promptDiv = document.getElementById('prompt');
    return promptDiv.classList.contains('text-gray-400');
}


function triggerModelNameInPromptFormatting() {
    let promptInput = document.getElementById('prompt')
    let promptValues = promptInputValues();
    let modelNames = promptValues.modelNames;
    // console.log("Model Names:", modelNames);
    // console.log("Prompt Input:", promptInput.textContent);
    formatAroundModelName(modelNames, promptInput);
}

function configureGenerateForm() {
    let genForm = document.getElementById("generateForm");
    genForm.addEventListener("submit", generateButtonPressed, true);

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
            let newEvent = new Event('submit', { bubbles: false });
            genForm.dispatchEvent(newEvent);
        }
    });

    // Neg-prompt field: Enbable pressing enter to trigger generation
    document.getElementById('neg-prompt').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            let newEvent = new Event('submit', { bubbles: false });
            genForm.dispatchEvent(newEvent);
        }
    });

    // Enable pressing enter to trigger generation from ip-adapter instruct query
    document.getElementById('instruct-query').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            let newEvent = new Event('submit', { bubbles: false });
            genForm.dispatchEvent(newEvent);
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
            seedInput.placeholder = 'Random';
        }
    });

    let i2iRefImgUrlInput = document.getElementById(RefImgUrlInputId.IMG2IMG);
    console.log('i2iRefImgUrlInput: ', i2iRefImgUrlInput);
    addDropListenerToRefImgUrlInput(i2iRefImgUrlInput);

    let ipAdapterRefImgUrlInput = document.getElementById(RefImgUrlInputId.IPADAPTER);
    console.log('ipAdapterRefImgUrlInput: ', ipAdapterRefImgUrlInput);
    addDropListenerToRefImgUrlInput(ipAdapterRefImgUrlInput);

    let openPoseRefImgUrlInput = document.getElementById(RefImgUrlInputId.OPENPOSE);
    console.log('openPoseRefImgUrlInput: ', openPoseRefImgUrlInput);
    addDropListenerToRefImgUrlInput(openPoseRefImgUrlInput);
    
    let cannyRefImgUrlInput = document.getElementById(RefImgUrlInputId.CANNY);
    console.log('cannyRefImgUrlInput: ', cannyRefImgUrlInput);
    addDropListenerToRefImgUrlInput(cannyRefImgUrlInput);

    let depthRefImgUrlInput = document.getElementById(RefImgUrlInputId.DEPTH);
    console.log('depthRefImgUrlInput: ', depthRefImgUrlInput);
    addDropListenerToRefImgUrlInput(depthRefImgUrlInput);

    addChangeListenersForBaseModelSelector();
}

function addDropListenerToRefImgUrlInput(refImgUrlInput) {
    refImgUrlInput.addEventListener('drop', function(event) {
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
                            refImgUrlInput.value = img.src;
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
                // console.log('Removing bold tags from:', boldedModelName);
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

        // const regex = new RegExp(`(<b>)?\\b${modelName}\\b(</b>)?`, 'g');

        // promptInputDiv.innerHTML = promptInputDiv.innerHTML.replace(regex, function(match, p1, p2) {
        //     // If the match is surrounded by <b> and </b> tags, return the original match
        //     var returning_str = '';
        //     if (p1 && p2) {
        //         returning_str = match;
        //     }
        //     // Otherwise, return the replacement
        //     else {
        //         returning_str = '<b>' + match + '</b>';
        //     }

        //     return returning_str;
        // });

        // if (document.activeElement === promptInputDiv) {
        //     setTimeout(() => {
        //         setCaretPosition(promptInputDiv, initialCaretPos);
        //     }, 0);
        // }



        const regex = new RegExp(`(?<!<b[^>]*>|<b>)\\b${modelName}\\b(?!<\/b>)`, 'g');

        if (promptInputDiv.innerHTML.includes(modelName)) {
            const modelInBoldRegex = new RegExp(`(<b>(?:\\s|&nbsp;)*${modelName}(?:\\s|&nbsp;)*<\/b>)`, 'gi');
            let doesModelNameHaveBoldTags = modelInBoldRegex.test(promptInputDiv.innerHTML);
           
            if (doesModelNameHaveBoldTags == false) {
                // console.log('trying to add bold tags if model name doesnt have em');
                let newPromptValue = promptInputDiv.innerHTML.replace(regex, '<b>$&</b>');
                // console.log('newPromptValue: ', newPromptValue);
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

function modelVersionInURL() {
    var url = window.location.href;
    var urlObj = new URL(url);
    var params = new URLSearchParams(urlObj.search);
    return params.get('model_version');
}

function randomizeSeed(event) {
    event.preventDefault();
    document.getElementById('seed').value = "";
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

    const img2imgAccordionButton = document.querySelector('[data-te-target="#nestedImg2ImgCollapse"]');
    img2imgAccordionButton.addEventListener('click', function() {
        const buttonHTMLElement = img2imgAccordionButton.firstChild;
        const buttonText = buttonHTMLElement.nodeValue;

        // if (buttonText.includes('Hide')) {
        //     buttonHTMLElement.nodeValue = buttonHTMLElement.nodeValue.replace('Hide Image To Image fields', 'Show Image To Image fields');
        // } else {
        //     buttonHTMLElement.nodeValue = buttonHTMLElement.nodeValue.replace('Show Image To Image fields', 'Hide Image To Image fields');
        // }
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
            let models = data.models;
            if (models != null && models.length > 0) {
                models.forEach(function(model) {
                    let new_model_option_html = new_model_option(model);
                    let new_model_option_div = $($.parseHTML(new_model_option_html));

                    let model_color = appropriateModelBgColor(model);
                    let new_lora_model_html = new_lora_model_option(model, model_color);
                    let new_lora_model_div = $($.parseHTML(new_lora_model_html));

                    new_lora_model_div.hide().appendTo('#lora-person-grid').fadeIn();

                    new_model_option_div.hide().appendTo('#model-dropdown').fadeIn();
                });

                let model_version = modelVersionInURL();
                console.log('Model version in URL is:', model_version);
                if (model_version != null) {
                    lastSelectedModelVersion = model_version;
                    selectModelWithVersion(lastSelectedModelVersion);
                } else {
                    // let firstModelName = models[0].name;
                    // let long_version = models[0].version;
                    // let short_version = long_version.includes(':') ? long_version.split(':')[1] : long_version;
                    // console.log('short version of first model: ', short_version);
                    // let promptDiv = document.getElementById('prompt');
                    // promptDiv.textContent = generatePrompt(firstModelName);
                    // lastSelectedModelVersion = short_version;
                    // selectModelWithVersion(short_version);
                    // promptDiv.blur();
                }
                document.getElementById('person-lora-influence-range').value = PersonLoraSettingValue.HIGH;
                document.getElementById('person-lora-influence').value = PersonLoraSettingValue.HIGH;
                alignPersonInfluenceSettingToValue();
            }
            console.log('the base prices dict is: ', data.base_prices);
            
            storePriceInfo(data.base_prices, PriceInfoTypes.SDXL);
            storePriceInfo(data.flux_prices, PriceInfoTypes.FLUX);

            updateGenerationEstimateLabel();
        },
        error: function(error) {
            console.error('Error in fetching working trained models:', error);
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
            let generations = data.generations;
            let hasAnotherPage = data.has_another_page;
            lastDocId = data.last_doc_id;
            // console.log(`data from generations: ${JSON.stringify(generations[0], null, 2)}`)
            console.log(`hasAnotherPage: ${hasAnotherPage}, lastDocId: ${lastDocId}`);


            if (generations == null) {
                console.log('Didnt find any more images to load. all done paginating!');
                $('#grid-loader').addClass('hidden');
                hideInfiniteLoader();
                removeLastDocId();
                showMobileBottomGenMenu();
                showGenTopMenu();
                setTimeout(function() {
                  isCurrentlyPaginatingPrompts = false;
                }, 50);
                return
            }


            generations.forEach(function(generation) {
                
                let new_grid_item_html = newGenItem_FromExistingGen(generation);
                let new_grid_item_div = configureGenDivForSelection(new_grid_item_html);
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
                        configureFavoriteButton(generation, gen_element);
                    } else if (generation.prediction_status === PredictionStatus.FAILED) {
                        gen_element.querySelector('img').classList.remove('hidden');
                        gen_element.querySelector('#gen-status').innerHTML = '';
                        loadGenImage(FAILED_IMG_URL, gen_element);
                        configureCopyButton(generation, gen_element);
                        configureFavoriteButton(generation, gen_element);
                    } else if (generation.prediction_status === PredictionStatus.SUCCEEDED) {
                        gen_element.querySelector('#gen-status').innerHTML = '';
                        gen_element.querySelector('img').classList.remove('hidden');

                        if (generation.upscale_result && Object.keys(generation.upscale_result).length > 0) {
                            console.log('loading downscaled-upscale result...');
                            loadGenImage(generation.upscale_result.downscaled_signed_url, gen_element);
                            showDownloadUpscaledButton(gen_element);
                            showUpscaledLabel(gen_element);
                        } else {
                            loadGenImage(generation.signed_gen_url, gen_element);
                            configureCopyButton(generation, gen_element);
                            hideDownloadUpscaledButton(gen_element);
                        }
                        
                        configureFavoriteButton(generation, gen_element);
                    }
                });
            });

            console.log('saving last doc id locally: ', lastDocId);
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

            showMobileBottomGenMenu();
            showGenTopMenu();
        },
        error: function(error) {
            console.error('Error in fetching generations:', error);
        }
    });
}

function showDownloadUpscaledButton(genElement) {
    let downloadButton = genElement.querySelector('#download-full-scale');
    console.log('downloadButton full scale button: ', downloadButton);
    if (downloadButton) {
        downloadButton.classList.remove('hidden');
        downloadButton.classList.add('block');
    }
}

function hideDownloadUpscaledButton(genElement) {
    let downloadButton = genElement.querySelector('#download-full-scale');
    if (downloadButton) {
        downloadButton.classList.add('hidden');
        downloadButton.classList.remove('block');
    }
}

function showUpscaledLabel(genElement) {
    let upscaledLabel = genElement.querySelector('#upscaled-label');

    if (upscaledLabel) {
        upscaledLabel.classList.remove('hidden');
    }
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

function configureGenDivForSelection(div) {
    // Get the nodes from the prompt div in order to stylize for selection state
    let nodes = $.parseHTML(div);

    // Style the prompt div 'dom element' for selection state
    if (isSelectable) {
        let domElement = nodes.find(node => node.nodeType === Node.ELEMENT_NODE);
        configureSelectableDiv(domElement);
    }

    let gen_div_element = $(nodes);

    let selection_overlay = gen_div_element.find(".selection-overlay");
    selection_overlay.on("click", function(event) {
        console.log("Clicked on a prompt div for selection!");
        if (isSelectable) {
            $(this).parent().toggleClass("selected");
            updateShareButton();
            updateDeleteSelectedButton();
            let overlay_bg = $(this).find(".overlay-bg");
            
            const checkbox = $(this).parent().find(".checkbox");
            if ($(this).parent().hasClass("selected")) {
                console.log('has selected class!');
                checkbox.removeClass("fa-circle");
                checkbox.addClass("fa-check-circle");
                selection_overlay.addClass("bg-opacity-50");
                overlay_bg.addClass("bg-white opacity-50");
            } else {
                console.log('does not have selected class!');
                checkbox.removeClass("fa-check-circle");
                checkbox.addClass("fa-circle");
                overlay_bg.removeClass("bg-white opacity-50");
            }
        }
    });

    return gen_div_element;
}

function selectBaseModel(base_model) {
    let base_model_selector = document.getElementById('base-model-selector');
    for (let option of base_model_selector.options) {
        if (option.id === base_model) {
            base_model_selector.value = option.value;
            base_model_selector.dispatchEvent(new Event('change'));
            break;
        }
    }
}

function copyPromptInfoFromGen(generation) {
    console.log('the generation to be copied: ', generation);

    let base_model_id = generation.base_model;
    selectBaseModel(base_model_id);

    document.getElementById("prompt").innerHTML = generation.gen_recipe.user_facing_prompt || generation.gen_recipe.prompt;
    document.getElementById("neg-prompt").value = generation.gen_recipe.neg_prompt;
    document.getElementById('gen-count').value = 1;
    document.getElementById('denoising-steps').value = generation.gen_recipe.inference_steps;
    document.getElementById('guidance-scale').value = generation.gen_recipe.guidance_scale;
    document.getElementById('seed').value = generation.gen_recipe.seed;

    configureRefImgSection(generation.gen_recipe.img2img_signed_url,RefImageMode.IMG2IMG, generation.gen_recipe.prompt_strength);
    configureMaskRefImgSection(generation.gen_recipe.mask_signed_url, generation.gen_recipe.mask_blur, generation.gen_recipe.mask_padding_crop);

    configureRefImgSection(generation.gen_recipe.ipadapter_signed_url,RefImageMode.IPADAPTER, generation.gen_recipe.ipadapter_scale);
    // configure IP adapter query
    const presetSelector = document.getElementById('instruct-presets');
    const instructTextarea = document.getElementById('instruct-query');
    const ipadapterQuery = generation.gen_recipe.ipadapter_query;
    const presetValues = Array.from(presetSelector.options).map(option => option.value);

    if (!presetValues.includes(ipadapterQuery)) {
        instructTextarea.value = ipadapterQuery;
    } else {
        instructTextarea.value = '';
        presetSelector.value = ipadapterQuery;
    }

    configureRefImgSection(generation.gen_recipe.openpose_signed_url,RefImageMode.OPENPOSE, generation.gen_recipe.openpose_scale, generation.gen_recipe.openpose_guidance_start, generation.gen_recipe.openpose_guidance_end);
    configureRefImgSection(generation.gen_recipe.canny_signed_url,RefImageMode.CANNY, generation.gen_recipe.canny_scale, generation.gen_recipe.canny_guidance_start, generation.gen_recipe.canny_guidance_end);
    configureRefImgSection(generation.gen_recipe.depth_signed_url,RefImageMode.DEPTH, generation.gen_recipe.depth_scale, generation.gen_recipe.depth_guidance_start, generation.gen_recipe.depth_guidance_end);

    document.getElementById('person-lora-influence').value = generation.gen_recipe.lora_scale * 100;
    document.getElementById('person-lora-influence-range').value = generation.gen_recipe.lora_scale * 100;
    document.getElementById('person-lora-influence').value = generation.gen_recipe.lora_scale * 100;

    // Trigger some UI updates in the gen form
    document.getElementById('denoising-steps').dispatchEvent(new Event('input'));
    lastSelectedModelVersion = generation.model_version;
    selectModelWithVersion(lastSelectedModelVersion);
    selectPromptStyle(generation.gen_recipe.prompt_style);
    // selectRefImageMode(generation.gen_recipe.ref_img_mode);
    updateAysToggle(generation.gen_recipe.should_use_ays);
    updateHiDToggle(generation.gen_recipe.should_use_hi_d);
    attemptToShowPromptSettingsSection();
    alignPersonInfluenceSettingToValue();
    // alignAYSBasedOnRefImgMode();
}

function configureMaskRefImgSection(signed_url, mask_blur, mask_padding_crop) {
    if (signed_url != undefined) {
        insertImgUrlForRefImg(signed_url, RefImageMode.MASK);
        document.getElementById('mask-blur').value = mask_blur;
        document.getElementById('mask-padding-crop').value = mask_padding_crop;
    } else {
        let clearRefButton = document.querySelector('#clear-ref-button[mode="mask-mode"]');
        clearRefButton.click();
    }
}

function configureRefImgSection(signed_url, refImgMode, infValue, startValue, endValue) {
    if (signed_url != undefined) {
        if (refImgMode == RefImageMode.MASK) {
            insertImgUrlForRefImg(signed_url, refImgMode);
        } else {
            insertImgUrlForRefImg(signed_url, refImgMode);
            enterRefImgInfluenceValue(refImgMode, infValue);
            alignInfluenceSettingToValue(refImgMode);
            assignGuidanceValuesToRefImgSection(refImgMode, startValue, endValue);
        }
    } else {
        let clearRefButton = document.querySelector(`#clear-ref-button[mode="${refImgMode}"]`);
        clearRefButton.click();
        attemptToCloseRefImgSection(refImgMode);
    }
}

function assignGuidanceValuesToRefImgSection(refImgMode, startValue, endValue) {
    if (refImgMode == RefImageMode.OPENPOSE) {
        document.getElementById('openpose-guidance-start').value = startValue;
        document.getElementById('openpose-guidance-end').value = endValue;
    } else if (refImgMode == RefImageMode.CANNY) {
        document.getElementById('canny-guidance-start').value = startValue;
        document.getElementById('canny-guidance-end').value = endValue;
    } else if (refImgMode ==  RefImageMode.DEPTH) {
        document.getElementById('depth-guidance-start').value = startValue;
        document.getElementById('depth-guidance-end').value = endValue;
    }
}

function enterRefImgInfluenceValue(refImgMode, infValue) {
    var inputFieldId = null;
    var rangeInputFieldId = null;
    var adjustedInfValue = infValue;
    if (refImgMode == RefImageMode.IMG2IMG) {
        inputFieldId = InfluenceValueInputId.IMG2IMG;
        rangeInputFieldId = InfluenceRangeInputId.IMG2IMG;
        adjustedInfValue = 100 - adjustedInfValue * 100;
    } else if (refImgMode == RefImageMode.IPADAPTER) {
        inputFieldId = InfluenceValueInputId.IPADAPTER;
        rangeInputFieldId = InfluenceRangeInputId.IPADAPTER;
        adjustedInfValue = adjustedInfValue * 100;
    } else if (refImgMode == RefImageMode.OPENPOSE) {
        inputFieldId = InfluenceValueInputId.OPENPOSE;
        rangeInputFieldId = InfluenceRangeInputId.OPENPOSE;
        adjustedInfValue = adjustedInfValue * 100;
    } else if (refImgMode == RefImageMode.CANNY) {
        inputFieldId = InfluenceValueInputId.CANNY;
        rangeInputFieldId = InfluenceRangeInputId.CANNY;
        adjustedInfValue = adjustedInfValue * 100;
    } else if (refImgMode == RefImageMode.DEPTH) {
        inputFieldId = InfluenceValueInputId.DEPTH;
        rangeInputFieldId = InfluenceRangeInputId.DEPTH;
        adjustedInfValue = adjustedInfValue * 100;
    } else {
        return;
    }
    document.getElementById(inputFieldId).value = adjustedInfValue;
    document.getElementById(rangeInputFieldId).value = adjustedInfValue;
}

function insertImgUrlForRefImg(url, refImageMode) {
    let urlWithoutQueryString = url.split('?')[0];
    let imageExtension = urlWithoutQueryString.split('.').pop();
    console.log('Image extension for ref img url is: ', imageExtension);
    let imgInfo = {
        'data': url,
        'name': 'ref-img',
        'type': `image/${imageExtension}`
    }
    addFileToRefImgElement(imgInfo, refImageMode);
    attemptToShowRefImgSection(refImageMode);
}

function attemptToShowRefImgSection(refImageMode) {
    let refImgSectionBttns = referenceImgSectionButtons(refImageMode);
    for(let i = 0; i < refImgSectionBttns.length; i++) {
        let refImgSectionButton = refImgSectionBttns[i];
        if(refImgSectionButton.getAttribute('data-te-collapse-collapsed') != null) {
            refImgSectionButton.click();
        }
    }
}

function attemptToCloseRefImgSection(refImgMode) {
    var sectionButtonId = null;
    if (refImgMode == RefImageMode.IMG2IMG) {
        sectionButtonId = RefImgSectionButtonId.IMG2IMG;
    } else if (refImgMode == RefImageMode.IPADAPTER) {
        sectionButtonId = RefImgSectionButtonId.IPADAPTER;
    } else if (refImgMode == RefImageMode.OPENPOSE) {
        sectionButtonId = RefImgSectionButtonId.OPENPOSE;
    } else if (refImgMode == RefImageMode.CANNY) {
        sectionButtonId = RefImgSectionButtonId.CANNY;
    } else if (refImgMode == RefImageMode.DEPTH) {
        sectionButtonId = RefImgSectionButtonId.DEPTH;
    } else {
        return;
    }

    let refImgSectionButton = document.getElementById(sectionButtonId);
    if(refImgSectionButton.getAttribute('data-te-collapse-collapsed') == null) {
        refImgSectionButton.click();
    }
}

function configureGenFormForFlux() {
    img2img_button = referenceImgSectionButtons(RefImageMode.IMG2IMG)[0];
    img2img_parent = img2img_button.closest('.col-span-full');
    ipadapter_button = referenceImgSectionButtons(RefImageMode.IPADAPTER)[0];
    ipadapter_parent = ipadapter_button.closest('.col-span-full');
    openpose_button = referenceImgSectionButtons(RefImageMode.OPENPOSE)[0];
    openpose_parent = openpose_button.closest('.col-span-full');
    canny_button = referenceImgSectionButtons(RefImageMode.CANNY)[0];
    canny_parent = canny_button.closest('.col-span-full');
    depth_button = referenceImgSectionButtons(RefImageMode.DEPTH)[0];
    depth_parent = depth_button.closest('.col-span-full');

    person_lora_container = document.getElementById('lora-component-container');
    person_lora_inf_container = document.getElementById('person-influence-setting-selector-container');
    neg_prompt_container = document.getElementById('neg-prompt-field-container');
    guidance_scale_container = document.getElementById('gs-field-container');
    denoising_steps_container = document.getElementById('denoising-steps-field-container');

    document.getElementById('guidance-scale').value = 0;
    document.getElementById('denoising-steps').value = 4;

    img2img_parent.classList.add('hidden');
    ipadapter_parent.classList.add('hidden');
    openpose_parent.classList.add('hidden');
    canny_parent.classList.add('hidden');
    depth_parent.classList.add('hidden');

    person_lora_container.classList.add('hidden');
    person_lora_inf_container.classList.add('hidden');
    neg_prompt_container.classList.add('hidden');
    guidance_scale_container.classList.add('hidden');
    denoising_steps_container.classList.add('hidden');
}

function configureGenFormForSDXL() {
    img2img_button = referenceImgSectionButtons(RefImageMode.IMG2IMG)[0];
    img2img_parent = img2img_button.closest('.col-span-full');
    ipadapter_button = referenceImgSectionButtons(RefImageMode.IPADAPTER)[0];
    ipadapter_parent = ipadapter_button.closest('.col-span-full');
    openpose_button = referenceImgSectionButtons(RefImageMode.OPENPOSE)[0];
    openpose_parent = openpose_button.closest('.col-span-full');
    canny_button = referenceImgSectionButtons(RefImageMode.CANNY)[0];
    canny_parent = canny_button.closest('.col-span-full');
    depth_button = referenceImgSectionButtons(RefImageMode.DEPTH)[0];
    depth_parent = depth_button.closest('.col-span-full');

    person_lora_container = document.getElementById('lora-component-container');
    person_lora_inf_container = document.getElementById('person-influence-setting-selector-container');
    neg_prompt_container = document.getElementById('neg-prompt-field-container');
    guidance_scale_container = document.getElementById('gs-field-container');
    denoising_steps_container = document.getElementById('denoising-steps-field-container');

    document.getElementById('guidance-scale').value = 6;
    document.getElementById('denoising-steps').value = 20;

    img2img_parent.classList.remove('hidden');
    ipadapter_parent.classList.remove('hidden');
    openpose_parent.classList.remove('hidden');
    canny_parent.classList.remove('hidden');
    depth_parent.classList.remove('hidden');

    person_lora_container.classList.remove('hidden');
    person_lora_inf_container.classList.remove('hidden');
    neg_prompt_container.classList.remove('hidden');
    guidance_scale_container.classList.remove('hidden');
    denoising_steps_container.classList.remove('hidden');
}


function attemptToShowPromptSettingsSection() {
    let promptSettingsSectionButton = document.getElementById('prompt-settings-section-button');
    if(promptSettingsSectionButton.getAttribute('data-te-collapse-collapsed') != null) {
        promptSettingsSectionButton.click();
    }
}



function selectModelWithVersion(version) {
    let loraPersonGrid = document.getElementById('lora-person-grid');
    deSelectAllLoraPersonOptions();
    let loraPersonDivs = loraPersonGrid.children;

    var selected = false; // Flag to keep track if a matching option was found


    for (let i = 0; i < loraPersonDivs.length; i++) {
        if (loraPersonDivs[i].getAttribute('version') === version) {
            console.log('Found a matching version in the lora person divs for version: ', version);
            selectLoraPersonDiv(loraPersonDivs[i]);
            selected = true;
            break;
        }
    }

    if (!selected) {
        console.log('About to select the first lora person div in the grid');
        selectLoraPersonDiv(loraPersonDivs[0]);
    }
}

function selectPromptStyle(prompt_style) {
    let promptStyleGrid = document.getElementById('prompt-style-grid');
    deSelectAllPromptStylesOptions();
    let promptStyleDivs = promptStyleGrid.children;

    var selected = false; // Flag to keep track if a matching option was found

    for (let i = 0; i < promptStyleDivs.length; i++) {
        if (promptStyleDivs[i].getAttribute('prompt-style') === prompt_style) {
            selectPromptStyleDiv(promptStyleDivs[i]);
            selected = true;
            break;
        }
    }

    if (!selected) {
        selectPromptStyleDiv(promptStyleDivs[0]);
    }
}

function selectRefImageMode(ref_img_mode) {
    let refImgModeSelector = document.getElementById('ref-img-mode');
    for (let i = 0; i < refImgModeSelector.options.length; i++) {
        if (refImgModeSelector.options[i].id === ref_img_mode) {
            refImgModeSelector.selectedIndex = i;
            break;
        }
    }
}

function isProvidedUrlInvalid(img_url) {
    if (img_url) {
        if (isValidImageUrl(img_url) == false) {
            displayErrorBanner('The provided reference image url does not seem to point to a valid image url. Try a different one.');
            return true;
        }
    }

    console.log('the img url where its breaking: ', img_url);
    let isUrlExpired = isImageUrlExpired(img_url);
    if (isUrlExpired) {
        console.log('url is expired');
        displayErrorBanner('Reference image url is expired. Try a different a different url.');
        return true;
    }

    return false;
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

    if (isProvidedUrlInvalid(promptValues.img2imgUrl) || isProvidedUrlInvalid(promptValues.openPoseUrl) || isProvidedUrlInvalid(promptValues.cannyUrl) || isProvidedUrlInvalid(promptValues.depthUrl)) {
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

    // old code to help alert the user that they selected a custom person model but didnt mention them in their prompt. to re-enable later.
    // const customSdxlCount = modelValues.filter(modelValue => modelValue.includes('custom_sdxl')).length;

    // let customSdxlModelNamesIncluded = modelValues.some((modelValue, index) => {
    //     console.log('Model value is: ', modelValue);
    //     return modelValue.includes('custom_sdxl') && promptValues.prompt.includes(modelNames[index]);
    // });

    // console.log('the customSdxlModelNamesIncluded value: ', customSdxlModelNamesIncluded);

    // if (!customSdxlModelNamesIncluded && customSdxlCount > 0) {
    //     displayErrorBanner('A fine tuned model is selected but not mentioned in the prompt.');
    //     return;
    // }

    var prompt = promptValues.prompt;
    if (isPromptInputShowingPlaceholder() == true) {
        // removePlaceholder();
        // document.getElementById('prompt').innerHTML = prompt;
        // console.log('the prompt after removing placeholder: ', document.getElementById('prompt').innerHTML);
        triggerModelNameInPromptFormatting();
    }

    for (let modelName of modelNames) {
        const modelNameRegex = new RegExp(`\\b${modelName}\\b`, 'g');
        prompt = prompt.replace(modelNameRegex, 'tzk');
    }

    // Validate the generation form before proceeding to fire off an API call

    let missingFields = [];
    if (!promptValues.inferenceSteps) missingFields.push('Denoising Steps');
    if (!promptValues.gscale) missingFields.push('Guidance Scale');
    if (!prompt) missingFields.push('Prompt');
    if (!promptValues.loraScale) missingFields.push('Lora Scale');

    if (missingFields.length > 0) {
        displayErrorBanner('Missing value(s) for: ' + missingFields.join(', '));
        return;
    }

    console.log('the event target is: ', event.currentTarget);
    let generateTarget = event.currentTarget;
    // generateTarget.disabled = true;
    let generateIcon = generateTarget.querySelector('i');
    // let generateText = generateTarget.querySelector('p');

    // if (generateText != null) {
    //     generateText.classList.add('opacity-0');
    //     generateIcon.classList.remove('hidden');
    // } else {
    generateIcon.className = 'fa-solid fa-spinner fa-spin'; // Change to spinner 
    // }

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

            let collectionId = getLastEditedCollectionInfo().collectionId;

            var jsonObject = {
                generationId: generateId(),
                userRecId: userRecId,
                collectionId: collectionId,
                userFacingModelName: modelName,
                modelName: replicateModelName,
                modelId: modelId,
                modelVersion: versionName,
                userFacingPrompt: userFacingPrompt,
                prompt: personalizedPrompt,
                promptStyle: promptValues.promptStyle,
                negativePrompt: promptValues.negativePrompt,
                gscale: promptValues.gscale,
                seed: seedToUse,
                img2imgUrl: promptValues.img2imgUrl,
                i2iRefImgInfo: promptValues.i2iRefImgInfo,
                promptStrength: promptValues.promptStrength,
                baseModel: promptValues.baseModel,

                maskUrl: promptValues.maskUrl,
                maskRefImgInfo: promptValues.maskRefImgInfo,
                maskBlur: promptValues.maskBlur,
                maskPaddingCrop: promptValues.maskPaddingCrop,

                ipAdapterUrl: promptValues.ipAdapterUrl,
                ipAdapterRefImgInfo: promptValues.ipAdapterRefImgInfo,
                ipAdapterInfValue: promptValues.ipAdapterInfValue,
                ipAdapterQuery: promptValues.ipAdapterQuery,

                openPoseUrl: promptValues.openPoseUrl,
                openPoseRefImgInfo: promptValues.openPoseRefImgInfo,
                openPoseInfValue: promptValues.openPoseInfValue,
                openPoseGuidanceStart: promptValues.openposeGuidanceStart,
                openPoseGuidanceEnd: promptValues.openposeGuidanceEnd,

                cannyUrl: promptValues.cannyUrl,
                cannyRefImgInfo: promptValues.cannyRefImgInfo,
                cannyInfValue: promptValues.cannyInfValue,
                cannyGuidanceStart: promptValues.cannyGuidanceStart,
                cannyGuidanceEnd: promptValues.cannyGuidanceEnd,

                depthUrl: promptValues.depthUrl,
                depthRefImgInfo: promptValues.depthRefImgInfo,
                depthInfValue: promptValues.depthInfValue,
                depthGuidanceStart: promptValues.depthGuidanceStart,
                depthGuidanceEnd: promptValues.depthGuidanceEnd,
            
                inferenceSteps: promptValues.inferenceSteps,
                shouldUseAys: promptValues.shouldUseAys,
                shouldUseHid: promptValues.shouldUseHid,
                loraScale: promptValues.loraScale,
                resWidth: promptValues.resWidth,
                resHeight: promptValues.resHeight,
                scheduler: promptValues.scheduler,
                refine: promptValues.refine,
                highNoiseFrac: promptValues.highNoiseFrac,
            };

            fireGenerateCall(jsonObject, generateTarget);
        }
    }
}

function fireGenerateCall(jsonObject, generateTarget) {
    console.log("fireGenerateCall, with jsonObject: ", jsonObject);

    let new_grid_item_html = newGenItem_FromNewGen(jsonObject.generationId);
    let new_grid_item_div = configureGenDivForSelection(new_grid_item_html);

    new_grid_item_div.hide().prependTo('#collection-grid').fadeIn(function() {
        new_grid_item_div.find('img').first().removeClass('hidden');
    });

    // Reset the prompt field to a new prompt if the promptField is in placeholder state
    if (isPromptInputShowingPlaceholder()) {
        let promptField = document.getElementById('prompt');
        let currrentPersonModelName = getCurrentPersonModelName();
        let newPrompt = generatePrompt(currrentPersonModelName);
        promptField.innerHTML = newPrompt;
        triggerModelNameInPromptFormatting();
    }
    
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
            resetGenerateTarget(generateTarget);
            let model_name = jsonObject.userFacingModelName;
            let is_warm = data.is_warm;
            let collection_id = data.collection_id;
            let generation_id = data.generation_id;
            console.log(`the locally created gen id: ${jsonObject.generationId}, and served gen id: ${generation_id}`)
            startListeningForGenerationUpdates(jsonObject.userRecId, collection_id, generation_id);
            // attemptToShowColdBootingBanner(model_name, is_warm);
        },
        error: function(data) {
            resetGenerateTarget(generateTarget);
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

function resetGenerateTarget(target) {
    let generateIcon = target.querySelector('i');
    // let generateText = target.querySelector('p');
    // if (generateText != null) {
    //     generateText.classList.remove('opacity-0');
    //     generateIcon.classList.add('hidden');
    // } else {
    generateIcon.className = 'fa-solid fa-bolt-lightning';
    // }
    // target.disabled = false;
    target.parentElement.click();
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

function startListeningForUpscalingUpdates(userRecId, collectionId, generationId) {
    console.log('startListeningForUpscalingUpdates started...');
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
            let upscale_result = generation_dict.hasOwnProperty('upscale_result') ? generation_dict['upscale_result'] : {};

            // "upscale_result": {
            //     "upscaled_blob_path": upscaled_blob_path,
            //     "upscaled_signed_url": upscaled_signed_url,
            //     "downscaled_blob_path": downscaled_blob_path,
            //     "downscaled_signed_url": downscaled_signed_url

            const gen_element = document.querySelector(`div[generation-id="${generationId}"]`);
            generation_dict.rec_id = generationId;

            if (prediction_status === PredictionStatus.IN_PROGRESS) {
                gen_element.querySelector('#gen-status').innerHTML = '...queued';
            } else if (prediction_status === PredictionStatus.BEING_HANDLED) {
                gen_element.querySelector('#gen-status').innerHTML = '...generating';
            } else if (prediction_status === PredictionStatus.SUCCEEDED) {
                gen_element.querySelector('#gen-loader').classList.add('hidden');
                gen_element.querySelector('#gen-status').innerHTML = '';
                let downscaled_signed_url = upscale_result.downscaled_signed_url;
                loadGenImage(downscaled_signed_url, gen_element);
                showDownloadUpscaledButton(gen_element);
                showUpscaledLabel(gen_element);
                console.log('generation succeeded, and heres the gen dict for it: ', generation_dict);
                configureFavoriteButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.FAILED) {
                console.log('generation failed');
                gen_element.querySelector('#gen-status').innerHTML = '';
                loadGenImage(FAILED_IMG_URL, gen_element);
                configureFavoriteButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.CANCELED) {
                console.log('generation canceled');
                gen_element.querySelector('#gen-status').innerHTML = '';
                loadGenImage(CANCELED_IMG_URL, gen_element);
                configureFavoriteButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
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
            generation_dict.rec_id = generationId;

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
                console.log('generation succeeded, and heres the gen dict for it: ', generation_dict);
                configureCopyButton(generation_dict, gen_element);
                configureFavoriteButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.FAILED) {
                console.log('generation failed');
                gen_element.querySelector('#gen-status').innerHTML = '';
                loadGenImage(FAILED_IMG_URL, gen_element);
                configureCopyButton(generation_dict, gen_element);
                configureFavoriteButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            } else if (prediction_status === PredictionStatus.CANCELED) {
                console.log('generation canceled');
                gen_element.querySelector('#gen-status').innerHTML = '';
                loadGenImage(CANCELED_IMG_URL, gen_element);
                configureCopyButton(generation_dict, gen_element);
                configureFavoriteButton(generation_dict, gen_element);
                unsubscribe(); // Stop listening for updates
            }

            console.log(`for gen_id: ${generationId} prediction_status is ${prediction_status}`);
    });
}

function configureCopyButton(gen_dict, gen_element) {
    gen_element.querySelector('#action-container').classList.remove('hidden');
    let copyButton = gen_element.querySelector('#copy-button');
    copyButton.classList.add('lg:flex');
    copyButton.addEventListener('click', function(event) {
        shiftAwayFromPromptPlaceholderState();
        copyPromptInfoFromGen(gen_dict);
        triggerModelNameInPromptFormatting();
        event.stopPropagation();
    });
}

function configureFavoriteButton(gen_dict, gen_element) {
    let favoriteButton = gen_element.querySelector('#favorite-button');
    favoriteButton.addEventListener('click', function(event) {
        console.log('clicked on favorite button with ', gen_dict);
        let generationId = gen_dict.rec_id;
        toggleFavoriteValue(generationId, favoriteButton);
        event.stopPropagation();
    });
    setFavoriteButtonState(favoriteButton, gen_dict.is_favorite);
}

function toggleFavoriteValue(generationId, favoriteButton) {
    showLoaderOnFavoriteButton(favoriteButton);
    let action = `${CONSTANTS.BACKEND_URL}generations/favorite`;
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            userRecId: getUserRecId(),
            collectionId: getLastEditedCollectionInfo().collectionId,
            generationId: generationId
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from generations/favorite endpoint with data: ', data);
            let isFavorite = data.new_favorite_value;
            setFavoriteButtonState(favoriteButton, isFavorite);
            hideLoaderOnFavoriteButton(favoriteButton);
        },
        error: function (data) {
            console.log('error from generations/favorite  endpoint is: ', data);
            hideLoaderOnFavoriteButton(favoriteButton);
        }
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



// Ref Image Functions

function userWantsToEnterRefImgUrl() {
    let refImgUrlElement = document.getElementById('ref-img-url');
    let refImgUrl = refImgUrlElement.value;
    let refImgMode = refImgUrlElement.getAttribute('mode');
    if (refImgUrl == '') {
        console.log('Entered ref img url is empty');
    }
    console.log('the entered ref img url is: ', refImgUrl);
    insertImgUrlForRefImg(refImgUrl, refImgMode);
    dismissEnterRefImgUrlModal();
}

function configureRefImageButtons() {
    let refImgButtonElements = referenceImgButtonElements(RefImageMode.ALL);
    let maskRefImgButtonElement = referenceImgButtonElements(RefImageMode.MASK)[0];
    refImgButtonElements.push(maskRefImgButtonElement);
    for(let i = 0; i < refImgButtonElements.length; i++) {
        let refImgButton = refImgButtonElements[i];
        console.log('the ref img button is: ', refImgButton);
        let refImgButtonMode = refImgButton.getAttribute('mode');
        let refImageUploadInput = refImgButton.nextElementSibling;
        console.log('the ref image upload input is: ', refImageUploadInput, ' the ref img mode: ', refImgButtonMode);

        refImageUploadInput.addEventListener("change", () => {
            console.log('Trigger change event of local upload input');
             const files = refImageUploadInput.files;
            handleRefImgFileUpload(files, refImgButton, refImgButtonMode);
            refImageUploadInput.value = '';
        });

        refImageUploadInput.addEventListener("click", () => {
            console.log('Trigger click event of local upload input');
        });

        refImgButton.addEventListener('dragenter', handleDragEnter);
        refImgButton.addEventListener('dragleave', handleDragLeave);
        refImgButton.addEventListener('dragover', handleDragOver);
        refImgButton.addEventListener('drop', handleDrop);
        refImgButton.addEventListener('click', triggerLocalUploadMenu);
    }
}

function genRefMenuShowing(event) {
    event.preventDefault();
    event.stopPropagation();
}

function triggerLocalUploadMenu(event) {
	event.preventDefault();
    console.log('time to show local upload flow');
    startRefUploadExperience(event);
}

function startRefUploadExperience(event) {
    let refImgButton = event.currentTarget;
    let refImageUploadInput = refImgButton.nextElementSibling;
    refImageUploadInput.click();
}

function handleDragEnter(event) {
    event.preventDefault();
    // Highlight the drag-and-drop box when a file is dragged over it
    // this.classList.add('highlight');
}
  
function handleDragLeave(event) {
    event.preventDefault();
    // Un-highlight the drag-and-drop box when a file is dragged away from it
    // this.classList.remove('highlight');
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    // Un-highlight the drag-and-drop box
    // this.classList.remove('highlight');

    let refImgButton = event.currentTarget;
    let refImgButtonMode = refImgButton.getAttribute('mode');

    // Get the files that were dropped and handle them
    var files = event.dataTransfer.files;
    handleRefImgFileUpload(files, refImgButton, refImgButtonMode);
}


function handleRefImgFileUpload(files, refImgButton, refImgMode) {
    console.log('handling file uploads: ', files);

    let file_to_upload = files[0];

    var didFindUnsupporedFileType = false;
    var unsupportedFileTypeFound = null;

    let reader = new FileReader();
    let file = file_to_upload;
    let filename = file.name;
    let fileType = file.type;
    let fileSize = file.size;
    console.log('The file type here is: ', fileType, ' and the file size is: ', fileSize);
    
    let uploadAreaButton = refImgButton
    let uploadSpinner = uploadAreaButton.querySelector('#upload-spinner');
    uploadSpinner.classList.remove('hidden');

    if (fileType === 'image/heic') {
        // Convert HEIC to JPEG using heic2any
        heic2any({
            blob: file,
            toType: "image/jpeg",
            quality: 0.8 // Adjust quality as needed
        })
        .then(function (conversionResult) {
            return resizeImage(conversionResult);
        })
        .then(function (resizedImage) {

            uploadSpinner.classList.add('hidden');

            reader.addEventListener('load', function(event) {
                let fileData = event.target.result;
                let fileInfo = {
                    name: filename,
                    type: 'image/jpeg', // Set the type to JPEG after conversion
                    size: summarizeFileSize(resizedImage.size),
                    data: fileData,
                };
                addFileToRefImgElement(fileInfo, refImgMode);
            });
            reader.readAsDataURL(resizedImage);
        })
        .catch(function (error) {
            console.error('Error converting HEIC to JPEG', error);
        });
    } else if (fileType === 'image/jpg' || fileType === 'image/jpeg' || fileType === 'image/png') {
        // Handle other image types as before
        resizeImage(file).then(function (resizedImage) {

            uploadSpinner.classList.add('hidden');

            reader.addEventListener('load', function(event) {
                let fileData = event.target.result;
                let fileInfo = {
                    name: filename,
                    type: fileType,
                    size: resizedImage.size,
                    data: fileData,
                };
                addFileToRefImgElement(fileInfo, refImgMode);
            });
            reader.readAsDataURL(resizedImage);
        });
    } else {
        didFindUnsupporedFileType = true;
        unsupportedFileTypeFound = fileType.split('/')[1];
    }

    if (didFindUnsupporedFileType) {
        displayWarningBanner(`The file you tried uploading is an unsupported image type: ${unsupportedFileTypeFound}. Please upload a JPG, JPEG, PNG, or HEIC file.`);
    }
}

function addFileToRefImgElement(fileInfo, refImageMode) {
    let refImgButtonElements = referenceImgButtonElements(refImageMode);
    for(let i = 0; i < refImgButtonElements.length; i++) {
        let refImgButtonElement = refImgButtonElements[i];
        let refImg = refImgButtonElement.querySelector('img');
        refImg.src = fileInfo.data;
        refImg.setAttribute('filename', fileInfo.name);
        refImg.setAttribute('fileType', fileInfo.type);
        refImg.classList.remove('hidden');
        refImgButtonElement.classList.remove('border-2', 'md:border-4', 'lg:border-2', 'border-dashed');
    }
}

function referenceImgButtonElements(refImageMode) {
    var refImgButtonElements = [];
    if (refImageMode == RefImageMode.IMG2IMG) {
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.IMG2IMG));
    } else if (refImageMode == RefImageMode.MASK) {
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.MASK));
    } else if (refImageMode == RefImageMode.IPADAPTER) {
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.IPADAPTER));
    } else if (refImageMode == RefImageMode.OPENPOSE) {
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.OPENPOSE));
    } else if (refImageMode == RefImageMode.CANNY) {
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.CANNY));
    } else if (refImageMode == RefImageMode.DEPTH) {
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.DEPTH));
    } else { // All case
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.IMG2IMG));
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.IPADAPTER));
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.OPENPOSE));
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.CANNY));
        refImgButtonElements.push(document.getElementById(RefImgModeImageButtonId.DEPTH));
    }
    return refImgButtonElements;
}

function referenceImgSectionButtons(refImageMode) {
    var refImgSectionButtons = [];
    if (refImageMode == RefImageMode.IMG2IMG) {
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.IMG2IMG));
     } else if (refImageMode == RefImageMode.IPADAPTER) {
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.IPADAPTER));
    } else if (refImageMode == RefImageMode.OPENPOSE) {
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.OPENPOSE));
    } else if (refImageMode == RefImageMode.CANNY) {
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.CANNY));
    } else if (refImageMode == RefImageMode.DEPTH) {
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.DEPTH));
    } else { // All case
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.IMG2IMG));
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.IPADAPTER));
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.OPENPOSE));
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.CANNY));
        refImgSectionButtons.push(document.getElementById(RefImgSectionButtonId.DEPTH));
    }
    return refImgSectionButtons;
}

function getBaseModelSelectionId() {
    let baseModelSelector = document.getElementById('base-model-selector');
    if (baseModelSelector) {
        return baseModelSelector.options[baseModelSelector.selectedIndex].id;
    }
    return 'sdxl';
}

function addChangeListenersForBaseModelSelector() {
    document.getElementById('base-model-selector').addEventListener('change', function() {
        updateGenerationEstimateLabel();
        let selectedOptionId = getBaseModelSelectionId();
        if (selectedOptionId === 'sdxl') {
            configureGenFormForSDXL();
        } else {
            configureGenFormForFlux();
        }
    });
}


function clearRefImgElement(event) {
    event.preventDefault();
    let clearRefImgButton = event.currentTarget;
    let refImgMode = clearRefImgButton.getAttribute('mode');
    let refImgButton = referenceImgButtonElements(refImgMode)[0];

    if (refImgMode != RefImageMode.MASK) {
        attemptToCloseRefImgSection(refImgMode);
    }

    let singleRefImg = refImgButton.querySelector('img');
    singleRefImg.src = '';
    singleRefImg.setAttribute('filename', '');
    singleRefImg.setAttribute('fileType', '');
    singleRefImg.classList.add('hidden');
    refImgButton.classList.add('border-2', 'md:border-4', 'lg:border-2', 'border-dashed');

    
}

function getRefImgSrc(refImgMode) {
    let i2iRefImgButton = referenceImgButtonElements(refImgMode)[0];
	let singleRefImageButton = i2iRefImgButton;
    // console.log('the single ref img button is: ', singleRefImageButton);
    let singleRefImg = singleRefImageButton.querySelector('img');
    return singleRefImg.src;
}

function getUploadedRef(refImgMode) {
	let singleRefImageButton = referenceImgButtonElements(refImgMode)[0];
    // console.log('the single ref img button is: ', singleRefImageButton);
    let singleRefImg = singleRefImageButton.querySelector('img');
    let singleRefSrcUrl = singleRefImg.src;

    let currentPageUrl = window.location.href;
    const isSameUrl = new URL(currentPageUrl).origin + new URL(currentPageUrl).pathname === new URL(singleRefSrcUrl).origin + new URL(singleRefSrcUrl).pathname;
    // console.log('the isSameUrl value is: ', isSameUrl);

    if (singleRefSrcUrl === '' || isSameUrl) {
        return null;
    }

	let singleRefImgInfo = {
        name: singleRefImg.getAttribute('filename'),
        data: singleRefSrcUrl,
        type: singleRefImg.getAttribute('fileType'),
    };
    return singleRefImgInfo;
}

function getImgInfoForUpscale(img_src) {
    let upscaleSourceImgInfo = {
        name: 'upscale-source-img',
        data: img_src,
        type: 'image/png',
    };
    return upscaleSourceImgInfo;
}


function configureInfiniteScroll() {
    const scrollableContainer = document.getElementById("collection-grid-container");
    scrollableContainer.addEventListener("scroll", () => {
        // console.log("Scroll Top: ", scrollableContainer.scrollTop, 
        //             "Client Height: ", scrollableContainer.clientHeight, 
        //             "Scroll Height: ", scrollableContainer.scrollHeight);
        if ((scrollableContainer.scrollTop + scrollableContainer.clientHeight) >= scrollableContainer.scrollHeight - 5) {
            if (isCurrentlyPaginatingPrompts) {
                // console.log('is currently paginating!');
                return
            } else {
                const last_doc_id = getLastDocIdFromLocalStorage();
                if (last_doc_id != null) {
                    // console.log('has a last doc id of: ', last_doc_id);
                    isCurrentlyPaginatingPrompts = true;
                    let collectionId = getLastEditedCollectionInfo().collectionId;
                    fetchGenerations(getUserRecId(), collectionId, last_doc_id);
                } else {
                    // console.log('doesnt have a last doc id, so no more things to fetch');
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
    console.log('in saving of last doc id: ', last_doc_id);
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
    var promptField = document.getElementById("prompt");
    let prompt = sanitizePrompt(promptField.innerHTML);

    let numberOfImages = document.getElementById('gen-count').value;
    var inferenceSteps = document.getElementById('denoising-steps').value;
    let aysToggleButton = document.getElementById('ays-toggle-button');
    let isAysToggled = aysToggleButton.classList.contains('enabled');
    let hidToggleButton = document.getElementById('hid-toggle-button');
    let isHidToggled = hidToggleButton.classList.contains('enabled');
    let negativePrompt = document.getElementById("neg-prompt").value;
    var gscale = document.getElementById('guidance-scale').value;
    let seed = document.getElementById('seed').value;
    let baseModel = getBaseModelSelectionId();

    // Reference image for all modes
    // Image-to-image
    let i2iUrl = document.getElementById(RefImgUrlInputId.IMG2IMG).value;
    let i2iRefImgInfo = getUploadedRef(RefImageMode.IMG2IMG);
    var promptStrength = document.getElementById(InfluenceValueInputId.IMG2IMG).value;
    if (promptStrength == '') {
        promptStrength = Img2ImgSettingValue.HIGH;
    } else if (promptStrength > 95) {
        promptStrength = 95;
        document.getElementById(InfluenceValueInputId.IMG2IMG).value = promptStrength;
    }
    let normalizedPromptStrength = 1 - promptStrength / 100;

    // Mask image
    let maskUrl = document.getElementById(RefImgUrlInputId.MASK).value;
    let maskRefImgInfo = getUploadedRef(RefImageMode.MASK);
    let maskBlur = document.getElementById('mask-blur').value;
    let maskPaddingCrop = document.getElementById('mask-padding-crop').value;

    // IPAdapter
    let ipAdapterUrl = document.getElementById(RefImgUrlInputId.IPADAPTER).value;
    let ipAdapterRefImgInfo = getUploadedRef(RefImageMode.IPADAPTER);
    var ipAdapterInfValue = document.getElementById(InfluenceValueInputId.IPADAPTER).value;
    if (ipAdapterInfValue == '') {
        ipAdapterInfValue = IPAdapterSettingValue.HIGH;
    }
    let instructPreset = document.getElementById('instruct-presets').value;
    let instructQuery = document.getElementById('instruct-query').value;
    let finalInstructQuery;
    if (!instructQuery) {
        finalInstructQuery = instructPreset;
    } else {
        finalInstructQuery = instructQuery;
    }

    // Openpose
    let openPoseUrl = document.getElementById(RefImgUrlInputId.OPENPOSE).value;
    let openPoseRefImgInfo = getUploadedRef(RefImageMode.OPENPOSE);
    var openPoseInfValue = document.getElementById(InfluenceValueInputId.OPENPOSE).value;
    if (openPoseInfValue == '') {
        openPoseInfValue = OpenPoseSettingValue.HIGH;
    }
    let openposeGuidanceStart = document.getElementById('openpose-guidance-start').value;
    let openposeGuidanceEnd = document.getElementById('openpose-guidance-end').value;
    if (openposeGuidanceStart == '') {
        openposeGuidanceStart = 0.0;
        document.getElementById('openpose-guidance-start').value = openposeGuidanceStart;
    }
    if (openposeGuidanceEnd == '') {
        openposeGuidanceEnd = 1.0;
        document.getElementById('openpose-guidance-end').value = openposeGuidanceEnd;
    }

    // Canny
    let cannyUrl = document.getElementById(RefImgUrlInputId.CANNY).value;
    let cannyRefImgInfo = getUploadedRef(RefImageMode.CANNY);
    var cannyInfValue = document.getElementById(InfluenceValueInputId.CANNY).value;
    if (cannyInfValue == '') {
        cannyInfValue = CannySettingValue.HIGH;
    }
    let cannyGuidanceStart = document.getElementById('canny-guidance-start').value;
    let cannyGuidanceEnd = document.getElementById('canny-guidance-end').value;
    if (cannyGuidanceStart == '') {
        cannyGuidanceStart = 0.0;
        document.getElementById('canny-guidance-start').value = cannyGuidanceStart;
    }
    if (cannyGuidanceEnd == '') {
        cannyGuidanceEnd = 1.0;
        document.getElementById('canny-guidance-end').value = cannyGuidanceEnd;
    }

    // depth
    let depthUrl = document.getElementById(RefImgUrlInputId.DEPTH).value;
    let depthRefImgInfo = getUploadedRef(RefImageMode.DEPTH);
    var depthInfValue = document.getElementById(InfluenceValueInputId.DEPTH).value;
    if (depthInfValue == '') {
        depthInfValue = DepthSettingValue.HIGH;
    }
    let depthGuidanceStart = document.getElementById('depth-guidance-start').value;
    let depthGuidanceEnd = document.getElementById('depth-guidance-end').value;
    if (depthGuidanceStart == '') {
        depthGuidanceStart = 0.0;
        document.getElementById('depth-guidance-start').value = depthGuidanceStart;
    }
    if (depthGuidanceEnd == '') {
        depthGuidanceEnd = 1.0;
        document.getElementById('depth-guidance-end').value = depthGuidanceEnd;
    }

    var loraScale = document.getElementById('person-lora-influence').value;
    let shouldUseRandomSeedAcrossModels = true;


    if (loraScale == '') {
        loraScale = 80;
    }
    let normalizedLoraScale = loraScale / 100;

    if (gscale == '') {
        gscale = 13;
    }

    if (inferenceSteps == '') {
        inferenceSteps = 20;
    }

    let loraPersonGrid = document.getElementById('lora-person-grid');
    let loraPersonDivs = loraPersonGrid.children;

    // console.log('the lora person divs: ', loraPersonDivs);

    // let dropdown = document.getElementById('model-dropdown');
    // let selectedOptions = dropdown.selectedOptions;
    var modelValues = [];
    var modelNames = [];
    var modelIds = [];
    var versionValues = [];
    var instanceKeys = [];
    var trainingSubjects = [];
    var genderTypes = [];
    for (var i = 0; i < loraPersonDivs.length; i++) {
        let isLoraPersonSelected = loraPersonDivs[i].classList.contains('selected');
        if (isLoraPersonSelected && !loraPersonDivs[i].id.includes('no-')) {
            modelValues.push(loraPersonDivs[i].getAttribute('model'));
            modelNames.push(loraPersonDivs[i].getAttribute('modelname'));
            modelIds.push(loraPersonDivs[i].getAttribute('id'));
            versionValues.push(loraPersonDivs[i].getAttribute('version'));
            instanceKeys.push(loraPersonDivs[i].getAttribute('instkey'));
            trainingSubjects.push(loraPersonDivs[i].getAttribute('trainingSubject'));
            genderTypes.push(loraPersonDivs[i].getAttribute('genderType'));
        }
    }

    if (modelValues.length == 0) {
        let baseModelSelector = document.getElementById('base-model-selector');
        let selectedOption = baseModelSelector.options[baseModelSelector.selectedIndex];
        modelValues.push(selectedOption.getAttribute('model'));
        modelNames.push(selectedOption.getAttribute('modelname'));
        modelIds.push(selectedOption.getAttribute('id'));
        versionValues.push(selectedOption.getAttribute('version'));
        instanceKeys.push(selectedOption.getAttribute('instkey'));
        trainingSubjects.push(selectedOption.getAttribute('trainingSubject'));
        genderTypes.push(selectedOption.getAttribute('genderType'));
    }

    let promptStyle = getCurrentPromptStyle();

    // console.log('the selected model names list: ', modelNames);
  
    return {
        prompt: prompt,
        promptStyle: promptStyle,
        numberOfImages: numberOfImages,
        inferenceSteps: inferenceSteps,
        shouldUseAys: isAysToggled,
        shouldUseHid: isHidToggled,
        negativePrompt: negativePrompt,
        gscale: gscale,
        seed: seed,
        img2imgUrl: i2iUrl,
        i2iRefImgInfo: i2iRefImgInfo,
        img2imgUrl: i2iUrl,
        i2iRefImgInfo: i2iRefImgInfo,
        maskUrl: maskUrl,
        maskRefImgInfo: maskRefImgInfo,
        maskBlur: maskBlur,
        maskPaddingCrop: maskPaddingCrop,
        ipAdapterUrl: ipAdapterUrl,
        ipAdapterRefImgInfo: ipAdapterRefImgInfo,
        ipAdapterInfValue: ipAdapterInfValue/100,
        ipAdapterQuery: finalInstructQuery,
        promptStrength: normalizedPromptStrength,
        openPoseUrl: openPoseUrl,
        openPoseRefImgInfo: openPoseRefImgInfo,
        openPoseInfValue: openPoseInfValue/100,
        openposeGuidanceStart: openposeGuidanceStart,
        openposeGuidanceEnd: openposeGuidanceEnd,
        cannyUrl: cannyUrl,
        cannyRefImgInfo: cannyRefImgInfo,
        cannyInfValue: cannyInfValue/100,
        cannyGuidanceStart: cannyGuidanceStart,
        cannyGuidanceEnd: cannyGuidanceEnd,
        depthUrl: depthUrl,
        depthRefImgInfo: depthRefImgInfo,
        depthInfValue: depthInfValue/100,
        depthGuidanceStart: depthGuidanceStart,
        depthGuidanceEnd: depthGuidanceEnd,
        loraScale: normalizedLoraScale,
        resWidth: 1024,
        resHeight: 1024,
        scheduler: 'DDIM',
        refine: 'no_refiner',
        highNoiseFrac: 0.9,
        shouldUseRandomSeedAcrossModels: shouldUseRandomSeedAcrossModels,
        baseModel: baseModel,
        modelValues: modelValues,
        modelNames: modelNames,
        modelIds: modelIds,
        versionValues: versionValues,
        instanceKeys: instanceKeys,
        trainingSubjects: trainingSubjects,
        genderTypes: genderTypes,
    }
}

function getCurrentPromptStyle() {
    let promptStyleGrid = document.getElementById('prompt-style-grid');
    let promptStyleDivs = promptStyleGrid.children;
    let selectedPromptStyleDiv;
    for (let i = 0; i < promptStyleDivs.length; i++) {
        if (promptStyleDivs[i].classList.contains('selected')) {
            selectedPromptStyleDiv = promptStyleDivs[i];
            break;
        }
    }
    return selectedPromptStyleDiv.getAttribute('prompt-style');
}

function getCurrentPersonModelName() {
    let loraPersonGrid = document.getElementById('lora-person-grid');
    let loraPersonDivs = loraPersonGrid.children;
    let selectedLoraPersonDiv;
    for (let i = 0; i < loraPersonDivs.length; i++) {
        if (loraPersonDivs[i].classList.contains('selected')) {
            selectedLoraPersonDiv = loraPersonDivs[i];
            break;
        }
    }
    return selectedLoraPersonDiv.getAttribute('modelname');
}

function updateCurrentCollectionLabels() {
    let collectionNameLabel = document.getElementById('collection-name-label');
    let genTopMenuCollectionName = document.getElementById('gen-top-menu-collection-name');
    collectionNameLabel.innerHTML = getLastEditedCollectionInfo().collectionName;
    genTopMenuCollectionName.innerHTML = getLastEditedCollectionInfo().collectionName;
}

function genTopCollectionMenuShowing(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('gen top collection menu showing');
}

function userWantsToCreateNewCollection() {
    let collectionName = document.getElementById('new-collection-name').value;
    if (collectionName == '') {
        console.log('Collection name is empty!');
        return;
    }

    let createButton = document.getElementById('create-new-collection-button');
    showLoaderOnButton(createButton);

    let action = `${CONSTANTS.BACKEND_URL}collections/create`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            collectionName: collectionName,
            userRecId: getUserRecId()
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from collections create endpoint with data: ', data);
            let collectionId = data.new_collection_id;
            console.log('the new collection id is: ', collectionId);
            removeLastEditedCollection();
            storeLastEditedCollection(collectionId, collectionName);
            hideLoaderOnButton(createButton);
            dismissNewCollectionModal();
            // clear the grid
            hideInfiniteLoader();
            document.getElementById('collection-grid').innerHTML = '';
            // show the grid loader
            $('#grid-loader').removeClass('hidden');

            fetchGenerations(getUserRecId(), collectionId, null);
            updateCurrentCollectionLabels();
        },
        error: function (data) {
            let status = data.status;
            let msg = data.responseText;
            if (status == 417) {
                let newCollectionErrorLabel = document.getElementById('new-collection-error-label');
                newCollectionErrorLabel.innerHTML = msg;
            }
            console.log('error from new collection endpoint is: ', data);
            hideLoaderOnButton(createButton);
        }
    });
}



function getCollectionList() {
    let action = `${CONSTANTS.BACKEND_URL}collections`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            userRecId: getUserRecId()
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from collections endpoint with data: ', data);

            let currentCollection = getLastEditedCollectionInfo().collectionId;

            let collectionsDictionary = data.collections;
            let collectionListElement = document.getElementById('collection-list');
            for (let collectionId in collectionsDictionary) {
                if(collectionId !== currentCollection) {
                    let collectionName = collectionsDictionary[collectionId];
                    let newCollectionOption = document.createElement('option');
                    newCollectionOption.value = collectionId;
                    newCollectionOption.innerHTML = collectionName;
                    collectionListElement.appendChild(newCollectionOption);
                }
            }
        },
        error: function (data) {
            console.log('error from collections endpoint is: ', data);
        }
    });
}

function userWantsToChangeCollection() {
    let collectionListElement = document.getElementById('collection-list');
    let selectedOption = collectionListElement.options[collectionListElement.selectedIndex];
    let collectionId = selectedOption.value;
    let collectionName = selectedOption.text;

    removeLastEditedCollection();
    storeLastEditedCollection(collectionId, collectionName);
    dismissChangeCollectionModal();
    // clear the grid
    hideInfiniteLoader();
    document.getElementById('collection-grid').innerHTML = '';
    // show the grid loader
    $('#grid-loader').removeClass('hidden');

    fetchGenerations(getUserRecId(), collectionId, null);
    updateCurrentCollectionLabels();
}

function userWantsToRenameCollection() {
    let collectionName = document.getElementById('rename-collection-name').value;
    if (collectionName == '') {
        console.log('Collection name is empty!');
        return;
    }

    let renameButton = document.getElementById('rename-new-collection-button');
    showLoaderOnButton(renameButton);

    let action = `${CONSTANTS.BACKEND_URL}collections/rename`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            collectionName: collectionName,
            collectionId: getLastEditedCollectionInfo().collectionId,
            userRecId: getUserRecId()
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from rename collection endpoint with data: ', data);
            let collectionId = getLastEditedCollectionInfo().collectionId;
            console.log('the new collection name is: ', collectionName);
            removeLastEditedCollection();
            storeLastEditedCollection(collectionId, collectionName);
            hideLoaderOnButton(renameButton);
            dismissRenameCollectionModal();
            updateCurrentCollectionLabels();
        },
        error: function (data) {
            let status = data.status;
            let msg = data.responseText;
            if (status == 417) {
                let newCollectionErrorLabel = document.getElementById('rename-collection-error-label');
                newCollectionErrorLabel.innerHTML = msg;
            }
            console.log('error from rename collection endpoint is: ', data);
            hideLoaderOnButton(renameButton);
        }
    });
}

function deleteButtonPressed(event) {
    event.preventDefault();
    let genElement = event.target.closest('[generation-id]');
    configureGenElementforDeletion(genElement);
    let generationId = genElement.getAttribute('generation-id');
    fireGenDeletion([generationId], [genElement]);
    event.stopPropagation();
}

function configureGenElementforDeletion(genElement) {
    hideGenMenuShield(genElement);
    setGenLoaderToDeleteMode(genElement);
}

function copyToOtherReferenceMode(refImgMode) {
    let img_src = getRefImgSrc(refImgMode);
    let modal_title = 'Copy to which reference mode?';
    showImageRefModelSelectionModal(modal_title, img_src);
}

function useAsReferenceImagePressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let genElement = event.target.closest('[generation-id]');
    hideGenMenuShield(genElement);
    let generationId = genElement.getAttribute('generation-id');
    let imgElement = genElement.querySelector('img');
    let imgSrc = imgElement.getAttribute('src');

    let modal_title = 'Select reference mode';
    showImageRefModelSelectionModal(modal_title, imgSrc);
    console.log(`Image source URL for generationId ${generationId}: ${imgSrc}`);
}

function downloadFullUpscalePressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let genElement = event.target.closest('[generation-id]');
    hideGenMenuShield(genElement);
}

function upscaleImagePressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let genElement = event.target.closest('[generation-id]');
    hideGenMenuShield(genElement);
    let generationId = genElement.getAttribute('generation-id');
    let imgElement = genElement.querySelector('img');
    let imgSrc = imgElement.getAttribute('src');
    console.log("Time to attempt a high-res upscale of the image with generationId: ", generationId);
    kickoffUpscale(imgSrc);
}

function kickoffUpscale(imgSrc) {
    let collectionId = getLastEditedCollectionInfo().collectionId;
    let seed = Math.floor(Math.random() * 429496719);
    let sourceImageInfo = getImgInfoForUpscale(imgSrc);
    let generationId = generateId()

    let new_grid_item_html = newGenItem_FromNewGen(generationId);
    let new_grid_item_div = configureGenDivForSelection(new_grid_item_html);

    new_grid_item_div.hide().prependTo('#collection-grid').fadeIn(function() {
        new_grid_item_div.find('img').first().removeClass('hidden');
    });

    let action = `${CONSTANTS.BACKEND_URL}upscale/new`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            userRecId: getUserRecId(),
            generationId: generationId,
            seed: seed,
            sourceImageInfo: sourceImageInfo,
            modelName: "clarity_upscaler",
            collectionId: collectionId
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from upscale endpoint with data: ', data);
            let collection_id = data.collection_id;
            let generation_id = data.generation_id;
            startListeningForUpscalingUpdates(getUserRecId(), collection_id, generation_id);
        },
        error: function (data) {
            console.log('error from upscale endpoint is: ', data);
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

function toggleRefImgModeSelection(refImgMode) {
    const index = selectedRefImgModes.indexOf(refImgMode);
    if (index > -1) {
        selectedRefImgModes.splice(index, 1);
    } else {
        selectedRefImgModes.push(refImgMode);
    }
}

function copyPromptFromGenMenuPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let genElement = event.target.closest('[generation-id]');
    let copyButton = genElement.querySelector('#copy-button');
    copyButton.click();
    hideGenMenuShield(genElement);
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

function fireGenDeletion(generationIds, genElements) {
    let action = `${CONSTANTS.BACKEND_URL}generate/delete`
    $.ajax({
        type: 'POST',
        url: action,
        data: JSON.stringify({
            generationIds: generationIds,
            collectionId: getLastEditedCollectionInfo().collectionId,
            userRecId: getUserRecId()
        }),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            console.log('got success from delete gen endpoint for id: ', generationIds);
            for (let genElement of genElements) {
                removeGenItem(genElement);
            }
        },
        error: function (data) {
            console.log("error deleting generation with id: ", generationIds);
            console.log('error from endpoint is: ', data);
            for (let genElement of genElements) {
                resetGenLoaderFromDelete(genElement);
            }
        }
    });
}

function clickedOutsideOfGenMenu() {
    console.log('clickedOutsideOfGenMenu was called');
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

    let genTopMenu = document.querySelector('#gen-top-collection-menu');
    genTopMenu.__x.$data.open = false;

    let editRefImgMenu = document.querySelector('#edit-ref-comp-menu');
    editRefImgMenu.__x.$data.open = false;
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
    baseModelId = getBaseModelSelectionId();

    if (baseModelId == 'sdxl') {
        let sdxlPriceInfo = getPriceInfo(PriceInfoTypes.SDXL);
        if (sdxlPriceInfo == null) {
            return;
        }
        updateCostLabelsForSDXL(sdxlPriceInfo);
    } else if (baseModelId == 'flux-schnell') {
        let fluxPriceInfo = getPriceInfo(PriceInfoTypes.FLUX);
        if (fluxPriceInfo == null) {
            return;
        }
        updateCostLabelsForFlux(fluxPriceInfo);
    }
}

function updateCostLabelsForFlux(fluxPriceInfo) {
    let costPerImage = fluxPriceInfo['cost_per_image'];
    console.log('flux, cost per image is: ', costPerImage);
    document.getElementById('generation-estimate-label').innerHTML = `~$${costPerImage} / image`;
    document.getElementById('secondary-gen-estimate-label').innerHTML = `~$${costPerImage} / image`;
}

function updateCostLabelsForSDXL(sdxlPriceInfo) {
    let inf_price = sdxlPriceInfo['inference_price'];
    let inference_steps = document.getElementById('denoising-steps').value;
    let base_price_estimate = inf_price * inference_steps;

    let cold_boot_upcharge = sdxlPriceInfo['cold_boot_upcharge'];
    let warmed_upcharge = sdxlPriceInfo['warmed_upcharge'];
    let estimatedColdPrice = base_price_estimate + cold_boot_upcharge;
    let estimatedWarmedPrice = base_price_estimate + warmed_upcharge;
    document.getElementById('generation-estimate-label').innerHTML = `~$${estimatedWarmedPrice.toFixed(2)} ($${estimatedColdPrice.toFixed(2)} from cold boot) / image`;
    document.getElementById('secondary-gen-estimate-label').innerHTML = `~$${estimatedWarmedPrice.toFixed(2)} ($${estimatedColdPrice.toFixed(2)} from cold boot) / image`;
}

function basicPromptExampleButtonPressed(event) {
    event.preventDefault();
    window.open(`https://${CONSTANTS.SITE_URL}/prompt-examples/basic`, '_blank');
}

function appropriateModelBgColor(model) {
    let bg_color = model.bg_color || '#1f2937';
    if (model.status === PredictionStatus.CANCELED || model.status === PredictionStatus.FAILED) {
        bg_color = canceledColor;
    } else if (model.status === PredictionStatus.FAILED) {
        bg_color = failedColor;
    }
    return bg_color;
}


function loraPersonPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let loraPersonDiv = event.currentTarget;
    if (loraPersonDiv.classList.contains('selected')) {
        if (loraPersonDiv.id != 'no-lora-person-button') {
            deSelectLoraPersonDiv(loraPersonDiv);
            let noLoraPersonDiv = document.getElementById('no-lora-person-button');
            selectLoraPersonDiv(noLoraPersonDiv);
        }
    } else {
        deSelectAllLoraPersonOptions();
        selectLoraPersonDiv(loraPersonDiv);
    }
}

function deSelectLoraPersonDiv(loraPersonDiv) {
    let pElement = loraPersonDiv.querySelector('p');
    let selectedCheckDiv = loraPersonDiv.querySelector('#selected-check');
    let bgParentDiv = pElement.parentElement.parentElement;
    let bgColor = loraPersonDiv.getAttribute('bgColor');
    loraPersonDiv.classList.remove('selected');
    selectedCheckDiv.classList.add('hidden');
    pElement.style.color = bgColor;
    bgParentDiv.style.backgroundColor = '';
    bgParentDiv.classList.add('bg-white');
}

function selectLoraPersonDiv(loraPersonDiv) {
    let pElement = loraPersonDiv.querySelector('p');
    let selectedCheckDiv = loraPersonDiv.querySelector('#selected-check');
    let bgParentDiv = pElement.parentElement.parentElement;
    let bgColor = loraPersonDiv.getAttribute('bgColor');
    loraPersonDiv.classList.add('selected');
    selectedCheckDiv.classList.remove('hidden');
    pElement.style.color = 'white';
    bgParentDiv.style.backgroundColor = bgColor;
    bgParentDiv.classList.remove('bg-white');

    lastSelectedModelVersion = loraPersonDiv.getAttribute('version');

    let selectedPersonLoraLabel = document.getElementById('selected-person-lora');
    selectedPersonLoraLabel.innerHTML = loraPersonDiv.querySelector('p').innerHTML;
    personLoraSelectionMade();

    let loraPersonGrid = document.getElementById('lora-person-grid');
    let scrollPosition = loraPersonDiv.offsetLeft - loraPersonGrid.offsetLeft 
    + loraPersonDiv.offsetWidth / 2 
    - loraPersonGrid.offsetWidth / 2;
    loraPersonGrid.scrollLeft = scrollPosition;
}

function deSelectAllLoraPersonOptions() {
    let loraPersonGrid = document.getElementById('lora-person-grid');
    let loraPersonDivs = loraPersonGrid.children;
    for (let i = 0; i < loraPersonDivs.length; i++) {
        deSelectLoraPersonDiv(loraPersonDivs[i]);
    }
}

function personLoraSelectionMade() {
    let loraPersonGrid = document.getElementById('lora-person-grid');

    let selectedLoraPersonDiv = loraPersonGrid.querySelector('.selected');
    let selectedLoraPersonId = selectedLoraPersonDiv ? selectedLoraPersonDiv.id : null;
    // console.log('selectedLoraPersonId is: ', selectedLoraPersonId);
    // console.log('previousModelSelectionId is: ', previousModelSelectionId);

    let previousLoraPersonDiv = loraPersonGrid.querySelector(`div[id="${previousModelSelectionId}"]`);
    let newLoraPersonDiv = loraPersonGrid.querySelector(`div[id="${selectedLoraPersonId}"]`);

    let previousLoraPersonName = previousLoraPersonDiv ? previousLoraPersonDiv.getAttribute('modelname') : '';
    let newLoraPersonName = newLoraPersonDiv ? newLoraPersonDiv.getAttribute('modelname') : '';

    // console.log('previousLoraPersonDiv is: ', previousLoraPersonDiv);
    let previousReplicateName = previousLoraPersonDiv.getAttribute('model');
    let newReplicateName = newLoraPersonDiv.getAttribute('model');

    if (newReplicateName.includes('custom_sdxl')) {
        promptPlaceholderText = generatePrompt(newLoraPersonName);
    } else {
        promptPlaceholderText = generatePrompt('');
    }

    // Try to swap trained model name with another selected trained model. Else set the appropriate placeholder if in placeholder state 
    const promptInput = document.getElementById('prompt');

    if (previousReplicateName.includes('custom_sdxl') && newReplicateName.includes('custom_sdxl')) {
        // Swap the modelName in the prompt if it exists
        const promptText = promptInput.textContent || promptInput.innerText;

        if (promptText.includes(previousLoraPersonName)) {
            promptInput.textContent = promptText.replace(previousLoraPersonName, newLoraPersonName);
        }
    } else if (isPromptInputShowingPlaceholder()) {
        promptInput.textContent = promptPlaceholderText;
    }

    // Update the previous selection id for the next change event
    previousModelSelectionId = selectedLoraPersonId;

    triggerModelNameInPromptFormatting();
    updateGenerationEstimateLabel();
}

// Prompt Style functions

function promptStylePressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let promptStyleDiv = event.currentTarget;
    let negPromptTextfield = document.getElementById('neg-prompt');

    if (promptStyleDiv.classList.contains('selected')) {
        if (promptStyleDiv.id != 'no-prompt-style-button') {
            deSelectPromptStyleDiv(promptStyleDiv);
            let noPromptStyleDiv = document.getElementById('no-prompt-style-button');
            selectLoraPersonDiv(noPromptStyleDiv);
            negPromptTextfield.textContent = 'ugly, morbid, photorealistic';
        }
    } else {
        deSelectAllPromptStylesOptions();
        selectPromptStyleDiv(promptStyleDiv);
        if (promptStyleDiv.id != 'no-prompt-style-button') {
            negPromptTextfield.textContent = '';
        } else {
            negPromptTextfield.textContent = 'ugly, morbid, photorealistic';
        }
    }
}

function deSelectPromptStyleDiv(promptStyleDiv) {
    let pElement = promptStyleDiv.querySelector('p');
    let imgElement = promptStyleDiv.querySelector('img');
    let selectedCheckDiv = promptStyleDiv.querySelector('#selected-check');
    let bgParentDiv = pElement.parentElement.parentElement;
    let bgColor = promptStyleDiv.getAttribute('bgColor');
    promptStyleDiv.classList.remove('selected');
    selectedCheckDiv.classList.add('hidden');
    pElement.style.color = bgColor;
    bgParentDiv.style.backgroundColor = '';
    bgParentDiv.classList.add('bg-white');
}

function selectPromptStyleDiv(promptStyleDiv) {
    let pElement = promptStyleDiv.querySelector('p');
    let selectedCheckDiv = promptStyleDiv.querySelector('#selected-check');
    let bgParentDiv = pElement.parentElement.parentElement;
    let bgColor = promptStyleDiv.getAttribute('bgColor');
    promptStyleDiv.classList.add('selected');
    selectedCheckDiv.classList.remove('hidden');
    pElement.style.color = 'white';
    bgParentDiv.style.backgroundColor = bgColor;
    bgParentDiv.classList.remove('bg-white');

    let selectedPromptStyleLabel = document.getElementById('selected-prompt-style-label');
    selectedPromptStyleLabel.innerHTML = promptStyleDiv.querySelector('p').innerHTML;

    let promptStyleGrid = document.getElementById('prompt-style-grid');
    let scrollPosition = promptStyleDiv.offsetLeft - promptStyleGrid.offsetLeft 
    + promptStyleDiv.offsetWidth / 2 
    - promptStyleGrid.offsetWidth / 2;
    promptStyleGrid.scrollLeft = scrollPosition;
}

function deSelectAllPromptStylesOptions() {
    let promptStyleGrid = document.getElementById('prompt-style-grid');
    let promptStyleDivs = promptStyleGrid.children;
    for (let i = 0; i < promptStyleDivs.length; i++) {
        deSelectPromptStyleDiv(promptStyleDivs[i]);
    }
}



function toggleAysPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let aysButton = event.currentTarget;
    let shouldEnableAys = !aysButton.classList.contains('enabled');
    if (shouldEnableAys) {
        // selectRefImageMode(RefImageMode.IMG2IMG);
    }
    updateAysToggle(shouldEnableAys);
}

function updateAysToggle(shouldEnable) {
    var translate_x_amount = previousWindowWidth < 768 ? 'translate-x-5' : 'md:translate-x-10';
    let aysButton = document.getElementById('ays-toggle-button');
    let span = aysButton.querySelector('span');
    let denoisingStepsField = document.getElementById('denoising-steps');
    if (shouldEnable) {
        aysButton.classList.add('enabled');
        aysButton.classList.add('bg-black');
        aysButton.classList.remove('bg-gray-200');
        span.classList.remove('translate-x-0');
        span.classList.remove('translate-x-5');
        span.classList.add(translate_x_amount);
        denoisingStepsField.disabled = true;
        denoisingStepsField.classList.remove('text-gray-900');
        denoisingStepsField.classList.add('text-gray-400');
        updateHiDToggle(false);
    } else {
        aysButton.classList.remove('enabled');
        aysButton.classList.remove('bg-black');
        aysButton.classList.add('bg-gray-200');
        span.classList.remove(translate_x_amount);
        span.classList.remove('translate-x-5');
        span.classList.add('translate-x-0');
        denoisingStepsField.disabled = false;
        denoisingStepsField.classList.add('text-gray-900');
        denoisingStepsField.classList.remove('text-gray-400');
    }
}

function toggleHiDPressed(event) {
    event.preventDefault();
    event.stopPropagation();
    let hiDButton = event.currentTarget;
    let shouldEnableHiD = !hiDButton.classList.contains('enabled');
    updateHiDToggle(shouldEnableHiD);
}

function updateHiDToggle(shouldEnable) {
    let hiDButton = document.getElementById('hid-toggle-button');
    let span = hiDButton.querySelector('span');

    if (shouldEnable) {
        hiDButton.classList.add('enabled');
        hiDButton.classList.add('bg-black');
        hiDButton.classList.remove('bg-gray-200');
        span.classList.add('translate-x-5');
        span.classList.remove('translate-x-0');
        updateAysToggle(false);
    } else {
        hiDButton.classList.remove('enabled');
        hiDButton.classList.remove('bg-black');
        hiDButton.classList.add('bg-gray-200');
        span.classList.remove('translate-x-5');
        span.classList.add('translate-x-0');
    }
}


// Reference Image Mode and Influence Setting functions

function alignAYSBasedOnRefImgMode() {
    let refImgModeSelector = document.getElementById('ref-img-mode');
    let selectedMode = refImgModeSelector.options[refImgModeSelector.selectedIndex].id;

    let i2iModeInfoButton = document.getElementById(RefImgModeInfoButtonId.IMG2IMG);

    if (selectedMode == RefImageMode.IMG2IMG) {
        i2iModeInfoButton.classList.remove('hidden');
    }
}

function infSettingDropdownSelectionMade(event) {
    event.preventDefault();
    let refImgMode = event.currentTarget.getAttribute('mode');
    let selectedOption = event.target.options[event.target.selectedIndex];
    let influence_setting = selectedOption.getAttribute('inf-setting');
    setRefImgInfluenceValue(influence_setting, refImgMode);
    updateInfSettingTabUI(influence_setting, refImgMode);
}

function infSettingTabSelected(influence_setting, refImgMode) {
    setRefImgInfluenceValue(influence_setting, refImgMode);
    updateInfSettingTabUI(influence_setting, refImgMode);
}

function alignInfluenceSettingToValue(refImgMode) {
    var influence_value_field_id = null;
    if (refImgMode == RefImageMode.IMG2IMG) {
        influence_value_field_id = InfluenceValueInputId.IMG2IMG;
    } else if (refImgMode == RefImageMode.IPADAPTER) {
        influence_value_field_id = InfluenceValueInputId.IPADAPTER;
    } else if (refImgMode == RefImageMode.OPENPOSE) {
        influence_value_field_id = InfluenceValueInputId.OPENPOSE;
    } else if (refImgMode == RefImageMode.CANNY) {
        influence_value_field_id = InfluenceValueInputId.CANNY;
    } else if (refImgMode == RefImageMode.DEPTH) {
        influence_value_field_id = InfluenceValueInputId.DEPTH;
    } else {
        return;
    }

    let influence_value = document.getElementById(influence_value_field_id).value;
    let influence_setting;

    if (refImgMode == RefImageMode.IMG2IMG) {
        if (influence_value <= Img2ImgSettingValue.LOW) {
            influence_setting = InfluenceSetting.LOW;
        } else if (influence_value <= Img2ImgSettingValue.MEDIUM) {
            influence_setting = InfluenceSetting.MEDIUM;
        } else if (influence_value <= Img2ImgSettingValue.HIGH) {
            influence_setting = InfluenceSetting.HIGH;
        } else {
            influence_setting = InfluenceSetting.FULL;
        }
    } else if (refImgMode == RefImageMode.IPADAPTER) {
        if (influence_value <= IPAdapterSettingValue.LOW) {
            influence_setting = InfluenceSetting.LOW;
        } else if (influence_value <= IPAdapterSettingValue.MEDIUM) {
            influence_setting = InfluenceSetting.MEDIUM;
        } else if (influence_value <= IPAdapterSettingValue.HIGH) {
            influence_setting = InfluenceSetting.HIGH;
        } else {
            influence_setting = InfluenceSetting.FULL;
        }
    } else if (refImgMode == RefImageMode.OPENPOSE) {
        if (influence_value <= OpenPoseSettingValue.LOW) {
            influence_setting = InfluenceSetting.LOW;
        } else if (influence_value <= OpenPoseSettingValue.MEDIUM) {
            influence_setting = InfluenceSetting.MEDIUM;
        } else if (influence_value <= OpenPoseSettingValue.HIGH) {
            influence_setting = InfluenceSetting.HIGH;
        } else {
            influence_setting = InfluenceSetting.FULL;
        }
    } else if (refImgMode == RefImageMode.CANNY) {
        if (influence_value <= CannySettingValue.LOW) {
            influence_setting = InfluenceSetting.LOW;
        } else if (influence_value <= CannySettingValue.MEDIUM) {
            influence_setting = InfluenceSetting.MEDIUM;
        } else if (influence_value <= CannySettingValue.HIGH) {
            influence_setting = InfluenceSetting.HIGH;
        } else {
            influence_setting = InfluenceSetting.FULL;
        }
    } else if (refImgMode == RefImageMode.DEPTH) {
        if (influence_value <= DepthSettingValue.LOW) {
            influence_setting = InfluenceSetting.LOW;
        } else if (influence_value <= DepthSettingValue.MEDIUM) {
            influence_setting = InfluenceSetting.MEDIUM;
        } else if (influence_value <= DepthSettingValue.HIGH) {
            influence_setting = InfluenceSetting.HIGH;
        } else {
            influence_setting = InfluenceSetting.FULL;
        }
    } else {
        return;
    }

    updateInfSettingTabUI(influence_setting, refImgMode);
}



function updateInfSettingTabUI(selected_influence_setting, refImgMode) {
    var infSettingTabsSelectorId = null;
    if (refImgMode == RefImageMode.IMG2IMG) {
        infSettingTabsSelectorId = InfluenceTabSelectorId.IMG2IMG;
    } else if (refImgMode == RefImageMode.IPADAPTER) {
        infSettingTabsSelectorId = InfluenceTabSelectorId.IPADAPTER;
    } else if (refImgMode == RefImageMode.OPENPOSE) {
        infSettingTabsSelectorId = InfluenceTabSelectorId.OPENPOSE;
    } else if (refImgMode == RefImageMode.CANNY) {
        infSettingTabsSelectorId = InfluenceTabSelectorId.CANNY;
    } else if (refImgMode == RefImageMode.DEPTH) {
        infSettingTabsSelectorId = InfluenceTabSelectorId.DEPTH;
    } else {
        return;
    }

    let selectorElement = document.getElementById(infSettingTabsSelectorId);
    let aElements = selectorElement.getElementsByTagName('a');
    for(let i = 0; i < aElements.length; i++) {
        let infSetting_a_element = aElements[i];
        let infLineSpan = infSetting_a_element.querySelector('#inf-line');

        if(infSetting_a_element.getAttribute('inf-setting') == selected_influence_setting) {
            // set it's state to active
            infSetting_a_element.classList.add('text-gray-900');
            infSetting_a_element.classList.remove('text-gray-500', 'hover:text-gray-700');
            infLineSpan.classList.add('bg-black');
            infLineSpan.classList.remove('bg-transparent');
        } else {
            // set its state inactive
            infSetting_a_element.classList.add('text-gray-500', 'hover:text-gray-700');
            infSetting_a_element.classList.remove('text-gray-900');
            infLineSpan.classList.add('bg-transparent');
            infLineSpan.classList.remove('bg-black');
        }
    }
}

function setRefImgInfluenceValue(selected_influence_setting, refImgMode) {
    var influence_value_field_id = null;
    var influenceValue = 0;

    if (refImgMode == RefImageMode.IMG2IMG) {
        influence_value_field_id = InfluenceValueInputId.IMG2IMG;
        influenceValue = Img2ImgSettingValue[selected_influence_setting.toUpperCase()];
    } else if (refImgMode == RefImageMode.IPADAPTER) {
        influence_value_field_id = InfluenceValueInputId.IPADAPTER;
        influenceValue = IPAdapterSettingValue[selected_influence_setting.toUpperCase()];
    } else if (refImgMode == RefImageMode.OPENPOSE) {
        influence_value_field_id = InfluenceValueInputId.OPENPOSE;
        influenceValue = OpenPoseSettingValue[selected_influence_setting.toUpperCase()];
    } else if (refImgMode == RefImageMode.CANNY) {
        influence_value_field_id = InfluenceValueInputId.CANNY;
        influenceValue = CannySettingValue[selected_influence_setting.toUpperCase()];
    } else if (refImgMode == RefImageMode.DEPTH) {
        influence_value_field_id = InfluenceValueInputId.DEPTH;
        influenceValue = DepthSettingValue[selected_influence_setting.toUpperCase()];
    } else {
        return;
    }

    let influenceValueField = document.getElementById(influence_value_field_id);
    influenceValueField.value = influenceValue;

    // Fire the input event for the prompt strength field
    influenceValueField.dispatchEvent(new Event('input'));
}


// Person Influence Setting functions

function personInfSettingDropdownSelectionMade(event) {
    event.preventDefault();
    let selectedOption = event.target.options[event.target.selectedIndex];
    let influence_setting = selectedOption.getAttribute('inf-setting');
    setPersonInfluenceValue(influence_setting);
    updatePersonInfSettingTabUI(influence_setting);
}

function setPersonInfluenceValue(selected_influence_setting) {
    let personLoraInfluenceField = document.getElementById('person-lora-influence');
    personLoraInfluenceField.value = PersonLoraSettingValue[selected_influence_setting.toUpperCase()];
}

function updatePersonInfSettingDropdownUI(selected_influence_setting) {
    let dropdown = document.getElementById('person-influence-setting-dropdown-selector');
    for(let i = 0; i < dropdown.options.length; i++) {
        if(dropdown.options[i].getAttribute('inf-setting') == selected_influence_setting) {
            dropdown.selectedIndex = i;
            break;
        }
    }
}

function updatePersonInfSettingTabUI(selected_influence_setting) {
    //  Update the state of the influence setting tab UI
    let navElement = document.getElementById('person-influence-setting-tabs-selector');
    let aElements = navElement.getElementsByTagName('a');
    for(let i = 0; i < aElements.length; i++) {
        let infSetting_a_element = aElements[i];
        let infLineSpan = infSetting_a_element.querySelector('#inf-line');

        if(infSetting_a_element.getAttribute('inf-setting') == selected_influence_setting) {
            // set it's state to active
            infSetting_a_element.classList.add('text-gray-900');
            infSetting_a_element.classList.remove('text-gray-500', 'hover:text-gray-700');
            infLineSpan.classList.add('bg-black');
            infLineSpan.classList.remove('bg-transparent');
        } else {
            // set its state inactive
            infSetting_a_element.classList.add('text-gray-500', 'hover:text-gray-700');
            infSetting_a_element.classList.remove('text-gray-900');
            infLineSpan.classList.add('bg-transparent');
            infLineSpan.classList.remove('bg-black');
        }
    }
}

function personInfSettingTabSelected(influence_setting) {
    setPersonInfluenceValue(influence_setting);
    updatePersonInfSettingTabUI(influence_setting);

    // Set the dropdown to the selected value
    let dropdown = document.getElementById('person-influence-setting-dropdown-selector');
    for(let i = 0; i < dropdown.options.length; i++) {
        if(dropdown.options[i].getAttribute('inf-setting') == influence_setting) {
            dropdown.selectedIndex = i;
            break;
        }
    }
}

function alignPersonInfluenceSettingToValue() {
    let influence_value = document.getElementById('person-lora-influence').value;
    let influence_setting;


        if (influence_value <= PersonLoraSettingValue.LOW) {
            influence_setting = InfluenceSetting.LOW;
        } else if (influence_value <= PersonLoraSettingValue.MEDIUM) {
            influence_setting = InfluenceSetting.MEDIUM;
        } else {
            influence_setting = InfluenceSetting.HIGH;
        }
    

    updatePersonInfSettingTabUI(influence_setting);
    updatePersonInfSettingDropdownUI(influence_setting);
}

function showGenerationSettingsMobileButtonPressed() {
    setTimeout(function() {
        selectModelWithVersion(lastSelectedModelVersion);
    }, 200);
}