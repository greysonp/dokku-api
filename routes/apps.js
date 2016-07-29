var SSH = require('simple-ssh');

function get(req, res) {
  var ssh = new SSH(require('../config'));
  ssh.exec('apps', {
      exit: function(code, stdout, stderr) {
        var apps = stdout.split('\n');
        apps = apps.slice(1, apps.length - 1);
        res.send({
          apps: apps
        });
      }
  }).start();
}

function getCreate(req, res) {

}

function getDestroy(req, res) {

}

function getRename(req, res) {

}

// Exports
exports.get = get;
exports.getCreate = getCreate;
exports.getDestroy = getDestroy;
exports.getRename = getRename;
