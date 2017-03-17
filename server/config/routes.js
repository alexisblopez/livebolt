var lockedController = require('../controllers/controls.js');

module.exports = function(app){
  app.post('/lock', lockedController.update)
}
