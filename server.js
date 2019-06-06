// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp", function (req, res) {
  // if date string is empty, create new date
  var date = new Date();
  console.log(date);
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

app.get("/api/timestamp/:date_string?", function (req, res) {
  var date_string = req.param('date_string');
  var date;
  // console.log(date_string);
  if (isNaN(date_string)) {
    date = new Date(date_string);
    // console.log("Date string: " + date);
    // res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
  else {
    date = new Date(parseInt(date_string));
    // console.log("Msec: " + date);
    // res.json({unix: date.getTime(), utc: date.toUTCString()});
  }
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});