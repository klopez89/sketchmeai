function configureRefImageFields() {
    // Get references to the elements
    var rangeInput = document.getElementById('ref-influence-range');
    var numberInput = document.getElementById('prompt-str');

    // Set the initial value of the range input to match the number input
    rangeInput.value = numberInput.value;

    // Update the number input when the range input changes
    rangeInput.addEventListener('input', function() {
        numberInput.value = rangeInput.value;
    });

    // Update the range input when the number input changes
    numberInput.addEventListener('input', function() {
        rangeInput.value = numberInput.value;
    });
}

function configurePersonLoraFields() {
    // Get references to the elements
    var rangeInput = document.getElementById('person-lora-influence-range');
    var numberInput = document.getElementById('person-lora-influence');

    // Set the initial value of the range input to match the number input
    rangeInput.value = numberInput.value;

    // Update the number input when the range input changes
    rangeInput.addEventListener('input', function() {
        numberInput.value = rangeInput.value;
    });

    // Update the range input when the number input changes
    numberInput.addEventListener('input', function() {
        rangeInput.value = numberInput.value;
    });
}