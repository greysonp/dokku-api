var SSH = require('simple-ssh');
var jobs = require('./jobs');

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

function execBinaryLong(command, req, res) {
  var job = null;
  create().exec(command, {
      out: function(stdout) {
        if (!job) {
          job = jobs.create(req, command);
          res.status(202).send(job);
        }
      },
      exit: function(code, stdout, stderr) {
        jobs.update(job.id, {
          status: stderr ? 'error' : 'success',
          message: stderr ? stderr : 'done',
          command: command,
          endTime: Date.now()
        });
      }
  }).start();
}

// Exports
exports.create = create;
exports.execBinary = execBinary;
exports.execBinaryLong = execBinaryLong;
