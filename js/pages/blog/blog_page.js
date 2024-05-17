
const comparison_slider_ids = ['post-3-comparison-slider'];

addBlogListHTMLToDOM();
generateBlogEntries();
configureAllComparisonSliders();
loadInComparisonSliderImages();

function addBlogListHTMLToDOM() {
    let blog_list_html = blogListHTML();
    let blog_list_div = $($.parseHTML(blog_list_html));
    $('body').append(blog_list_div);
}

function generateBlogEntries() {
    let blog_grid_html = blogListGridHTML();
    let blog_grid_div = $($.parseHTML(blog_grid_html));
    $('#blog-list-container').append(blog_grid_div);
}

function configureAllComparisonSliders() {
    for (let i = 0; i < comparison_slider_ids.length; i++) {
        let comparison_div = document.getElementById(comparison_slider_ids[i]);
        configureComparisonSlider(comparison_div);
    }
}

function loadInComparisonSliderImages() {
    for (let i = 0; i < comparison_slider_ids.length; i++) {
        loadComparisonImgs(comparison_slider_ids[i]);
    }
}