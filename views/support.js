let form_case_support = null;
let dropdown_case_category = null;
let input_other_category = null;
let input_alarm_time_unit = null;
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

function documentReady() {

    form_case_support = $('#form_case_support');
    dropdown_case_category = $('#dropdown_case_category');
    input_other_category = $('#input_other_category');
    input_alarm_time_unit = $('#input_alarm_time_unit');
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


    attach_event_triggers();
}

function attach_event_triggers() {

    dropdown_case_category.change(() => {
        if ((getValFromDropdown(dropdown_case_category)) === 'other') {
            disableInputField(input_other_category, false);
        } else {
            disableInputField(input_other_category, true);
        }
    });


    card_email.click(() => {
        console.log("clicked on email card");

        input_email.toggleClass("display-none", false);
        input_mobile.toggleClass("display-none", true);

        card_email.toggleClass('text-white', true);
        card_email.toggleClass('bg-success', true);

        card_mobile.toggleClass('text-white', false);
        card_mobile.toggleClass('bg-success', false);

    });


    card_mobile.click(() => {
        console.log("clicked on mobile card");

        input_mobile.toggleClass("display-none", false);
        input_email.toggleClass("display-none", true);

        card_mobile.toggleClass('text-white', true);
        card_mobile.toggleClass('bg-success', true);

        card_email.toggleClass('text-white', false);
        card_email.toggleClass('bg-success', false);

    });


}

$(documentReady);