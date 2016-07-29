var SSH = require('simple-ssh');

function create() {
  return new SSH(require('../config'));
}

function execBinary(command, res) {
  create().exec(command, {
      exit: function(code, stdout, stderr) {
        res.send({
          status: stderr ? 'error' : 'success',
          message: stderr ? stderr : 'done'
        });
      }
  }).start();
}

// Exports
exports.create = create;
exports.execBinary = execBinary;
