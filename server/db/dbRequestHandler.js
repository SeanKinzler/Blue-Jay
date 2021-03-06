var db = require('./db');
var Classroom = require('./classModel');
var User = require('./userModel');
var Schedule = require('./scheduleModel');

module.exports = {
  //must have username, password, 
  //firstname, lastname, email
  addUser: (req, res) => {
    var params = req.body;
    User.create(params)
    .then(function(data, err) {
      res.send({'data': 'User created.'});
    })
    .catch(function (error) {
      res.send(error);
    });
  },

  //must take obj with username key
  deleteUser: (req, res) => {
    console.log('req.body', req.body);
    User.find({
      where: {username: req.body.username}
    }).then(function(user) {
      user.destroy();
      res.send({'data': 'User removed.'});
    }).catch(function (error) {
      res.send(error);
    });
  },

  getUsers: (req, res) => {
    User.findAll().then((users) => {
      console.log(users)
      res.send({'data': JSON.stringify(users)});
    });
  },

  //must have classname, access T/F, keywords, 
  //schedule info
  addClass: (req, res) => {
    console.log(req.body);
    Classroom.create(req.body).then((data) => {
      res.send({'data': 'Classroom created.'});
    }).catch(function (error) {
      res.send(error);
    });
  },

  //must take obj with classname key
  deleteClass: (req, res) => {
    Classroom.find({
      where: {classname: req.body.classname}
    }).then((classroom) => {
      classroom.destroy();
      res.send({'data': 'Classroom deleted.'});
    }).catch(function (error) {
      res.send(error);
    });
  },


  getClasses: (req ,res) => {
    Classroom.findAll().then((classes) => {
      res.send({'data': JSON.stringify(classes)});
    });
  },

  addStudent: (req, res) => {
    Classroom.find({where: {
      classname: req.body.classname}
    }).then((classroom) => {
      User.find({where: {
        username: req.body.username
      }}).then((user) => {
        classroom.addUser(user).then((data) => {
          res.sendStatus(201);
        }).catch((err) => {res.sendStatus(403)}) 
      });
    })
    res.send({'data': 'Student added to class.'});
  },
  
  removeStudent: (req, res) => {

    res.send({'data': 'Student added to class.'});
  },

  getSchedule: (req, res) => {
    User.getClasses().then((classes) => {
      classes.getSchedules().then((schedules) => {
        res.send({data: JSON.stringify(schedules)});
      })
    })
  },
};

