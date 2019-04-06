const awsCredentialConfigForSES = {
    region: "us-east-1"
    // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
    // endpoint: 'http://localhost:8000',
    // endpoint: 'https://dynamodb.ap-south-1.amazonaws.com',
    /*
      accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB.
      For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    */
    // Fill in keys if not using " IAM role "
    // accessKeyId: "",
    // secretAccessKey: ""
};

const AWS = require('aws-sdk');
AWS.config.update(awsCredentialConfigForSES);
const sesClient = new AWS.SES();

const SENDER_EMAIL = 'annantguptacs15@acropolis.in';
const SUCCESS_MESSAGE = 'Dear User, \nGreetings of the Day!\nYour email has been verified successfully.\n\nThank You\nTeam Intelli Meter ';

const emailFunctions = {
    sendVerificationEmail: async function sendVerificationEmailFromSEStoUser(user_email, stateCallback) {
        let params = {
            EmailAddress: user_email
        };
        await sesClient.verifyEmailIdentity(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                stateCallback(false);
            } // an error occurred
            else {
                console.log(data);
                stateCallback(true)
            }           // successful response
        });
    },

    sendSuccessEmail: async function sendSuccessfullyVerifiedEmailToUser(user_email, stateCallback) {
        let params = {
            Destination: { /* required */
                ToAddresses: [
                    user_email
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Text: {
                        Data: SUCCESS_MESSAGE, /* required */
                        Charset: 'UTF-8'
                    }
                },
                Subject: { /* required */
                    Data: 'Verification Complete', /* required */
                    Charset: 'UTF-8'
                }
            },
            Source: SENDER_EMAIL, /* required */
            ReplyToAddresses: [
                SENDER_EMAIL
                /* more items */
            ]
        };
        await sesClient.sendEmail(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                stateCallback(false);
            } // an error occurred
            else {
                console.log(data);
                stateCallback(true)
            }           // successful response
        });
    },

    sendEmailCustomSubjectBody: async function sendEmailWithCustomSubjectAndBody(user_email, subject, body, stateCallback) {
        let params = {
            Destination: { /* required */
                ToAddresses: [
                    user_email
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Text: {
                        Data: body, /* required */
                        Charset: 'UTF-8'
                    }
                },
                Subject: { /* required */
                    Data: subject, /* required */
                    Charset: 'UTF-8'
                }
            },
            Source: SENDER_EMAIL, /* required */
            ReplyToAddresses: [
                SENDER_EMAIL
                /* more items */
            ]
        };
        await sesClient.sendEmail(params, function (err, data) {
            if (err) {
                console.log(err, err.stack);
                stateCallback(false);
            } // an error occurred
            else {
                console.log(data);
                stateCallback(true)
            }           // successful response
        });
    }
};


// emailFunctions.sendVerificationEmail('annantguptacs15@acropolis.in', (isSuccess) => {
//     if (isSuccess) console.log('email sent');
//     else console.log('some error in sending email');
// });

module.exports = emailFunctions;