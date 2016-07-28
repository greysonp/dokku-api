var SSH = require('simple-ssh');

var ssh = new SSH(require('./config'));

ssh.exec('apps', {
    out: function(stdout) {
        console.log(stdout);
    }
}).start();
