var express = require('express');
var mongoose = require('mongoose');
var path = require('path')
var app = express();   //aplication server object assigned to var app
//var https = require('https');   //https used for more secure transmission 
var http = require('http');
var piblaster = require('pi-blaster.js');    //include pi-blaster for PWM of raspi





mongoose.connect("mongodb://localhost/senior_design")
require('./server/config/routes.js')(app);

app.use(express.static('public'));  //static files to be served , living in public folder
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './public/bower_components')));

//lock rest get call
app.get('/lock', function(req, res) { 
      piblaster.setPwm(22, 0.145);
      res.end('Box is locked');
 });

//unlock rest get call
app.get('/unlock', function(req, res) { 
       piblaster.setPwm(22, 0.1);
       res.end('Box is unlocked');
 });

// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
     res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
      if (req.xhr) {
          res.status(500).send('Oops, Something went wrong!');
      } else {
          next(err);
      }
});


app.listen(8000, function(){
    console.log("Listening on port 3000")
});

//render template with the state of the lock
//lock/unlock client side (in javascript file) issued by the post request
