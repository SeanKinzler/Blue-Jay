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
    sql('UPDATE users SET ' + changes + ' WHERE username="' + req.params.username + '";', 
      function(error, rows, fields) {
        if (error) {
          res.sendStatus(404);
        } else {
          res.send(rows)
        }
      })
  },

  //must have classname, access T/F, keywords, 
  //schedule info
  addStream: (req, res) => { 
    var keys = [];
    var values = [];

    for (var key in req.body) {
      keys.push(key);
      values.push(req.body[key]);
    }

    sql([
      'INSERT INTO streams (' + keys.join(', ') + ')',
      'VALUES ("' + values.join('", "') + '")'
    ].join(' '), function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    });
  },

  searchStreams: (req, res) => {
    var categories = req.body.categories;
    var keywords = req.body.keywords;
    var req = 'SELECT * FROM streams \
        INNER JOIN streams_categories ON (streams.id=streamId) \
        INNER JOIN categories ON (categories.id=categoryId) \
        WHERE'
    if (categories === undefined && keywords === undefined) {
      sql('SELECT * FROM streams', function(error, rows, fields) {
        if(error) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })

    } else if (keywords === undefined){
      sql('SELECT * FROM streams \
        INNER JOIN streams_categories ON (streams.id=streamId) \
        INNER JOIN categories ON (categories.id=categoryId) \
        WHERE categories.text=' categories, function(error, rows, fields) {
          console.log(error);
          console.log(rows);
          if (error) {
            res.sendStatus(404);
          } else {
            res.send(rows);
          }
        })
    }
  },

  updateStream: (req, res) => {
    var changes = '';
    for (key in req.body) {
      if (key === 'subscriberCount') {
        changes = changes + key + ' = ' + req.body[key] + ', '
      } else {
        changes = changes + key + ' = "' + req.body[key] + '", '
      }
    }
    if (changes.length > 2) {
      changes = changes.slice(0, -2);
    }
    sql('UPDATE streams SET ' + changes + ' WHERE title="' + req.params.title + '";', 
      function(error, rows, fields) {
        console.log(error);
        if (error) {
          res.sendStatus(404);
        } else {
          res.send(rows);
        }
      })
  },

  //must take obj with classname key
  deleteStream: (req, res) => {
    sql('DELETE FROM streams WHERE title="' + req.params.title + '"', 
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    });    

  },


  getStream: (req, res) => {
    sql('SELECT * FROM streams WHERE title="' + req.params.title + '"',
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

