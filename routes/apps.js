var ssh = require('../utils/ssh');

function get(req, res) {
  ssh.create().exec('apps', {
      exit: function(code, stdout, stderr) {
        var apps = stdout.split('\n');
        apps = apps.slice(1, apps.length - 1);
        res.send({
          apps: apps
        });
      }
  }).start();
}

function create(req, res) {
  ssh.execBinary('apps:create ' + req.query.app, res);
}

function destroy(req, res) {
  ssh.execBinary('apps:destroy ' + req.query.app + ' --force', res);
}

function rename(req, res) {
  ssh.execBinary('apps:rename ' + req.query.old + ' ' + req.query.new, res);
}

// Exports
exports.get = get;
exports.create = create;
exports.destroy = destroy;
exports.rename = rename;
