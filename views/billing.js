let dropdown_device = null;

function documentReady() {
    dropdown_device = $('#dropdown_device');

    requestAnimationFrame(appendToDeviceDropdown);
}

function appendToDeviceDropdown() {
    function append_options_to_dropdown_with_text(dropdown_selector, options) {
        console.log('appending options to create alerts modal');
        for (let i = 0; i < options.length; i++) {
            let val_ivrs = (options[i].device_ivrs).toString();
            let text_name = `${(options[i].device_name).toString()} (${val_ivrs})`;
            dropdown_selector.append(`<option value="${val_ivrs}">${text_name}</option>`);
        }
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
                append_options_to_dropdown_with_text(dropdown_device, response.intelli_devices_array)
                // append_options_to_dropdown(attach_to, response.intelli_devices_array);
            } else {
                alert("There was some error in saving the information.")
            }
        }
    });
}

$(documentReady);