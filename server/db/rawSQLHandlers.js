var sql = require('./sqlConnectionHelper.js');

module.exports = {
  //must have googleId, createdAt, avatarUrl
  addUser: (req, res) => {
    var keys = [];
    var values = [];

    for (var key in req.body) {
      keys.push(key);
      values.push(req.body[key]);
    }

    sql([

      'INSERT INTO users (' + keys.join(', ') + ')',
      'VALUES ("' + values.join('", "') + '")'

    ].join(' '), function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    });
  },

  getUsers: (req, res) => {
    sql('SELECT * FROM users', (error, rows, fields) => {
      if(error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
  },

  getUser: (req, res) => {
    sql('SELECT * FROM users WHERE username="' + req.params.username + '"',
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    });
  },

  //must take obj with username key
  deleteUser: (req, res) => {
    sql('DELETE FROM users WHERE username="' + req.params.username + '"', 
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    });    
  },

  updateUser: (req, res) => {
    var changes = '';
    for (key in req.body) {
      changes = changes + key + ' = "' + req.body[key] + '", '
    }
    if (changes.length > 2) {
      changes = changes.slice(0, -2);
    }
    console.log('changes: ', changes)
    sql('UPDATE users SET ' + changes + ' WHERE username="' + req.params.username + '";', 
      function(error, rows, fields) {
        console.log('error', error)
        if (error) {
          res.sendStatus(404);
        } else {
          res.send(rows)
        }
      })
  },

  //must have classname, access T/F, keywords, 
  //schedule info
  addClass: (req, res) => { 
    var keys = [];
    var values = [];

    for (var key in req.body) {
      keys.push(key);
      values.push(req.body[key]);
    }

    sql([

      'INSERT INTO classes (' + keys.join(', ') + ')',
      'VALUES ("' + values.join('", "') + '")'

    ].join(' '), function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    });
  },

  //must take obj with classname key
  deleteClass: (req, res) => {
    sql('DELETE FROM classes WHERE classname="' + req.body.classname + '"', 
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    });    

  },


  getClasses: (req, res) => {
    sql('SELECT * FROM classes WHERE classname="' + req.body.classname + '"',
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
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
    res.send({ 'data': 'Student added to class.' });
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

