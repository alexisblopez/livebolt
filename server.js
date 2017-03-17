var express = require('express');
var mongoose = require('mongoose');
var path = require('path')
var app = express();
//var https = require('https');
//var http = require('http');
mongoose.connect("mongodb://localhost/senior_design")
require('./server/config/routes.js')(app);

app.use(express.static('public'));  //static files to be served , living in public folder
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './public/bower_components')));

//app.engine('html', require('ejs').renderFile);
//post request

app.listen(8000, function(){
    console.log("Listening on port 3000")
});

//render template with the state of the lock
//lock/unlock client side (in javascript file) issued by the post request
