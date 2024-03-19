
addBasicExamplesHTMLToDOM();
generateExamples();

function addBasicExamplesHTMLToDOM() {
    let basic_examples_html = basicExamplesHTML();
    let basic_examples_div = $($.parseHTML(basic_examples_html));
    $('body').append(basic_examples_div);
}

function generateExamples() {
    const exampleDictionaries = example_dictionaries;
    const examplesContainer = $('#examples-container');

    exampleDictionaries.forEach(example => {
        const newExample = newPromptExample(example);
        const newExampleElement = $($.parseHTML(newExample));
        examplesContainer.append(newExampleElement);
    });
}
