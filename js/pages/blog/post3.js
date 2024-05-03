addComparisons();

function addComparisons() {
    let blue_before = "";
    let blue_after = "";

    let black_before = "";
    let black_after = "";

    let blue_comp_html = comparisonElementHTML(blue_before, blue_after);
    let blue_comp_div = $($.parseHTML(blue_comp_html));

    let black_comp_html = comparisonElementHTML(black_before, black_after);
    let black_comp_div = $($.parseHTML(black_comp_html));

    $('#blog-container').append(blue_comp_div);
    $('#blog-container').append(black_comp_div);
}