var Sequelize = require('sequelize');

console.log(process.env.DBHOST);
console.log(process.env.DBPORT);
console.log(process.env.DBPASSWORD);

var db = new Sequelize('bluejay', 'root', process.env.DBPASSWORD, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: 'mysql'
});

module.exports = db;
