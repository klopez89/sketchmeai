

function addImageGrid() {
    let dummy_grid_html = dummyGridHTML();
    let dummy_grid_div = $($.parseHTML(dummy_grid_html));
    $('#console-content').append(dummy_grid_div);

    let dummy_grid_data_html = createGridHTML(20);
    let dummy_grid_data_div = $($.parseHTML(dummy_grid_data_html));
    $('#collection-grid').append(dummy_grid_data_div);
}

window.onload = function() {
    console.log("window.onload from genrate page");
    addImageGrid();
}

window.onresize = function() {
    resizeGrid();
}

function resizeGrid() {
    const leftColumnHeight = document.getElementById('generateForm').clientHeight;
    // Set the max-height of the collection grid container to the height of the left column
    document.getElementById('collection-grid-container').style.maxHeight = leftColumnHeight + 'px';
}
