
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



function getOtherPromptInputValues() {
    
    var numberOfImages = document.getElementById('numImagesInput').value;
  
    // Get the text of the negative prompt input with ID 'negPromptInput'
    let negativePrompt = document.getElementById("negPromptInput").value;
  
    // Get the value of the number input with ID 'gscale'
    var gscale = document.getElementById('gscale').value;
  
    // Get the value of the number input with ID 'seed'
    var seed = document.getElementById('seed').value;
    var locallyGeneratedSeed = "";
  
    let sameRandomSeedSpan = document.getElementById('checkboxForSameRandomSeed');
    let shouldUseRandomSeedAcrossModels = sameRandomSeedSpan.classList.contains('fa-check-square')
  
    // Get the dropdown with ID 'modelDropdown'
    var dropdown = document.getElementById('modelDropdown');
  
    // Get the selected options in the dropdown
    var selectedOptions = dropdown.selectedOptions;
  
    // Create two arrays to store the 'model' and 'version' attributes of the selected options
    var modelValues = [];
    var versionValues = [];
    var instanceKeys = [];
  
    // Loop through the selected options and get their 'model' attribute
    for (var i = 0; i < selectedOptions.length; i++) {
      modelValues.push(selectedOptions[i].getAttribute('model'));
      versionValues.push(selectedOptions[i].getAttribute('version'));
      instanceKeys.push(selectedOptions[i].getAttribute('instkey'));
    }
  
    // Return an object containing the values of the inputs
    return {
      numberOfImages: numberOfImages,
      negativePrompt: negativePrompt,
      gscale: gscale,
      seed: seed,
      shouldUseRandomSeedAcrossModels: shouldUseRandomSeedAcrossModels,
      modelValues: modelValues,
      versionValues: versionValues,
      instanceKeys: instanceKeys,
    }
  }