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

module.exports = router;