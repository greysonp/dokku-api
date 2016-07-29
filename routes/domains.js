var ssh = require('../utils/ssh');

function get(req, res) {
  ssh.create().exec('domains ' + req.query.app, {
      exit: function(code, stdout, stderr) {
        if (stderr) {
          return res.send({
            status: 'Error',
            message: stderr
          });
        }
        var lines = stdout.split('\n');
        lines = lines.slice(1, lines.length - 1);
        var global = [];
        var app = [];
        var isApp = false;
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (line.indexOf('Domain Names') >= 0) {
            isApp = true;
            continue;
          }
          if (isApp) {
            app.push(line);
          } else {
            global.push(line);
          }
        }
        res.send({
          status: 'Success',
          global: global,
          app: app
        });
      }
  }).start();
}

function add(req, res) {
}

function clear(req, res) {
}

function disable(req, res) {
}

function enable(req, res) {
}

function remove(req, res) {
}

function setGlobal(req, res) {
}

// Exports
exports.get = get;
exports.add = add;
exports.clear = clear;
exports.disable = disable;
exports.enable = enable;
exports.remove = remove;
exports.setGlobal = setGlobal;
