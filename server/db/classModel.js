var Sequelize = require('sequelize');
var db = require('./db');

var Class = db.define('classes', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  classname: {
    type: Sequelize.STRING, 
    allowNull: false, 
    unique: true
  },
  access: {
    type: Sequelize.BOOLEAN,
    // allowNull: false,
  },
  keywords: {
    type: Sequelize.STRING,
    // allowNull: false,

  },
  scheduleDays: {
    type: Sequelize.STRING,
    // allowNull: false,
  },
  scheduleTime: {
    type: Sequelize.STRING,
    // allowNull: false,
  },

});
// console.log('synced');
// Class.sync({force: true})
module.exports = Class;