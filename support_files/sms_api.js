const MSG91 = require('msg91');
const config = require('../config/config').getMSG91_config();

const msg91_client = new MSG91(config.MSG91_API_KEY, config.SENDER_ID, 4);

const messageFunctions = {

    sendSMS: async function sendSMSUsingMSG91API(recipients, SMS_message, stateCallback) {
        console.log(`\nFile: support_files/sms_msg91 calling function 'sendSMS()'  Argument Passed : \nRecipients : ${recipients}  , Message : ${SMS_message}`);

        this.getBalance(async (remainingCapacity) => {
                console.log("remaining messages : ", remainingCapacity);

                try {

                    if (remainingCapacity >= recipients.length) {
                        console.log(`Sending ${recipients.length} messages`);

                        await msg91_client.send(recipients, SMS_message, (err, data) => {
                            if (err) {
                                console.log("\nThere was some error ", err, err.stack);
                                stateCallback(false);

                            }// an error occurred
                            else {
                                console.log("\nData :", data);
                                stateCallback(true);
                            }
                        });

                    } else console.log(`there is not enough message capacity. Available= ${remainingCapacity} required = ${recipients.length}`);

                } catch (err) {
                    console.log("error ", err);
                }
            }
        );
    },


    getBalance: async function getSMSBalanceFromMSG91(callback) {
        try {
            await msg91_client.getBalance((err, data) => {
                if (err) {
                    console.log("\nThere was some error ", err, err.stack);
                    callback(null);
                }   // an error occurred
                else {
                    console.log("\nRemaining messages", data);
                    callback(data);
                }
            });
        } catch (err) {
            console.log("error ", err);
        }
    }

// end of main block
};

// try {
//     msg91_client.send(params.mobNumberArray, params.message);
//     console.log("sms sent ");
// } catch (err) {
//     console.log(err);
// }

// test function calls
// messageFunctions.sendSMS([9806247089,9179878711], "Hello from Gyankriti!", (isSuccess) => {
//     console.log("isSuccess :", isSuccess);
// });

module.exports = messageFunctions;