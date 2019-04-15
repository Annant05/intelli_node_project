checkUserLogin();

let pastRecordsChart = null;
let dropdown_device = null;

function documentReady() {


    pastRecordsChart = $('#pastRecordsChart ');
    dropdown_device = $('#dropdown_device');

    initializeCostBarChart();
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


function initializeCostBarChart() {
    "use strict";
    try {

        // single bar chart
        if (pastRecordsChart) {
            // pastRecordsChart.height = 200;
            let myChart = new Chart(pastRecordsChart, {
                type: 'bar',
                data: {
                    labels: ["July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                        {
                            label: "Estimated Cost",
                            data: [10, 20, 30, 15, 20, 60],
                            borderColor: "rgba(0, 123, 255, 0.9)",
                            borderWidth: "0",
                            backgroundColor: "rgba(0, 123, 255, 0.5)"
                        }
                    ]
                },
                options: {
                    legend: {
                        position: 'top',
                        labels: {
                            fontFamily: 'Poppins'
                        }

                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontFamily: "Poppins"

                            }
                        }],
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                fontFamily: "Poppins"
                            }
                        }]
                    }
                }
            });
        }

    } catch (error) {
        console.log(error);
    }
}


$(documentReady);