var mongoose = require('mongoose');

var Lock = require('../models/model.js')

module.exports = {
  update: function(request, response){
    Lock.findOne({_id: '58acfab958041f242672b00e'}, function(err, Lock){
      // console.log(record);
      if(err){
        console.log(err);
      }
      else if(Lock){
        console.log(Lock.lock);

        if(Lock.lock == true){
          Lock.lock = false;
          console.log(Lock.lock)
        }
        else if(Lock.lock == 'false'){
          Lock.lock == 'true';
          console.log(Lock);
          response.json({Lock:Lock})
         }
        }
      })
  }
}
