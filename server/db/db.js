var Sequelize = require('sequelize');

console.log('Host:     \t' + process.env.DBHOST);
console.log('Password: \t' + process.env.DBPASSWORD);
console.log('Port:     \t' + process.env.DBPORT);

var db = new Sequelize('bluejay', 'root', process.env.DBPASSWORD, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: 'mysql'
});

module.exports = db;