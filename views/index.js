let usagePieChart = null;
let costBarChart = null;


function documentReady() {
    usagePieChart = $('#usagePieChart ');
    costBarChart = $('#costBarChart ');

    initializeUsagePieChart();
    initializeCostBarChart();

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