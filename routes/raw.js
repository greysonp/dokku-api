var SSH = require('simple-ssh');

function get(req, res) {
  var ssh = new SSH(require('../config'));
  ssh.exec(req.query.command, {
      exit: function(code, stdout, stderr) {
        console.log('exit');
        res.send({
          code: code,
          stdout: stdout,
          stderr: stderr
        });
      }
  }).start();
}

// Exports
exports.get = get;
