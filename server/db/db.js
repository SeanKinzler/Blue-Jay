var Sequelize = require('sequelize');

console.log(process.env.DBHOST);

var db = new Sequelize('bluejay', 'root', process.env.DBPASSWORD, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: 'mysql'
});

module.exports = db;

