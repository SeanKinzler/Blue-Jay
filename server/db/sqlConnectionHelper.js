var mysql = require('node-mysql');

var db = mysql.createConnection({
  host: process.env.DBHOST,
  user: 'root',
  password: process.env.DBPASSWORD,
  database: 'bluejay'
});


var execute = function (query, callback) {
  db.connect();

  db.query(query, function () {

    callback.apply(null, arguments);

    db.end();

  });
};



module.exports = execute;
