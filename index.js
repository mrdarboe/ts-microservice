// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  const yourTime = new Date(1722665339652);

  res.json({greeting: `Hello ${req.query.name} ${yourTime}`});
});

// app.use(function (req, res, next){
  
//   next();
// })
app.get("/api/:time?", function(req, res){
  let time = req.params.time;

  let unixTimeStamp;
  let unixDate;

  if (!time){
    res.json({"unix": Date.now(), "utc": new Date().toUTCString()});
  } else {
    let queryDate = Date.parse(req.params.time);

  const unixRegex = /^\d{1,4}$/
  const unixFormat = /^\d{1,13}$/

  if (unixFormat.test(queryDate)){
    if (!isNaN(queryDate) && !unixRegex.test(req.params.time)){
      unixTimeStamp = queryDate;
      unixDate = new Date(queryDate).toUTCString();
    } else {
      unixTimeStamp = parseInt(req.params.time);
      unixDate = new Date(unixTimeStamp).toUTCString();
    }
  }
  else if (unixFormat.test(req.params.time)){
    unixTimeStamp = parseInt(req.params.time);
    unixDate = new Date(unixTimeStamp).toUTCString();
  }
  else {
    unixTimeStamp = undefined;
    unixDate = undefined;
  }

  if (unixTimeStamp != undefined && unixDate != undefined){
    res.json({"unix": unixTimeStamp, "utc": unixDate})
  } else {
    res.json({"error": "Invalid Date"})
  }
  }
  
})

/*
  get at /api/:time (req.param,)
  if req = 0
    current time
  else
    check req validity
    if correct
      res object unix: reqparam convert to unix time, utc: reqparam convert to utcTime
    else
      res invalidTime
*/
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
