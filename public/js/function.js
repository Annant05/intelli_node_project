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

function append_options_to_dropdown(dropdown_selector, options) {
    options.forEach(function (option) {
        dropdown_selector.append(
            `<option value="${((option.toString()))}">${option}</option>`);
    });
}


// function getDropdownWithOther(dropdown_selector, field_other_answer) {
//
//     let valDropDown = getValFromDropdown(dropdown_selector);
//     if (valDropDown === "Other") {
//         return {
//             value: valDropDown,
//             value_other: (field_other_answer.val()).trim()
//         };
//     } else {
//         return {
//             value: valDropDown
//         };
//     }
// }