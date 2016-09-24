var app = require('./config/app-config.js');

var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening on port: ' + port);

