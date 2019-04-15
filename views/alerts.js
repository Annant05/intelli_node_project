checkUserLogin();

let table_alerts = null;
let table_alerts_body = null;
let buttons_actions = null;
let button_create_alerts = null;
let modal_create_alert = null;


let menu_button_delete_alarm = null;
let menu_button_edit_alarm = null;
let menu_button_enable_alarm = null;
let menu_button_disable_alarm = null;


let input_alarm_name = null;
let attach_to = null;
let input_alarm_sms_no = null;
let input_alarm_threshold_val = null;
let input_alarm_for_time = null;
let input_alarm_time_unit = null;


let modal_button_create_alert = null;

let selectedRowID = null;

const actionClassSelector = $('.action_links');

// some string constants for avoiding spelling mistakes
const ENABLE = 'enable';
const DISABLE = 'disable';
const DELETE = 'delete';
const EDIT = 'edit';

function documentReady() {
    // initializations


    table_alerts = $('#table_alerts');
    table_alerts_body = $('#table_alerts_body');
    buttons_actions = $('#buttons_actions');

    actionClassSelector.toggleClass('disabled', true);
    button_create_alerts = $('#button_create_alerts');
    modal_create_alert = $('#modal_create_alert');


    menu_button_delete_alarm = $('#menu_button_delete_alarm ');
    menu_button_edit_alarm = $('#menu_button_edit_alarm ');
    menu_button_enable_alarm = $('#menu_button_enable_alarm ');
    menu_button_disable_alarm = $('#menu_button_disable_alarm ');

    input_alarm_name = $('#input_alarm_name ');
    attach_to = $('#attach_to ');
    input_alarm_sms_no = $('#input_alarm_sms_no ');
    input_alarm_threshold_val = $('#input_alarm_threshold_val ');
    input_alarm_for_time = $('#input_alarm_for_time ');
    input_alarm_time_unit = $('#input_alarm_time_unit ');

    modal_button_create_alert = $('#modal_button_create_alert ');

    attachTableTriggers();
    attachButtonsTriggers();
    displayTableFromServerData();
    appendToAlertsDropdown();
}

function appendToAlertsDropdown() {

    function append_options_to_dropdown_with_text(dropdown_selector, options) {

        console.log('appending options to create alerts modal');

        for (let i = 0; i < options.length; i++) {
            let val_ivrs = (options[i].device_ivrs).toString();
            let text_name = `${(options[i].device_name).toString()} (${val_ivrs})`;

            dropdown_selector.append(`<option value="${val_ivrs}">${text_name}</option>`);
        }

        // options.forEach(function (option) {
        //     dropdown_selector.append(
        //         `<option value="${((option.toString()))}">${option}</option>`);
        // });
    }


    $.ajax({
        url: '/show-intelli-device',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({user_email: $.cookie('user_email')}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                // alert("success intelli devices");
                append_options_to_dropdown_with_text(attach_to, response.intelli_devices_array)
                // append_options_to_dropdown(attach_to, response.intelli_devices_array);
            } else {
                alert("There was some error in saving the information.")
            }
        }
    });


}

function attachTableTriggers() {
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
            selectedRowID = null;
            return;
        }


        $(`.${highlightClassString}`).toggleClass(highlightClassString, false);
        clickedCell.toggleClass(highlightClassString, true);
        actionClassSelector.toggleClass('disabled', false);

        console.log("setting selectedRowID");
        selectedRowID = table_alerts_body.find('tr.table-primary').attr('id');

    });

}


function attachButtonsTriggers() {

    button_create_alerts.click(() => {
        modal_create_alert.modal('show');
    });

    modal_button_create_alert.click(() => {
        createNewAlarm();
    });


    menu_button_delete_alarm.click(deleteAlarmFromServer);
    menu_button_enable_alarm.click(() => {
        executeUpdateOnServer(ENABLE);
    });
    menu_button_disable_alarm.click(() => {
        executeUpdateOnServer(DISABLE);
    });


    menu_button_edit_alarm.click(editAlarm);

}

function editAlarm() {

}

function deleteAlarmFromServer() {
    if (selectedRowID !== null) {

        $.ajax({
            url: '/delete-alert',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({alarm_uid: selectedRowID}),
            success: function (response) {
                console.log(response.success);
                if (response.success) {
                    displayTableFromServerData();
                } else {
                    alert("There was some error deleting alert.")
                }
            }
        });

    } else {
        alert('Select a row first.');
    }
}

function executeUpdateOnServer(updateAction) {

    if (selectedRowID !== null) {

        $.ajax({
            url: '/update-alert',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({alarm_uid: selectedRowID, updateAction: updateAction}),
            success: function (response) {
                console.log(response.success);
                if (response.success) {
                    displayTableFromServerData();
                } else {
                    alert("There was some error updating alert.")
                }
            }
        });

    } else {
        alert('Select a row first.');
    }

}


function createNewAlarm() {

    let createAlarmJson = {
        user_email: $.cookie('user_email'),
        alarm_name: getValFromTextBox(input_alarm_name),
        alarm_attach_to: getValFromDropdown(attach_to),
        alarm_sms_no: getValFromTextBox(input_alarm_sms_no),
        alarm_threshold_val: getValFromTextBox(input_alarm_threshold_val),
        alarm_for_time: getValFromTextBox(input_alarm_for_time),
        alarm_time_unit: getValFromDropdown(input_alarm_time_unit)
    };

    if ((createAlarmJson.alarm_sms_no).length === 10) {


        $.ajax({
            url: '/create-alert',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({createAlarmJson: createAlarmJson}),
            success: function (response) {
                console.log(response.success);
                if (response.success) {
                    // alert('new alarm created');
                    modal_create_alert.modal('hide');
                    displayTableFromServerData();
                } else {
                    alert("There was some error in saving the information.")
                }
            }
        });
    } else {
        alert('Please check Mobile no is not 10 digit.');
    }
}


function displayTableFromServerData() {

    table_alerts_body.children().remove();

    let alarms_array = [];

    function renderTableArray() {
        let count = 0;

        console.log(`no of items in results_array : ${count + 1}`);

        do {
            let element = alarms_array[count];

            let row_start = `<tr id="${element.alarm_uid}">
                <td> ${element.alarm_name}</td>
                <td>${element.alarm_attach_to}</td>`;

            let row_state_col = `<td> <span class="role alarm-ok">OK</span></td>`;

            let row_end = `<td>${element.alarm_threshold_val}</td>
                <td>${element.alarm_activation_status}</td>
            </tr>`;

            let alarmUID = ``;
            table_alerts_body.append(row_start + row_state_col + row_end);
            count++;
        } while (count !== alarms_array.length);

        console.log('render table complete');
    }

    $.ajax({
        url: '/show-alert',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({user_email: $.cookie('user_email')}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                console.log('success');
                // console.log(response.alarms_array);
                alarms_array = response.alarms_array;

                console.log("length  " + alarms_array.length);

                if (alarms_array.length) {
                    requestAnimationFrame(renderTableArray);
                } else {
                    alert('You do not have any alerts. Please add one');
                }
                // requestAnimationFrame(renderTableArray);
            } else {
                alert("There was some error.")
            }
        }
    });

}

$(documentReady);