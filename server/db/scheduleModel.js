var Sequelize = require('sequelize');
var db = require('./db');

var Schedule = db.define('schedules', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dayOfWeek: {
    type: Sequelize.INTEGER,
  },
  startTime: {
    type: Sequelize.DATE,
  },
  endTime: {
    type: Sequelize.DATE
  }
});

module.exports = Schedule;