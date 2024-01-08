
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

function generateButtonPressed() {
    console.log("generateButtonPressed");
    let emptyJson = {};
    let new_grid_item_html = newGridItemHTML(emptyJson);
    let new_grid_item_div = $($.parseHTML(new_grid_item_html));
    $('#collection-grid').append(new_grid_item_div);
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



