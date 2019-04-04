const AWS = require('aws-sdk');

const config = require('../config/config');
// const dynamoOffline = require('../config/initialise_awscloud');

AWS.config.update(config.getAWS_JSONCredentials());
const docClientDynamo = new AWS.DynamoDB.DocumentClient();

// Table For alerts.
const TABLE_ALARMS = config.TABLE_ALARMS;
const TABLE_USERS = config.TABLE_USERS;

// Object with all the database support functions.
const databaseFunctions = {

    //Finished Functions // Testing also done.

    //* Function to get a student information using aadhar card as a key list of students from the database  */


    //END : Finished functions block

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // New functions development

    checkUser: async function checkUserCredentialsForLogin(loginJson, stateCallback) {
        console.log("\nFile: support_files/dynamoFunctions calling function 'checkUser()'  Argument Passed : ");

        let params = {
            TableName: TABLE_USERS,
            FilterExpression: '#str_user_email = :val_user_email and #str_user_password = :val_user_password',
            ExpressionAttributeNames: {
                "#str_user_email": "user_email",
                "#str_user_password": "user_password"
            },
            ExpressionAttributeValues: {
                ':val_user_email': loginJson.user_email,
                ':val_user_password': loginJson.user_password
            },
            // // ProjectionExpression: "standard, first_name, gyankriti_enrollment"
        };

        console.log("\nparams for function : scan(params) : " + JSON.stringify(params));

        try {
            await docClientDynamo.scan(params, (err, data) => {
                if (err) {
                    console.log("\nThere was some error ", err, err.stack);
                    stateCallback(false);

                }// an error occurred
                else {
                    console.log("\nUser recieved ", data.Count);
                    if (data.Count !== 0)
                        stateCallback(true);
                    else
                        stateCallback(false);
                }
            });

        } catch (err) {
            console.log("\nError :  " + err);
        }
        // console.log("\nisSaved before return ", isSaved);

    },


    createNewUser: async function addUserToUsersTable(newUserJson, stateCallback) {
        console.log("\nFile: support_files/dynamoFunctions calling function 'createNewUsers()'  Argument Passed : ");

        // create alarm uid using the data input
        // newUserJson['alarm_uid'] = `${newUserJson.alarm_attach_to}_${newUserJson.alarm_threshold_val}_${newUserJson.alarm_for_time}_${newUserJson.alarm_time_unit}`;
        // // add time of insertion to the data;
        newUserJson['time_of_insertion'] = `${(Math.round((new Date()).getTime() / 1000)).toString()}`;

        // newUserJson['alarm_activation_status'] = `enabled`;
        // gyankritiDataObject['search_helper'] = `${gyankritiDataObject.standard}_${gyankritiDataObject.section}_${gyankritiDataObject.route}_${gyankritiDataObject.shift}`;

        const params = {
            TableName: TABLE_USERS,
            Item: newUserJson
        };

        console.log("\nparams for function : put(params) : " + JSON.stringify(params));

        try {
            await docClientDynamo.put(params, (err, data) => {
                if (err) {
                    console.log("\nThere was some error ", err, err.stack);
                    stateCallback(false);

                }// an error occurred
                else {
                    console.log("\nData saved ", data);
                    stateCallback(true);
                }
            });

        } catch (err) {
            console.log("\nError :  " + err);
        }
        // console.log("\nisSaved before return ", isSaved);

    },


    createNewAlarms: async function addAlarmsToAlarmsTable(createAlarmJson, stateCallback) {
        console.log("\nFile: support_files/dynamoFunctions calling function 'createNewAlarm()'  Argument Passed : ");

        // create alarm uid using the data input
        createAlarmJson['alarm_uid'] = `${createAlarmJson.alarm_attach_to}_${createAlarmJson.alarm_threshold_val}_${createAlarmJson.alarm_for_time}_${createAlarmJson.alarm_time_unit}`;
        // add time of insertion to the data;
        createAlarmJson['time_of_insertion'] = `${(Math.round((new Date()).getTime() / 1000)).toString()}`;

        createAlarmJson['alarm_activation_status'] = `enabled`;
        // gyankritiDataObject['search_helper'] = `${gyankritiDataObject.standard}_${gyankritiDataObject.section}_${gyankritiDataObject.route}_${gyankritiDataObject.shift}`;

        const params = {
            TableName: TABLE_ALARMS,
            Item: createAlarmJson
        };

        console.log("\nparams for function : put(params) : " + JSON.stringify(params));

        try {
            await docClientDynamo.put(params, (err, data) => {
                if (err) {
                    console.log("\nThere was some error ", err, err.stack);
                    stateCallback(false);

                }// an error occurred
                else {
                    console.log("\nData saved ", data);
                    stateCallback(true);
                }
            });

        } catch (err) {
            console.log("\nError :  " + err);
        }
        // console.log("\nisSaved before return ", isSaved);

    },


    //* Function to get all the alarms using the alarm_creator from the database  */
    getCurrentAlarms: async function getCurrentAlarmsUsingAlarmCreatorFromAlarmsTable(alarm_creator, sendDataInCallback) {

        console.log("\nFile: support_files/dynamoStudent calling function 'getCurrentAlarms()'");


        let params = {
            TableName: TABLE_ALARMS,
            FilterExpression: '#str_alarm_creator = :val_alarm_creator',
            ExpressionAttributeNames: {
                "#str_alarm_creator": "alarm_creator",
            },
            ExpressionAttributeValues: {
                ':val_alarm_creator': alarm_creator,
            },
            // // ProjectionExpression: "standard, first_name, gyankriti_enrollment"
        };

        console.log("\nparams for function : scan(params) : " + JSON.stringify(params));

        try {
            await docClientDynamo.scan(params, (err, data) => {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                    sendDataInCallback(err, false);
                } else {
                    console.log(JSON.stringify(data.Count));
                    sendDataInCallback(data, true);
                }
            });
        } catch (err) {
            console.log("\nError :  " + err);
        }
    },

};


/* END: Declaration of database functions */


//

// let loginJson = {
//     user_email: '',
//     user_password: '',
// };
// //

// databaseFunctions.checkUser(loginJson, (isSuccess) => {
//     console.log("isuser " + isSuccess);
// });

//
// some test code function calls

// searchFunctions.getSearchResults(null, (data, state) => {
//     console.log(`success:  ${state} : `, JSON.stringify(data));
// });


module.exports = databaseFunctions;