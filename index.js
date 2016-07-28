var express = require('express');
var app = require('express')();
var raw = require('./routes/raw');
var http = require('http').Server(app);

// Routes
app.get('/api/v1/raw', raw.get);

// Start server
var port = process.env.PORT || 5000;
http.listen(port, function() {
  console.log('listening on *:' + port);
});
