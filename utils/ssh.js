var SSH = require('simple-ssh');

function create() {
  return new SSH(require('../config'));
}

// Exports
exports.create = create;
