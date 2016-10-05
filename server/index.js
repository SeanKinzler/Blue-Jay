var server = require('./config/socket-config.js');

var port = process.env.PORT || 8443;

server.listen(port);
console.log('Listening on port: ' + port);
