let table_alerts = null;
let table_alerts_body = null;
let buttons_actions = null;
let button_create_alerts = null;
let modal_create_alert = null;


const actionClassSelector = $('.action_links');

function documentReady() {
    // initializations
    table_alerts = $('#table_alerts');
    table_alerts_body = $('#table_alerts_body');
    buttons_actions = $('#buttons_actions');

    actionClassSelector.toggleClass('disabled', true);
    button_create_alerts = $('#button_create_alerts');
    modal_create_alert = $('#modal_create_alert');

    // definitions
    table_alerts_body.click(function (e) {
        console.log("click inside table");

        const clickedCell = $(e.target).closest("tr");
        // console.log(clickedCell);

        const highlightClassString = "table-primary";

        // if will disable the action button and also remove highlight class
        if (clickedCell.hasClass(highlightClassString)) {
            clickedCell.toggleClass(highlightClassString, false);
            actionClassSelector.toggleClass('disabled', true);
            return;
        }

        $(`.${highlightClassString}`).toggleClass(highlightClassString, false);
        clickedCell.toggleClass(highlightClassString, true);
        actionClassSelector.toggleClass('disabled', false);

    });


    button_create_alerts.click(showModal);

}

function showModal() {
    modal_create_alert.modal('show');
}

$(documentReady);