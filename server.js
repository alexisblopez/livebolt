var express = require('express');
var app = express();   //aplication server object assigned to var app
var http = require('http');
//var piblaster = require('pi-blaster.js');    //include pi-blaster for PWM of raspi

app.use(express.static('public'));  //static files to be served , living in public folder

app.get('/', function(req, res){
  res.send('GET request to homepage')
});

// Express route to handle errors
app.use(function (err, req, res, next) {
      if (req.xhr) {
          res.status(500).send('Oops, Something went wrong!');
      } else {
          next(err);
      }
})

app.listen(8000, function(){
    console.log("Listening on port 8000");
});

//on clrl-c, put stuff here to execute before closing your server with ctrl-c
process.on('SIGINT', function() {
 var i;
 console.log("\nGracefully shutting down from SIGINT (Ctrl+C)");
 process.exit();
});

//render template with the state of the lock
//lock/unlock client side (in javascript file) issued by the post request
