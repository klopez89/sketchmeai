
addBasicExamplesHTMLToDOM();
generateBlogEntries();

function addBlogListHTMLToDOM() {
    let blog_list_html = blogListHTML();
    let blog_list_div = $($.parseHTML(blog_list_html));
    $('body').append(blog_list_div);
}

function generateBlogEntries() {
    
}