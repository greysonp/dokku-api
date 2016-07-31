var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

var raw = require('./routes/raw');
var pending = require('./routes/pending');
var apps = require('./routes/apps');
var domains = require('./routes/domains');
var ps = require('./routes/ps');

// Routes
app.get('/api/v1/raw', raw.get);

app.get('/api/v1/pending/:id', pending.get);

app.get('/api/v1/apps', apps.get);
app.get('/api/v1/apps/create', apps.create);
app.get('/api/v1/apps/destroy', apps.destroy);
app.get('/api/v1/apps/rename', apps.rename);

app.get('/api/v1/domains', domains.get);
app.get('/api/v1/domains/add', domains.add);
app.get('/api/v1/domains/clear', domains.clear);
app.get('/api/v1/domains/disable', domains.disable);
app.get('/api/v1/domains/enable', domains.enable);
app.get('/api/v1/domains/remove', domains.remove);
app.get('/api/v1/domains/set-global', domains.setGlobal);

app.get('/api/v1/ps', ps.get);
app.get('/api/v1/ps/rebuildall', ps.rebuildall);
app.get('/api/v1/ps/rebuild', ps.rebuild);
app.get('/api/v1/ps/restartall', ps.restartall);
app.get('/api/v1/ps/restart', ps.restart);
app.get('/api/v1/ps/restore', ps.restore);
app.get('/api/v1/ps/scale', ps.scale);
app.get('/api/v1/ps/start', ps.start);
app.get('/api/v1/ps/stop', ps.stop);

// Start server
var port = process.env.PORT || 5000;
http.listen(port, function() {
  console.log('listening on *:' + port);
});
