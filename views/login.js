let form_login = null;
let input_email = null;
let input_password = null;
let button_login = null;

function documentReady() {

    form_login = $('#form_login');
    input_email = $('#input_email');
    input_password = $('#input_password');
    button_login = $('#button_login');

    button_login.click(() => {

        let loginJson = {
            user_email: getValFromTextBox(input_email),
            user_password: getValFromTextBox(input_password),
        };

        if (loginJson.user_email === '' || loginJson.user_password === '') {
            alert("Some field is empty");
        } else {
            // console.log(loginJson);
            sendLoginDataToServer(loginJson);
        }


    });
}

function sendLoginDataToServer(loginJson) {

    console.log('sending request to server');

    $.ajax({
        url: '/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({loginJson: loginJson}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {

                console.log(response.userInfoJson);

                const expiresTime = {expires: 1};
                $.cookie('user_email', response.userInfoJson.user_email, expiresTime);
                $.cookie('user_full_name', response.userInfoJson.user_full_name, expiresTime);

                window.location.replace("/dashboard");
                // modal_create_alert.modal('hide');
            } else {
                alert("Username or Password is incorrect.")
            }
        }
    });

}

$(documentReady);