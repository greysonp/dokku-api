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
  ssh.create().exec('apps:create ' + req.query.app, {
      exit: function(code, stdout, stderr) {
        res.send({
          status: stderr ? 'error' : 'success',
          message: stderr ? stderr : 'Done'
        });
      }
  }).start();
}

function destroy(req, res) {
  ssh.create().exec('apps:destroy ' + req.query.app, {
      exit: function(code, stdout, stderr) {
        res.send({
          status: stderr ? 'error' : 'success',
          message: stderr ? stderr : 'Done'
        });
      }
  }).start();
}

function rename(req, res) {
  ssh.create().exec('apps:rename ' + req.query.old + ' ' + req.query.new, {
      exit: function(code, stdout, stderr) {
        res.send({
          status: stderr ? 'error' : 'success',
          message: stderr ? stderr : 'Done'
        });
      }
  }).start();
}

// Exports
exports.get = get;
exports.create = create;
exports.destroy = destroy;
exports.rename = rename;
