let table_alerts = null;
let table_alerts_body = null;
let buttons_actions = null;
let button_create_alerts = null;
let modal_create_alert = null;


let input_alarm_name = null;
let attach_to = null;
let input_alarm_sms_no = null;
let input_alarm_threshold_val = null;
let input_alarm_for_time = null;
let input_alarm_time_unit = null;

let modal_button_create_alert = null;

const actionClassSelector = $('.action_links');

function documentReady() {
    // initializations
    table_alerts = $('#table_alerts');
    table_alerts_body = $('#table_alerts_body');
    buttons_actions = $('#buttons_actions');

    actionClassSelector.toggleClass('disabled', true);
    button_create_alerts = $('#button_create_alerts');
    modal_create_alert = $('#modal_create_alert');


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
            return;
        }

        $(`.${highlightClassString}`).toggleClass(highlightClassString, false);
        clickedCell.toggleClass(highlightClassString, true);
        actionClassSelector.toggleClass('disabled', false);

    });

}


function attachButtonsTriggers() {

    button_create_alerts.click(() => {
        modal_create_alert.modal('show');
    });

    modal_button_create_alert.click(() => {
        createNewAlarm();
    });

}


function createNewAlarm() {

    let createAlarmJson = {
        alarm_creator: $.cookie('user_email'),
        alarm_name: getValFromTextBox(input_alarm_name),
        alarm_attach_to: getValFromDropdown(attach_to),
        alarm_sms_no: getValFromTextBox(input_alarm_sms_no),
        alarm_threshold_val: getValFromTextBox(input_alarm_threshold_val),
        alarm_for_time: getValFromTextBox(input_alarm_for_time),
        alarm_time_unit: getValFromDropdown(input_alarm_time_unit)
    };

    $.ajax({
        url: '/create-alert',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({createAlarmJson: createAlarmJson}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                alert('new alarm created');
                modal_create_alert.modal('hide');
            } else {
                alert("There was some error in saving the information.")
            }
        }
    });

}


function displayTableFromServerData() {
    let alarms_array = [];

    function renderTableArray() {
        let count = 0;

        console.log(`no of items in results_array : ${count + 1}`);

        do {
            let element = alarms_array[count];

            let row_start = `<tr>
                <td> ${element.alarm_name}</td>
                <td>${element.alarm_attach_to}</td>`;

            let row_state_col = `<td> <span class="role alarm-ok">OK</span></td>`;

            let row_end = `<td>${element.alarm_threshold_val}</td>
                <td>${element.alarm_activation_status}</td>
            </tr>`;

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
                    alert('no element in array');
                }
                // requestAnimationFrame(renderTableArray);
            } else {
                alert("There was some error.")
            }
        }
    });

}

$(documentReady);