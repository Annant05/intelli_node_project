let usagePieChart = null;
let costBarChart = null;
let table_devices = null;
let table_devices_body = null;

function documentReady() {
    usagePieChart = $('#usagePieChart ');
    costBarChart = $('#costBarChart ');

    table_devices = $('#table_devices');
    table_devices_body = $('#table_devices_body');

    initializeUsagePieChart();
    initializeCostBarChart();

    initializeDevicesTableFromServer();
    // temp code
    // const expiresTime = {expires: 1};
    // $.cookie('user_email', 'annantg05@gmail.com', expiresTime);
}

function initializeDevicesTableFromServer() {

    table_devices_body.children().remove();

    let devices_array = [];

    function renderTableArray() {
        let count = 0;

        console.log(`no of items in results_array : ${count + 1}`);

        do {
            let element = devices_array[count];


            let row_start = `<tr>
                <td> ${element.device_name}</td>
                <td>${element.device_ivrs}</td>`;

            let today = `<td>${Math.floor((Math.random() * 50) + 1)} </td>`;
            let alerts = `<td> ${Math.floor((Math.random() * 5) + 1)}</td>`;
            let status = `<td><span class="role status-working"> Working </span> </td>`;
            let total = `<td> ${Math.floor((Math.random() * 300) + 1)}</td>`;

            // let row_state_col = `<td> <span class="role alarm-ok">OK</span></td>`;
            //
            // let row_end = `<td>${element.alarm_threshold_val}</td>
            //     <td>${element.alarm_activation_status}</td>
            // </tr>`;

            table_devices_body.append(row_start + today + alerts + status + total);
            count++;
        } while (count !== devices_array.length);

        console.log('render table complete');
    }


    $.ajax({
        url: '/show-intelli-device',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({user_email: $.cookie('user_email')}),
        success: function (response) {
            console.log(response.success);
            if (response.success) {
                console.log('success');

                devices_array = response.intelli_devices_array;

                if (devices_array.length) {
                    requestAnimationFrame(renderTableArray);
                } else {
                    alert('no element in array');
                }

            } else {
                alert("There was some error.")
            }
        }
    });
}

function initializeUsagePieChart() {
    "use strict";

    try {

        //pie chart
        if (usagePieChart) {
            // usagePieChart.height = 500;
            let myChart = new Chart(usagePieChart, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [40, 80],
                        backgroundColor: [
                            "rgba(0, 123, 255,0.9)",
                            "rgba(0, 123, 255,0.7)",
                            "rgba(0,0,0,0.07)"
                        ],
                        hoverBackgroundColor: [
                            "rgba(0, 123, 255,0.9)",
                            "rgba(0, 123, 255,0.7)",
                            "rgba(0,0,0,0.07)"
                        ]

                    }],
                    labels: [
                        "Home",
                        "Office",
                    ]
                },
                options: {
                    legend: {
                        position: 'top',
                        labels: {
                            fontFamily: 'Poppins'
                        }

                    },
                    responsive: true
                }
            });
        }


    } catch (error) {
        console.log(error);
    }
}

function initializeCostBarChart() {
    "use strict";
    try {

        // single bar chart
        if (costBarChart) {
            // costBarChart.height = 200;
            let myChart = new Chart(costBarChart, {
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