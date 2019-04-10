// all requires and declarations
const express = require("express"), app = express(); // creating express server
const path = require('path');
const request = require("request");
const bodyParser = require("body-parser");  // used bodyParser to get data from all the field in form
const cookieParser = require("cookie-parser");
require('log-timestamp');

// Declaration related to servers
const PORT = process.env.PORT || 80;

app.listen(PORT, async function (err) {
    if (err) console.log("There was some problem in starting the server  : " + JSON.stringify(err, undefined, 2));
    else console.log('\nserver started on the port : ' + PORT);
});

//Main body of the js file
app.use(bodyParser.urlencoded({  // this is important
    extended: true
}));

app.use(bodyParser.json());  // this is important caused a lot of time waste.
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// url routing
app.use('/', require('./routes/main_router'));

console.log('\nServer-side code running');

request('http://169.254.169.254/latest/meta-data/public-ipv4', async function (error, response, body) {
    if (body !== undefined) console.log('\nserver started on ip:port : http://' + body + ":" + PORT);
    else console.log('\nserver started on ip:port : ' + 'http://localhost' + ":" + PORT);
});

app.get('/basetemplate', function (req, res) {
    res.render("basetemplate", {TITLE: "BASIC TEMPLATE"});
});
