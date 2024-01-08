
window.onload = function() {
    console.log("window.onload from genrate page");
    addImageGrid();
    configureGenerateForm();
    resizeGrid();
}

window.onresize = function() {
    resizeGrid();
}


function configureGenerateForm() {
    document.getElementById("generateForm").addEventListener("submit", generateButtonPressed, true);
}

function generateButtonPressed(event) {
    event.preventDefault();

    let promptValues = promptInputValues();
    console.log("promptValues: ", promptValues);

    console.log("generateButtonPressed");
    let emptyJson = {};
    let new_grid_item_html = newGridItemHTML(emptyJson);
    let new_grid_item_div = $($.parseHTML(new_grid_item_html));
    new_grid_item_div.hide().prependTo('#collection-grid').fadeIn();
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
        negativePrompt: negativePrompt,
        gscale: gscale,
        seed: seed,
        img2imgUrl: img2imgUrl,
        promptStrength: promptStrength,
        loraScale: loraScale,
        shouldUseRandomSeedAcrossModels: shouldUseRandomSeedAcrossModels,
        modelValues: modelValues,
        versionValues: versionValues,
        instanceKeys: instanceKeys,
    }
  }