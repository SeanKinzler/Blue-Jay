var Sequelize = require('sequelize');

process.env.DBHOST = 'blue-jay-users.cnt8aiilpqcs.us-west-2.rds.amazonaws.com';
process.env.DBPORT = 3306;
process.env.DBPASSWORD = 'lionHead2';

var db = new Sequelize('bluejay', 'root', process.env.DBPASSWORD, {
  host: process.env.DBHOST,
  port: Number(process.env.DBPORT),
  dialect: 'mysql'
});

module.exports = db;
