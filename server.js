var express = require('express');
var app = express();   //aplication server object assigned to var app
var http = require('http');
var piblaster = require('pi-blaster.js');    //include pi-blaster for PWM of raspi
var state = 0     // zero represents lock state, everytime server starts should be locked!

app.use(express.static('public'));  //static files to be served , living in public folder

app.post('/lock', function(req, res){
  console.log("LOCKED", req.body)
  piblaster.setPwm(22, 0.145);    //setting pulse width modulation for locking
  if (state == 0){
    state = 1
    piblaster.setPwm(22, 0.1); //setting the pulse width modulation for unlocking 
  }
  res.send('POST request to homepage')
});

//server needs to track state changes
//connect server to database to check lock status

//or make sure server knows it is in 1 specific state before issuing anything
//make bool to keep trakc of state
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
