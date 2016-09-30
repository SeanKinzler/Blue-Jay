var Sequelize = require('sequelize');

var db = new Sequelize('bluejay', 'root', process.env.DBPASSWORD, {
  host: 'mysql:' + process.env.DBHOST,
  port: Number(process.env.DBPORT),
});

module.exports = db;
