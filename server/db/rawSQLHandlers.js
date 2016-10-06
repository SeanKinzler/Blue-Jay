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
    req.body.categories = req.body.categories || [];
    for (var key in req.body.vals) {
      if (key !== 'username') {
        keys.push(key);
        values.push(req.body.vals[key]);
      } 
    }
    var query = 'INSERT INTO streams (' + keys.join(', ') + ', creatorId) ' + 
      'VALUES ("' + values.join('", "') + '", ' + 
      '(SELECT id FROM users WHERE username="' + req.body.vals.username + '"));\n' + 
      'SET @newStream = LAST_INSERT_ID();\n';
    if (req.body.categories !== undefined) {
      for (var i = 0; i < req.body.categories.length; i++) {
        query = query + ('INSERT IGNORE INTO categories (text) VALUES ("' + req.body.categories[i] + '");\n' +  
        'SET @newCategory = (SELECT id FROM categories WHERE text="' + req.body.categories[i] +  '");\n' + 
        'INSERT INTO streams_categories (streamId, categoryId) VALUES (@newStream, @newCategory);\n')
      }
    }
    queries = query.split('\n');
    executeQueries(queries, res);
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
        WHERE categories.text=' + categories, function(error, rows, fields) {

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
      } else if (key !== 'categories') {
        changes = changes + key + ' = "' + req.body[key] + '", '
      }
    }
    if (changes.length > 2) {
      changes = changes.slice(0, -2);
    }
    var query = 'UPDATE streams SET ' + changes + ' WHERE title="' + req.params.title + '";\n' +
      'SET @stream = (SELECT id FROM streams WHERE title="' + req.params.title + '");\n' + 
      'DELETE FROM streams_categories WHERE streamID=@stream; \n';
    if (req.body.categories !== undefined) {
      for (var i = 0; i < req.body.categories.length; i++) {
        query = query + ('INSERT IGNORE INTO categories (text) VALUES ("' + req.body.categores[i] + '");\n' +  
        'SET @newCategory = (SELECT id FROM categories WHERE text="' + req.body.categories[i] +  '");\n' + 
        'INSERT INTO streams_categories (streamId, categoryId) VALUES (@stream, @newCategory);\n') 
      }
    }
    queries = query.split('\n');
    executeQueries(queries, res);
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
    sql('SELECT s.*, c.text FROM streams s LEFT JOIN (streams_categories sc, categories c) \
      ON (s.title="' + req.params.title + '" AND s.id = sc.streamId AND c.id = sc.categoryId)',
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
      } else {
        rows[0].categories = [];
        for (var i = 0; i < rows.length; i++) {
          rows[0].categories.push(rows[i].text);
        }
        console.log('rows: ', rows[0])
        res.send(rows[0]);
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

var executeQueries = function (queries, res, currIndex) {
  var currIndex = currIndex || 0;
  sql(queries[currIndex], function(error, rows, fields) {
    if (error) {
      console.log('repeater error: ', error)
      res.sendStatus(404);
    } else {
      currIndex++;
      if (currIndex >= queries.length - 1) {
        res.send(rows);
      } else {
        executeQueries(queries, res, currIndex);
      }
    }
  })
};

