
addBasicExamplesHTMLToDOM();


function addBasicExamplesHTMLToDOM() {
    let basic_examples_html = basicExamplesHTML();
    let basic_examples_div = $($.parseHTML(basic_examples_html));
    $('body').append(basic_examples_div);
}