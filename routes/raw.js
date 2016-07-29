var ssh = require('../utils/ssh');

function get(req, res) {
  ssh.create().exec(req.query.command, {
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
