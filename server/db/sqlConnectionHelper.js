var mysql = require('mysql');


var db = mysql.createConnection({
  host: process.env.DBHOST,
  user: 'root',
  password: process.env.DBPASSWORD,
  database: 'bluejay'
});


var execute = function (query, callback) {

  db.query(query, function () {

    callback.apply(null, arguments);

  });

};


module.exports = execute;













