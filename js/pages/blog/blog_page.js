
addBlogListHTMLToDOM();
generateBlogEntries();

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