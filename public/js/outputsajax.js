const refreshButton = $("#refresh-button");
const tableOut = $("#table");
const tableBody = $("#table_body");

refreshButton.click(refreshTable);

function getDataFromAJAX(callback) {
    $.ajax({
        url: '/outputs',
        method: 'POST',
        contentType: 'application/json',
        success: function (response) {
            console.log("original response " + response);
            callback(response['outdata']);
        }
    })
}

function refreshTable() {
    // CREATE/POST
    console.log("click Detected");
    tableBody.children().remove(); // remove the tabled body
    getDataFromAJAX(function (datafromcallback) {
        console.log("got response from ajax function "
            + (datafromcallback[0]) + " \n the above data ");
        let tableoutbody = "";

        datafromcallback.forEach(function (elements) {
            tableoutbody += `<tr>
                            <td>${elements['OutputKey']} </td>
                            <td>${elements['OutputValue']} </td> 
                            </tr>`
        });
        console.log(tableoutbody);

        tableOut.removeClass('hide-table');
        tableBody.append(tableoutbody);

    });

}

$(document).ready(refreshTable());