const express = require('express');
const router = express.Router();
const dynamoFunctions = require('../support_files/dynamo_functions');

const TITLE = "Intelli Meter";

router.get('/', function (req, res) {
    console.log("GET: '/' = Render login Web-Page");
    res.render('login') //, {TITLE: TITLE});
});

router.get('/login', function (req, res) {
    console.log("GET: '/login' = Render Web-Page");
    res.render('login') //, {TITLE: TITLE});
});

router.post('/login', async function (req, res) {

    console.log("\nPOST: '/login' = check user credentials for login.");
    const loginJson = req.body.loginJson;

    try {
        console.log(JSON.stringify(loginJson));
        // console.log(JSON.stringify(req.body.new_admission_data));
        await dynamoFunctions.checkUser(loginJson, (userInfoJson, isSaved) => {
            console.log("is login credentials found in the dynamodb 'intelli_users' table: " + isSaved);
            res.send({userInfoJson: userInfoJson, success: isSaved});
        });

    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }

});

router.post('/show-intelli-device', async function (req, res) {

    console.log("\nPOST: '/show-intelli-device' = send a list of devices from db using user email.");
    const user_email = req.body.user_email;

    try {
        console.log(JSON.stringify(user_email));
        // console.log(JSON.stringify(req.body.new_admission_data));
        await dynamoFunctions.getUserIntelliDevices(user_email, (intelli_devices_array, isSaved) => {
            console.log("is login credentials found in the dynamodb 'intelli_users' table: " + isSaved);
            console.log(intelli_devices_array);
            res.send({intelli_devices_array: intelli_devices_array.Items, success: isSaved});
        });

    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }

});

router.get('/new-intelli-device', function (req, res) {
    console.log("GET: '/new-intelli-device' = Render Web-Page");
    res.render('new_intelli_device') //, {TITLE: TITLE});
});


router.post('/new-intelli-device', async function (req, res) {

    console.log("\nPOST: '/new-intelli-device' = add new device to the db.");
    const newDeviceJson = req.body.newDeviceJson;

    try {
        console.log(JSON.stringify(newDeviceJson));
        // console.log(JSON.stringify(req.body.new_admission_data));
        await dynamoFunctions.createNewIntelliDevice(newDeviceJson, (isSaved) => {
            console.log("is login credentials found in the dynamodb 'intelli_users' table: " + isSaved);
            // console.log(newDeviceJson);
            res.send({/*intelli_devices_array: intelli_devices_array, */success: isSaved});
        });

    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }

});


router.get('/forgot', function (req, res) {
    console.log("GET: '/forgot' = Render Web-Page");
    res.render('forgot') //, {TITLE: TITLE});
});

router.post('/forgot', function (req, res) {
    console.log("\nPOST: '/forgot' = create new user in db.");
    res.render('forgot') //, {TITLE: TITLE});
});


router.get('/registration', function (req, res) {
    console.log("GET: '/registration' = Render Web-Page");
    res.render('registration') //, {TITLE: TITLE});
});

router.post('/registration', async function (req, res) {
    console.log("\nPOST: '/registration' = create new user in db.");

    const newUserJson = req.body.newUserJson;

    try {
        console.log(JSON.stringify(newUserJson));
        // console.log(JSON.stringify(req.body.new_admission_data));
        await dynamoFunctions.createNewUser(newUserJson, (isSaved) => {
            console.log("is Data Saved to the dynamodb 'intelli_users' table:  " + isSaved);
            res.send({success: isSaved});
        });

    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }

});


router.get('/dashboard', function (req, res) {
    console.log("GET: '/dashboard' = Render Web-Page");
    res.render('dashboard') //, {TITLE: TITLE});
});


// for more pages in the dashboard

router.get('/alerts', function (req, res) {
    console.log("GET: '/alerts' = Render Web-Page");
    res.render('alerts') //, {TITLE: TITLE});
});


router.post('/create-alert', async (req, res) => {
    console.log("\nPOST: '/create-alert' = create alarm to db.");

    const createAlarmJson = req.body.createAlarmJson;

    try {
        console.log(JSON.stringify(createAlarmJson));
        // console.log(JSON.stringify(req.body.new_admission_data));
        await dynamoFunctions.createNewAlarms(createAlarmJson, (isSaved) => {
            console.log("is Data Saved to the dynamodb 'intelli_alerts' table:  " + isSaved);
            res.send({success: isSaved});
        });

    } catch (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }

});


router.post('/show-alert', async (req, res) => {
    console.log("\nPOST: '/show-alert' = show alarm from db.");

    const user_email = req.body.user_email;

    try {
        console.log(`alarm creator ${user_email}`);

        await dynamoFunctions.getCurrentAlarms(user_email, (alarmItemsArray, isSuccess) => {
            // console.log(JSON.stringify(alarmItemsArray));
            res.send({alarms_array: alarmItemsArray.Items, success: isSuccess});
        });

    } catch
        (e) {
        console.log("exception e : " + e);
        res.send({success: false});
    }

});


router.get('/past_records', function (req, res) {
    console.log("GET: '/past_records' = Render Web-Page");
    res.render('past_records') //, {TITLE: TITLE});
});


router.get('/billing', function (req, res) {
    console.log("GET: '/billing' = Render Web-Page");
    res.render('billing') //, {TITLE: TITLE});
});


router.get('/monitoring', function (req, res) {
    console.log("GET: '/monitoring' = Render Web-Page");
    res.render('monitoring') //, {TITLE: TITLE});
});


router.get('/support', function (req, res) {
    console.log("GET: '/support' = Render Web-Page");
    res.render('support') //, {TITLE: TITLE});
});


module.exports = router;