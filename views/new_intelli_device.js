checkUserLogin();

let form_new_device = null;

let input_device_ivrs = null;
let input_device_name = null;
let input_device_address = null;
let input_device_city = null;
let input_device_pincode = null;

let button_add_device = null;


function documentReady() {

    form_new_device = $('#form_new_device ');

    input_device_ivrs = $('#input_device_ivrs ');
    input_device_name = $('#input_device_name ');
    input_device_address = $('#input_device_address ');
    input_device_city = $('#input_device_city');
    input_device_pincode = $('#input_device_pincode');

    button_add_device = $('#button_add_device ');

    button_add_device.click(addNewDeviceOnServer);
}

function addNewDeviceOnServer() {
    let newDeviceJson = {
        user_email: $.cookie('user_email'),
        device_ivrs: getValFromTextBox(input_device_ivrs),
        device_name: getValFromTextBox(input_device_name),
        device_address: getValFromTextBox(input_device_address),
        device_city: getValFromTextBox(input_device_city),
        device_pincode: getValFromTextBox(input_device_pincode)
    };

    $.ajax({
        url: '/new-intelli-device',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({'newDeviceJson': newDeviceJson}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                alert('new device added ');
                window.location.replace("/dashboard");
                // modal_create_alert.modal('hide');
            } else {
                alert("There was some error in saving the information.")
            }
        }
    });

}


$(documentReady);
