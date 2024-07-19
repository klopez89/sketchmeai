function configureRefImageInfluenceFields(refImgMode) {
    var inputFieldId = null;
    var rangeInputFieldId = null;
    if (refImgMode == RefImageMode.IMG2IMG) {
        inputFieldId = InfluenceValueInputId.IMG2IMG;
        rangeInputFieldId = InfluenceRangeInputId.IMG2IMG;
    } else if (refImgMode == RefImageMode.IPADAPTER) {
        inputFieldId = InfluenceValueInputId.IPADAPTER;
        rangeInputFieldId = InfluenceRangeInputId.IPADAPTER;
    } else if (refImgMode == RefImageMode.OPENPOSE) {
        inputFieldId = InfluenceValueInputId.OPENPOSE;
        rangeInputFieldId = InfluenceRangeInputId.OPENPOSE;
    } else if (refImgMode == RefImageMode.CANNY) {
        inputFieldId = InfluenceValueInputId.CANNY;
        rangeInputFieldId = InfluenceRangeInputId.CANNY;
    } else if (refImgMode == RefImageMode.DEPTH) {
        inputFieldId = InfluenceValueInputId.DEPTH;
        rangeInputFieldId = InfluenceRangeInputId.DEPTH;
    } else {
        return;
    }

    // Get references to the elements
    var rangeInput = document.getElementById(rangeInputFieldId);
    var numberInput = document.getElementById(inputFieldId);

    // Set the initial value of the range input to match the number input
    rangeInput.value = numberInput.value;

    // Update the number input when the range input changes
    rangeInput.addEventListener('input', function() {
        numberInput.value = rangeInput.value;
        alignInfluenceSettingToValue(refImgMode);
    });

    // Update the range input when the number input changes
    numberInput.addEventListener('input', function() {
        rangeInput.value = numberInput.value;
        alignInfluenceSettingToValue(refImgMode);
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