// all requires and declarations
const express = require("express"), app = express(); // creating express server
const path = require('path');
const request = require("request");
const bodyParser = require("body-parser");  // used bodyparser to get data from all the field in form
// const CFNfile = require('./launch_cloudformation');


// Declaration related to servers
const PORT = process.env.PORT || 80;

//Main body of the js file
app.use(bodyParser.urlencoded({  // this is important
    extended: true
}));

app.use(bodyParser.json());  // this is important caused a lot of time waste.

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'vendors')));
app.use(express.static(path.join(__dirname, 'views')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
    console.log("app.get renders : INDEX");
    res.render('index', {TITLE: "Synergy"});
});

app.get('/index', function (req, res) {
    console.log("app.get renders : INDEX");
    res.render('index', {TITLE: "Synergy"});
});


app.get('/coming', function (req, res) {
    console.log("app.get renders : COMING");
    res.render('coming', {TITLE: "Synergy"});
});

app.get('/custom_env', function (req, res) {
    console.log("app.get renders : CUSTOM_ENV");
    res.render('custom_env', {TITLE: "Launch Custom Environment"});
});


request('http://169.254.169.254/latest/meta-data/public-ipv4', function (error, response, body) {
    if (body !== undefined) console.log('server started on ip:port : http://' + body + ":" + PORT);
    else console.log('server started on ip:port : ' + 'http://localhost' + ":" + PORT);
});

app.listen(PORT, function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('server started on port : ' + PORT);
});

console.log('Server-side code running');

app.get('/launchstack', function (req, res) {
    console.log("app.get renders : LAUNCHSTACK");
    res.render("launchstack", {TITLE: "Launch Stack"});
});

app.post('/launchstack', function (req, res) {
    console.log("app.get renders :  LAUNCHSTACK POST REQ");
    console.log(req.body.stackName);
    CFNfile.createSTK(req.body.stackName);
});

app.get('/outputs', function (req, res) {
    console.log("app.get renders : OUTPUTS");
    res.render("outputs", {TITLE: "OUTPUTS"});
});

app.post('/outputs', function (req, res) {
    console.log("app.post return data to ajax : OUTPUTS");

    try {
        CFNfile.getStackOutputs(function (outdata) {
            if (outdata) console.log("Sending DATA " + JSON.stringify(outdata));
            else outdata = null;
            res.send({outdata: outdata});
        });
    } catch (e) {
        res.send("error");
    }

});
