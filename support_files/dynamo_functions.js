const AWS = require('aws-sdk');

const config = require('../config/config');
// const dynamoOffline = require('../config/initialise_awscloud');

AWS.config.update(config.getAWS_JSONCredentials());
const docClientDynamo = new AWS.DynamoDB.DocumentClient();

const emailClient = require('../support_files/ses_email_functions');
const msgClient = require('../support_files/sms_api');

// Table For alerts.
const TABLE_ALARMS = config.TABLE_ALARMS;
const TABLE_USERS = config.TABLE_USERS;
const TABLE_DEVICES = config.TABLE_DEVICES;
const TABLE_SUPPORT_CASES = config.TABLE_SUPPORT_CASES;


// some string constants for avoiding spelling mistakes
const ENABLE = 'enable';
const DISABLE = 'disable';
const DELETE = 'delete';
const EDIT = 'edit';


// Object with all the database support functions.
const databaseFunctions = {

    //Finished Functions // Testing also done.

    //* Function to get a student information using aadhar card as a key list of students from the database  */


    //END : Finished functions block

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // New functions development

    // getAlertsCountOfIntelliDevices: async function getAlertsAttacedToAnIntelliDevicesUsingDevicesTableAndAlertsTable(device_ivrs, sendDataInCallback) {
    //
    //     console.log("\nFile: support_files/databaseFunctions calling function 'getAlertsCountOfIntelliDevices()'");
    //
    //     let params = {
    //         TableName: TABLE_DEVICES,
    //         FilterExpression: '#str_user_email = :val_user_email',
    //         ExpressionAttributeNames: {
    //             "#str_user_email": "user_email",
    //         },
    //         ExpressionAttributeValues: {
    //             ':val_user_email': user_email,
    //         },
    //         ProjectionExpression: "device_name, device_ivrs"
    //     };
    //
    //     console.log("\nparams for function : scan(params) : " + JSON.stringify(params));
    //
    //     try {
    //         await docClientDynamo.scan(params, (err, data) => {
    //             if (err) {
    //                 console.log(err, err.stack); // an error occurred
    //                 sendDataInCallback(err, false);
    //             } else {
    //                 console.log(JSON.stringify(data.Count));
    //                 sendDataInCallback(data, true);
    //             }
    //         });
    //     } catch (err) {
    //         console.log("\nError :  " + err);
    //     }
    // },


    createNewSupportCase: async function addNewCaseToTheSupportTable(newCaseJson, stateCallback) {
        console.log("\nFile: support_files/dynamoFunctions calling function 'createNewSupportCase()'  Argument Passed : ");

        newCaseJson['time_of_insertion'] = `${(Math.round((new Date()).getTime() / 1000)).toString()}`;
        newCaseJson['case_uid'] = `${newCaseJson.user_email}_${newCaseJson.time_of_insertion}`;
        newCaseJson['case_status'] = `pending_support_response`;

        const params = {
            TableName: TABLE_SUPPORT_CASES,
            Item: newCaseJson
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
                    const EMAIL = 'email', MOBILE = 'mobile';

                    let messageTemplate = `Dear User,\nGreetings!\nA new support case '${newCaseJson.case_subject}' has been registered.\nThank You\nTeam Intelli Meter.`;

                    if (newCaseJson.case_contact_method === EMAIL) {
                        console.log('sending email for support ');
                        emailClient.sendEmailCustomSubjectBody(newCaseJson.case_contact, 'Support Case Registered', messageTemplate, (isSuccess) => {
                            stateCallback(isSuccess);
                        });
                    } else if (newCaseJson.case_contact_method === MOBILE) {
                        console.log('sending sms for support ');
                        msgClient.sendSMS(newCaseJson.case_contact, messageTemplate, (isSuccess) => {
                            stateCallback(isSuccess);
                        });
                    } else {
                        stateCallback(false);
                    }
                }
            });

        } catch (err) {
            console.log("\nError :  " + err);
            stateCallback(false);
        }
        // console.log("\nisSaved before return ", isSaved);

    },


    getUserIntelliDevices: async function getUserIntelliDevicesFromDevicesTable(user_email, sendDataInCallback) {

        console.log("\nFile: support_files/databaseFunctions calling function 'getUserIntelliDevices()'");

        let params = {
            TableName: TABLE_DEVICES,
            FilterExpression: '#str_user_email = :val_user_email',
            ExpressionAttributeNames: {
                "#str_user_email": "user_email",
            },
            ExpressionAttributeValues: {
                ':val_user_email': user_email,
            },
            ProjectionExpression: "device_name, device_ivrs"
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


    createNewIntelliDevice: async function addIntelliDevicesToDevicesTable(newDeviceJson, stateCallback) {
        console.log("\nFile: support_files/dynamoFunctions calling function 'createNewIntelliDevice()'  Argument Passed : ");

        // // add time of insertion to the data;
        newDeviceJson['time_of_insertion'] = `${(Math.round((new Date()).getTime() / 1000)).toString()}`;

        const params = {
            TableName: TABLE_DEVICES,
            Item: newDeviceJson
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
            stateCallback(false);
        }
        // console.log("\nisSaved before return ", isSaved);

    },


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
            ProjectionExpression: "user_email, user_full_name"
        };

        console.log("\nparams for function : scan(params) : " + JSON.stringify(params));

        try {
            await docClientDynamo.scan(params, (err, data) => {
                if (err) {
                    console.log("\nThere was some error ", err, err.stack);
                    stateCallback(err, false);

                }// an error occurred
                else {
                    console.log("\nUser recieved ", data.Count);
                    if (data.Count !== 0)
                        stateCallback(data.Items[0], true);
                    else
                        stateCallback(null, false);
                }
            });

        } catch (err) {
            console.log("\nError :  " + err);
        }
        // console.log("\nisSaved before return ", isSaved);

    },


    createNewUser: async function addUserToUsersTable(newUserJson, stateCallback) {
        console.log("\nFile: support_files/dynamoFunctions calling function 'createNewUsers()'  Argument Passed : ");

        // // add time of insertion to the data;
        newUserJson['time_of_insertion'] = `${(Math.round((new Date()).getTime() / 1000)).toString()}`;
        newUserJson['email_verified'] = 'pending';

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
                    emailClient.sendVerificationEmail(newUserJson.user_email, (isSuccess) => {
                        stateCallback(isSuccess);
                    });
                }
            });

        } catch (err) {
            console.log("\nError :  " + err);
        }
        // console.log("\nisSaved before return ", isSaved);

    },


    createNewAlarms: async function addAlarmsToAlarmsTable(createAlarmJson, stateCallback) {
        console.log("\nFile: support_files/dynamoFunctions calling function 'createNewAlarm()'  Argument Passed : ");

        // add time of insertion to the data;
        createAlarmJson['time_of_insertion'] = `${(Math.round((new Date()).getTime() / 1000)).toString()}`;
        // create alarm uid using the data input
        createAlarmJson['alarm_uid'] = `${createAlarmJson.alarm_attach_to}_${createAlarmJson.alarm_threshold_val}_${createAlarmJson.alarm_for_time}_${createAlarmJson.alarm_time_unit}_${createAlarmJson.time_of_insertion}`;

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
    getCurrentAlarms: async function getCurrentAlarmsUsingAlarmCreatorFromAlarmsTable(user_email, sendDataInCallback) {

        console.log("\nFile: support_files/databaseFunctions calling function 'getCurrentAlarms()'");


        let params = {
            TableName: TABLE_ALARMS,
            FilterExpression: '#str_user_email = :val_user_email',
            ExpressionAttributeNames: {
                "#str_user_email": "user_email",
            },
            ExpressionAttributeValues: {
                ':val_user_email': user_email,
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


    updateAlarmAttributes: async function updateAlarmAttributesInAlertsTable(alarm_uid, updateAction, stateCallback) {

        console.log("\nFile: support_files/databaseFunctions calling function 'updateAlarmAttributes()'");

        let params = {
            TableName: TABLE_ALARMS,
            Key: {
                alarm_uid: alarm_uid
            },
            ReturnValues: "UPDATED_NEW"
        };

        //  set the Update Expression according to the updateAction;

        if (updateAction === ENABLE) {
            params['UpdateExpression'] = "set #str_alarm_activation_status = :val_alarm_activation_status";
            params['ExpressionAttributeValues'] = {
                ":val_alarm_activation_status": "enabled",

            };
            params['ExpressionAttributeNames'] = {
                "#str_alarm_activation_status": "alarm_activation_status"
            }

        } else if (updateAction === DISABLE) {
            params['UpdateExpression'] = "set #str_alarm_activation_status = :val_alarm_activation_status";
            params['ExpressionAttributeValues'] = {
                ":val_alarm_activation_status": "disabled",

            };
            params['ExpressionAttributeNames'] = {
                "#str_alarm_activation_status": "alarm_activation_status"
            }

        } else {
            console.log("\nThere was some error in elseif");
            stateCallback(false);
        }

        // const gmm = {
        //     UpdateExpression: "set admission_status = :new_admission_status, gyankriti_enrollment = :enrollment",
        //     ConditionExpression:
        //         "admission_status = :pending",
        //     ExpressionAttributeValues:
        //         {
        //             ":new_admission_status": "completed",
        //             ":pending": "pending",
        //             ":enrollment": gyankriti_enrollment
        //         }
        // };

        console.log("\nparams for function : update(params) : " + JSON.stringify(params));


        try {
            await docClientDynamo.update(params, (err, data) => {
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
    },

    deleteAlarm: async function removeAlarmFromAlertsTable(alarm_uid, stateCallback) {

        console.log("\nFile: support_files/databaseFunctions calling function 'deleteAlarm()'");

        let params = {
            TableName: TABLE_ALARMS,
            Key: {
                alarm_uid: alarm_uid
            }
        };

        console.log("\nparams for function : update(params) : " + JSON.stringify(params));

        try {
            await docClientDynamo.delete(params, (err, data) => {
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
    }
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