var count = 1;
var jobs = {};
var MAX_AGE = 24 * 60 * 60 * 1000; // 24 hrs

function create(req) {
  var id = count++;
  var response = {
    status: 'pending',
    id: id,
    location: req.protocol + '://' + req.get('host') + '/api/v1/pending/' + id,
    startTime: Date.now()
  };
  jobs[id] = response;
  clean();

  return response;
}

function update(id, response) {
  jobs[id] = response;
}

function get(id) {
  return jobs[id];
}

function clean(maxAge) {
  maxAge = maxAge || MAX_AGE;
  var now = Date.now();
  var keys = Object.keys(jobs);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var job = jobs[key];
    if (now - job.startTime > maxAge) {
      delete jobs[key];
    }
  }
}

// Exports
exports.create = create;
exports.update = update;
exports.get = get;
exports.clean = clean;
