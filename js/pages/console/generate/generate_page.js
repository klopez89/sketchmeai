

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