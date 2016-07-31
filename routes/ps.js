var ssh = require('../utils/ssh');

function get(req, res) {

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
