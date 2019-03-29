const express = require('express');
const router = express.Router();

const TITLE = "Intelli Meter";

router.get('/', function (req, res) {
    console.log("GET: '/' = Render Web-Page");
    // res.cookie('username', "Annant Gupta",
    //     {
    //         maxAge: 900000
    //     });
    res.render('index') //, {TITLE: TITLE});
});

router.get('/index', function (req, res) {
    console.log("GET: '/index' = Render Web-Page");
    // res.cookie('username', "Annant Gupta",
    //     {
    //         maxAge: 900000
    //     });
    res.render('index') //, {TITLE: TITLE});
});


// for more pages in the dashboard

router.get('/alerts', function (req, res) {
    console.log("GET: '/alerts' = Render Web-Page");
    // res.cookie('username', "Annant Gupta",
    //     {
    //         maxAge: 900000
    //     });
    res.render('alerts') //, {TITLE: TITLE});
});


router.get('/past_records', function (req, res) {
    console.log("GET: '/past_records' = Render Web-Page");
    // res.cookie('username', "Annant Gupta",
    //     {
    //         maxAge: 900000
    //     });
    res.render('past_records') //, {TITLE: TITLE});
});


router.get('/billing', function (req, res) {
    console.log("GET: '/billing' = Render Web-Page");
    // res.cookie('username', "Annant Gupta",
    //     {
    //         maxAge: 900000
    //     });
    res.render('billing') //, {TITLE: TITLE});
});


router.get('/monitoring', function (req, res) {
    console.log("GET: '/monitoring' = Render Web-Page");
    // res.cookie('username', "Annant Gupta",
    //     {
    //         maxAge: 900000
    //     });
    res.render('monitoring') //, {TITLE: TITLE});
});


router.get('/support', function (req, res) {
    console.log("GET: '/support' = Render Web-Page");
    // res.cookie('username', "Annant Gupta",
    //     {
    //         maxAge: 900000
    //     });
    res.render('support') //, {TITLE: TITLE});
});




module.exports = router;