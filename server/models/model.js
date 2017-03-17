var mongoose = require('mongoose');

var lockSchema = mongoose.Schema({
  lock: {type: Boolean}
})

module.exports = mongoose.model('Lock', lockSchema);
