var ssh = require('../utils/ssh');

function get(req, res) {
  ssh.create().exec('ps ' + req.query.app, {
      exit: function(code, stdout, stderr) {
        var lines = stdout.split('\n');

        // Parse container id
        var containerTokens = lines[0].split(' ');
        var containerId = containerTokens[containerTokens.length - 1];

        // Isolated the lines that have process info
        lines = lines.slice(2, lines.length - 1);
        var processes = [];
        for (var i = 0; i < lines.length; i++) {
          processes.push(parseProcess(lines[i]));
        }
        res.send({
          containerId: containerId,
          processes: processes
        });
      }
  }).start();
}

function parseProcess(line) {
  var tokens = line.split(/\s+/);
  return {
    user: tokens[0],
    pid: tokens[1],
    cpu: tokens[2],
    mem: tokens[3],
    vsz: tokens[4],
    rss: tokens[5],
    tty: tokens[6],
    stat: tokens[7],
    start: tokens[8],
    time: tokens[9],
    command: tokens.splice(10).join(' ')
  }
}

function rebuildall(req, res) {

}

function rebuild(req, res) {
  ssh.execBinaryLong('ps:rebuild ' + req.query.app, req, res);
}

function restartall(req, res) {

}

function restart(req, res) {
  ssh.execBinaryLong('ps:restart ' + req.query.app, req, res);
}

function restore(req, res) {

}

function scale(req, res) {

}

function start(req, res) {
  ssh.execBinaryLong('ps:start ' + req.query.app, req, res);
}

function stop(req, res) {
  ssh.execBinaryLong('ps:stop ' + req.query.app, req, res);
}

// Exports
exports.get = get;
exports.rebuildall = rebuildall;
exports.rebuild = rebuild;
exports.restartall = restartall;
exports.restart = restart;
exports.restore = restore;
exports.scale = scale;
exports.start = start;
exports.stop = stop
