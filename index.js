var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

var raw = require('./routes/raw');
var apps = require('./routes/apps');

// Routes
app.get('/api/v1/raw', raw.get);

app.get('/api/v1/apps', apps.get);
app.get('/api/v1/apps/create', apps.getCreate);
app.get('/api/v1/apps/destroy', apps.getDestroy);
app.get('/api/v1/apps/rename', apps.getRename);

// Start server
var port = process.env.PORT || 5000;
http.listen(port, function() {
  console.log('listening on *:' + port);
});
