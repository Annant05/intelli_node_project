let form_login = null;
let input_full_name = null;
let input_email = null;
let input_mobile_no = null;
let input_address = null;
let input_city = null;
let input_pincode = null;
let input_password = null;
let input_confirm_password = null;
let button_register = null;

function documentReady() {

    form_login = $('#form_login');
    input_full_name = $('#input_full_name');
    input_email = $('#input_email');
    input_mobile_no = $('#input_mobile_no');
    input_address = $('#input_address');
    input_city = $('#input_city');
    input_pincode = $('#input_pincode');
    input_password = $('#input_password');
    input_confirm_password = $('#input_confirm_password');

    button_register = $('#button_register');

    attachButtonsTriggers();

}

function attachButtonsTriggers() {
    button_register.click(registerNewUser);
}

function registerNewUser() {

    if (getValFromTextBox(input_password) !== getValFromTextBox(input_confirm_password)) {
        alert("passwords does not match");
        return false;
    }

    let newUserJson = {
        user_full_name: getValFromTextBox(input_full_name),
        user_email: getValFromTextBox(input_email),
        user_mobile_no: getValFromTextBox(input_mobile_no),
        user_address: getValFromTextBox(input_address),
        user_city: getValFromTextBox(input_city),
        user_pincode: getValFromTextBox(input_pincode),
        user_password: getValFromTextBox(input_password),
        // user_confirm_password: getValFromTextBox(input_confirm_password),
    };

    console.log(newUserJson);

    $.ajax({
        url: '/registration',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({newUserJson: newUserJson}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                alert('new user registered');
                window.location.replace("/login");
                // modal_create_alert.modal('hide');
            } else {
                alert("There was some error in saving the information.")
            }
        }
    });

}

$(documentReady);