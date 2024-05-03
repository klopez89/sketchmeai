addComparisons();
configureComparisonSliders();

function addComparisons() {
    let blue_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_non_ays.png";
    let blue_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_ays.png";

    let black_before = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_non_ays.png";
    let black_after = "https://storage.googleapis.com/sketchmeai-public/Blog/blog_post_3imgs/blue_jacket_ays.png";

    let blue_comp_html = comparisonElementHTML(blue_before, blue_after);
    let blue_comp_div = $($.parseHTML(blue_comp_html));

    let black_comp_html = comparisonElementHTML(black_before, black_after);
    let black_comp_div = $($.parseHTML(black_comp_html));

    $('#blog-container').append(blue_comp_div);
    $('#blog-container').append(black_comp_div);
}