let form_case_support = null;
let dropdown_case_category = null;
let input_other_case_category = null;
let dropdown_case_severity = null;
let input_case_subject = null;
let input_textarea_description = null;
let form_attachment = null;
let input_case_file_attachment = null;
let dropdown_case_contact_language = null;
let input_email = null;
let input_mobile = null;
let card_email = null;
let card_mobile = null;
let button_create_case = null;

const method = {
    EMAIL: 'email',
    MOBILE: 'mobile',
    NULL: null
};

let contactMethod = method.NULL;

let isOtherFieldDisabled = true;

function documentReady() {

    form_case_support = $('#form_case_support');

    dropdown_case_category = $('#dropdown_case_category');
    input_other_case_category = $('#input_other_case_category');

    dropdown_case_severity = $('#dropdown_case_severity');
    input_case_subject = $('#input_case_subject');
    input_textarea_description = $('#input_textarea_description');

    form_attachment = $('#form_attachment');
    input_case_file_attachment = $('#input_case_file_attachment');

    dropdown_case_contact_language = $('#dropdown_case_contact_language');

    input_email = $('#input_email');
    input_mobile = $('#input_mobile');
    card_email = $('#card_email');
    card_mobile = $('#card_mobile ');

    button_create_case = $('#button_create_case');

    attach_event_triggers();
}

function attach_event_triggers() {

    dropdown_case_category.change(() => {
        if ((getValFromDropdown(dropdown_case_category)) === 'other') {
            isOtherFieldDisabled = false;
            disableInputField(input_other_case_category, false);
        } else {
            isOtherFieldDisabled = true;
            disableInputField(input_other_case_category, true);
        }
    });


    card_email.click(() => {
        console.log("clicked on email card");

        contactMethod = method.EMAIL;

        input_email.toggleClass("display-none", false);
        input_mobile.toggleClass("display-none", true);

        card_email.toggleClass('text-white', true);
        card_email.toggleClass('bg-success', true);
        card_email.find('.card-subtitle').toggleClass('text-white', true);

        card_mobile.toggleClass('text-white', false);
        card_mobile.toggleClass('bg-success', false);
        card_mobile.find('.card-subtitle').toggleClass('text-white', false);

    });


    card_mobile.click(() => {
        console.log("clicked on mobile card");

        contactMethod = method.MOBILE;

        input_mobile.toggleClass("display-none", false);
        input_email.toggleClass("display-none", true);

        card_mobile.toggleClass('text-white', true);
        card_mobile.toggleClass('bg-success', true);
        card_mobile.find('.card-subtitle').toggleClass('text-white', true);

        card_email.toggleClass('text-white', false);
        card_email.toggleClass('bg-success', false);
        card_email.find('.card-subtitle').toggleClass('text-white', false);

    });


    button_create_case.click(() => {
        console.log("clicked on button create case");

        if (contactMethod !== null) {
            sendCaseToServer();
        }

    });

}

function sendCaseToServer() {

    let newCaseJson = {

        user_email: $.cookie('user_email'),

        case_category: getDropdownWithOther(dropdown_case_category, input_other_case_category),
        case_severity: getValFromDropdown(dropdown_case_severity),

        case_subject: getValFromTextBox(input_case_subject),
        case_description: getValFromTextBox(input_textarea_description),

        case_contact_language: getValFromDropdown(dropdown_case_contact_language),

        case_contact: getCaseContact(),
        case_contact_method: contactMethod
    };

    console.log(newCaseJson);

    $.ajax({
        url: '/create-support-case',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({newCaseJson: newCaseJson}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                alert('new case created.');
                window.location.replace('/dashboard');
            } else {
                alert("There was some error in saving the information.")
            }
        }
    });

}


function getCaseContact() {
    if (contactMethod === method.MOBILE) {
        return getValFromTextBox(input_mobile)
    } else if (contactMethod === method.EMAIL) {
        return getValFromTextBox(input_email)
    } else {
        console.log('Some error in getCaseContact');
    }
}


function getDropdownWithOther(dropdown_selector, field_other_answer) {

    let valDropDown = getValFromDropdown(dropdown_selector);
    if (valDropDown === "other") {
        return (field_other_answer.val()).trim()
    } else {
        return valDropDown;
    }
}


$(documentReady);