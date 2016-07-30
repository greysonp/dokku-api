var jobs = require('../utils/jobs');

function get(req, res) {
  var job = jobs.get(req.params.id);
  if (job) {
    res.send(job);
  } else {
    res.send({
      status: 'error',
      message: 'No pending process found with id \'' + req.params.id + '\''
    });
  }
}

// Exports
exports.get = get;
