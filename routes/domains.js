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
          status: 'success',
          global: global,
          app: app
        });
      }
  }).start();
}

function add(req, res) {
  ssh.execBinary('domains:add ' + req.query.app + ' ' + req.query.domain, res);
}

function clear(req, res) {
  ssh.execBinary('domains:clear ' + req.query.app, res);
}

// TODO: Make long-running
function disable(req, res) {
  ssh.execBinary('domains:disable ' + req.query.app + ' ' + req.query.domain, res);
}

// TODO: Make long-running
function enable(req, res) {
  ssh.execBinary('domains:enable ' + req.query.app, res);
}

function remove(req, res) {
  ssh.execBinary('domains:remove ' + req.query.app + ' ' + req.query.domain, res);
}

function setGlobal(req, res) {
  ssh.execBinary('domains:set-global ' + req.query.domain, res);
}

// Exports
exports.get = get;
exports.add = add;
exports.clear = clear;
exports.disable = disable;
exports.enable = enable;
exports.remove = remove;
exports.setGlobal = setGlobal;
