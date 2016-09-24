var Sequelize = require('sequelize')

var db = new Sequelize('test', 'root', 'root', {
  host:'localhost',
  dialect: 'mysql'
})
module.exports = db;