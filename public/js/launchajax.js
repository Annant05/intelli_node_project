$(function () {

    // CREATE/POST
    $("#launchstack").click(function () {
        console.log("click Detected");
        const stackName = $("#stackName").val();
        // setInterval(300);
        console.log(stackName);
        $.ajax({
            url: '/launchstack',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({stackName: stackName}),
            // success: function (response) {
            //     console.log(response.items[0]);
            //     var $item = response.items[0];
            //     $(".m_stud_fullname").text($item.name + " " + $item.stud_last_name);
            // }
        }).done(alert(`Your stack ${stackName} has been launched!`));

    });
});