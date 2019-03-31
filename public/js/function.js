function getValFromDropdown(dropdown_selector) {
    let valueDropdownOption = dropdown_selector.children("option").filter(":selected").val();
    console.log(dropdown_selector.attr('id') + " is :", valueDropdownOption);
    return valueDropdownOption.trim();
}

function getValFromTextBox(text_selector) {
    return (text_selector.val()).trim();
}


function disableInputField(selector, isDisabled) {
    console.log(`disable/enable ${selector.attr('id')}`);

    if (isDisabled) {
        selector.prop("disabled", true);
    } else {
        selector.prop("disabled", false);
    }

}
