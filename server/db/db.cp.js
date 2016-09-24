var Sequelize = require('sequelize');

var db = new Sequelize('bluejay', /*username*/'', /*pass*/'', {
  host:'',//str, does not include port
  port:,//index
  dialect: 'mysql'
});
module.exports = db;