var sql = require('./sqlConnectionHelper.js');

module.exports = {

  toggleStreamOff: (req, res) => {
    sql('update streams set online="false" where title="' + req.body.title + '"', function (error, rows, fields) {
      console.log(arguments);
    });
  },

  toggleStreamOn: (req, res) => {
    sql('update streams set online="true" where title="' + req.body.title + '"', function (error, rows, fields) {
      console.log(arguments);
    });
  },

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
        return;
      } else {
        res.send(rows);
        return;
      }
    });
  },

  getUsers: (req, res) => {
    sql('SELECT * FROM users', (error, rows, fields) => {
      if (error) {
        res.sendStatus(404);
        return;
      } else {
        res.send(rows);
        return;
      }
    });
  },
  //return owned streams aswell
  getUser: (req, res) => {
    var query1 = 'SELECT u.id, u.username, sub.phoneNotifications, sub.emailNotifications, s.id as streamId, s.title, s.subscriberCount, s.description, us.username AS creatorName FROM users u ' + 
      'LEFT JOIN (subscriptions sub, streams s, users us) ' + 
      'ON (u.username="' + req.username + '" AND u.id = sub.userId AND s.id = sub.streamId AND s.creatorId=us.id) WHERE u.username="' + req.username + '";\n'
      query2 = 'SELECT s.*, u.username FROM streams s JOIN (users u) ON s.creatorId=u.id WHERE creatorId=(SELECT id FROM users WHERE username="' + req.username +'");\n'
    sql(query1,
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
        return;
      } else {
        sql(query2, function(error2, rows2, fields2) {
          if (error2) {
            res.sendStatus(404);
            return;
          } else {
            if(rows[0] !== undefined) {
              rows[0].subscriptions = [];
              rows[0].ownedStreams = rows2;
              for (var i = 0; i < rows.length; i++) {
                if (rows[i].creatorId !== null) {
                  rows[0].subscriptions.push({
                    phoneNotifications: rows[i].phoneNotifications,
                    emailNotifications: rows[i].emailNotifications,
                    title: rows[i].title,
                    online: rows[i].online,
                    description: rows[i].description,
                    creatorName: rows[i].creatorName
                  });
                }
              }
            } else {
              if (rows.title !== undefined) {
                rows.subscriptions = [];
                rows.ownedStreams = rows2;
                rows.subscriptions.push({
                    phoneNotifications: rows.phoneNotifications,
                    emailNotifications: rows.emailNotifications,
                    title: rows.title,
                    online: rows.online,
                    description: rows.description,
                    creatorName: rows.creatorName
                  });
                res.send(rows);
                return;
              } else {
                rows.ownedStreams = rows2;
                rows.subscriptions = [];
                res.send(rows);
                return;
              }
            }
            res.send(rows[0]); 
            return;
          }
        })
      }
    });
  },

  //must take obj with username key
  deleteUser: (req, res) => {
    sql('DELETE FROM users WHERE username="' + req.username + '"', 
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
        return;
      } else {
        res.send(rows);
        return;
      }
    });    
  },

  updateUser: (req, res) => {
    var changes = '';
    for (key in req.body) {
      if (key !== 'id') {
        changes = changes + key + ' = "' + req.body[key] + '", '
      }
    }
    if (changes.length > 2) {
      changes = changes.slice(0, -2);
    }
    sql('UPDATE users SET ' + changes + ' WHERE id="' + req.body.id + '";', 
      function(error, rows, fields) {
        if (error) {
          res.sendStatus(404);
          return;
        } else {
          res.send(rows);
          return;
        }
      })
  },

  //must have classname, access T/F, keywords, 
  //schedule info
  addStream: (req, res) => { 
    var keys = [];
    var values = [];
    req.body.online = false;
    req.body.categories = req.body.categories || [];
    req.body.keywords = req.body.keywords || [];
    for (var key in req.body) {
      if (key !== 'id' && key !== 'categories' && key !== 'keywords' && key !== 'subscriberCount') {
        keys.push(key);
        values.push(req.body[key]);
      } 
    }
    var query = 'INSERT INTO streams (' + keys.join(', ') + ', subscriberCount, creatorId) ' + 
      'VALUES ("' + values.join('", "') + '", '  + 0 + ', ' + req.userId + ');\n' + 
      'SET @newStream = LAST_INSERT_ID();\n';
    if (req.body.categories !== undefined) {
      for (var i = 0; i < req.body.categories.length; i++) {
        query = query + ('INSERT IGNORE INTO categories (text) VALUES ("' + req.body.categories[i] + '");\n' +  
                'SET @newCategory = (SELECT id FROM categories WHERE text="' + req.body.categories[i] +  '");\n' + 
                'INSERT INTO streams_categories (streamId, categoryId) VALUES (@newStream, @newCategory);\n')
      }
    }
    if (req.body.keywords !== undefined) {
      for (var i = 0; i < req.body.keywords.length; i++) {
        query = query + ('INSERT IGNORE INTO keywords (text) VALUES ("' + req.body.keywords[i] + '");\n' +  
          'SET @newKeyword = (SELECT id FROM keywords WHERE text="' + req.body.keywords[i] +  '");\n' + 
          'INSERT INTO streams_keywords (streamId, keywordId) VALUES (@newStream, @newKeyword);\n');
      }
    }
    queries = query.split('\n');
    executeQueries(queries, res);
  },

  searchStreams: (req, res) => {
    // need to use req.query because query values sent in url
    var keys = [];
    var values = [];
    req.query = req.query || {};
    var categories = req.query.categories || [];
    for (var key in {title:'', description: ''}) {
      if (key !== 'categories' && key !== 'keywords' && key !== 'creatorName') {
        keys.push(key);
        values.push(req.query.text);
      } 
    }
    var query = 'SELECT streams.*, u.username as creatorName FROM streams ';
    if (categories !== undefined) {
      for(var i = 0; i < categories.length; i++) {
        query = query + 'INNER JOIN (streams_categories sc, categories c) ON ' +
        '(streams.id=sc.streamId AND sc.categoryId=c.id AND c.text="' + categories[i] + '") ';
      }
    }
    if (req.query.text !== undefined) {
        query = query + 'INNER JOIN (streams_keywords sk, keywords k) ON ' +
        '(streams.id=sk.streamId AND sk.keywordId=k.id AND k.text LIKE "%' + req.query.text + '%") ';
    }
    if (req.query.text !== undefined && (keys !== undefined && keys.length > 0)) {
      query = query + 'WHERE (';
    
      // if (req.query.creatorName !== undefined) {
      //   query = query + 'creatorId=(SELECT id FROM users WHERE username="'  + req.query.creatorName + '")'
      //   if (keys !== undefined && keys.length > 0) {
      //     query = query + ' AND ';
      //   }
      // }

      if (keys !== undefined && keys.length > 0 && req.query.text) {
        for (var i = 0; i < keys.length; i++) {
          if (i === 0) {
            query = query + keys[i] + ' LIKE "%' + values[i] + '%"';
          } else {
            query = query + ' OR ' + keys[i] + ' LIKE "%' + values[i] + '%"';
          }
        }
      }
      query = query + ');\n';
    } else {
      query = query + ';\n';
    }

    sql(query, function(error, rows, fields) {
      if (error) {
        res.sendStatus(404);
        return;
      } else {
        res.send(rows);
        return;
      }
    });

  },

  updateStream: (req, res) => {
    var changes = '';
    for (key in req.body) {
      if (key === 'subscriberCount') {
        changes = changes + key + ' = ' + req.body[key] + ', '
      } else if (key !== 'categories' && key !== 'keywords' && key !== 'id') {
        changes = changes + key + ' = "' + req.body[key] + '", '
      }
    }
    if (changes.length > 2) {
      changes = changes.slice(0, -2);
    }
    var query = 'UPDATE streams SET ' + changes + ' WHERE id=' + req.body.id + ';\n' +
      'SET @stream = (SELECT id FROM streams WHERE id=' + req.body.id + ');\n' +
      'DELETE FROM streams_categories WHERE streamId=@stream; \n' +
      'DELETE FROM streams_keywords WHERE streamId=@stream; \n';
    if (req.body.categories !== undefined) {
      for (var i = 0; i < req.body.categories.length; i++) {
        query = query + ('INSERT IGNORE INTO categories (text) VALUES ("' + req.body.categores[i] + '");\n' +  
        'SET @newCategory = (SELECT id FROM categories WHERE text="' + req.body.categories[i] +  '");\n' + 
        'INSERT INTO streams_categories (streamId, categoryId) VALUES (@stream, @newCategory);\n') 
      }
    }
    if (req.body.keywords !== undefined) {
      for (var i = 0; i < req.body.keywords.length; i++) {
        query = query + ('INSERT IGNORE INTO keywords (text) VALUES ("' + req.body.keywords[i] + '");\n' +  
        'SET @newKeyword = (SELECT id FROM keywords WHERE text="' + req.body.keywords[i] +  '");\n' + 
        'INSERT INTO streams_keywords(streamId, keywordId) VALUES (@stream, @newKeyword);\n') 
      }
    }
    queries = query.split('\n');
    console.log(queries);
    executeQueries(queries, res);
  },

  getStream: (req, res) => {
    var query = 'SELECT * FROM streams WHERE title="' + req.body.title + '";\n' + 
      'SELECT c.* FROM streams s INNER JOIN (streams_categories sc, categories c) ' + 
      'ON (s.title="' + req.body.title + '" AND s.id = sc.streamId AND c.id = sc.categoryId) ' + 
      'WHERE s.title = "' + req.body.title + '";\n' +
      'SELECT k.* FROM streams s INNER JOIN (streams_keywords sk, keywords k) ' + 
      'ON (s.title="' + req.body.title + '" AND s.id = sk.streamId AND k.id = sk.keywordId) ' + 
      'WHERE s.title = "' + req.body.title + '";\n';
    queries = query.split('\n');
    returnQueries(queries, res, function(toRet) {
      toRet[0].categories = [];
      toRet[0].keywords = [];
      if (toRet[1].length === undefined) {
        toRet[1] = toRet[1] || []
        
      }
      if (toRet[2].length === undefined) {
        toRet[2] = toRet[2] || []
        
      }
      for (var i = 0; i < toRet[1].length; i++) {
        toRet[0].categories.push(toRet[1][i].text);
      }
      for (var i = 0; i < toRet[2].length; i++) {
        toRet[0].keywords.push(toRet[2][i].text);
      }
      res.send(toRet[0]);
      return;
      return;
    });
  },

  //must take obj with classname key
  deleteStream: (req, res) => {
    sql('DELETE FROM streams WHERE title="' + req.body.title + '"', 
    function (error, rows, fields) {
      if (error) {
        res.sendStatus(404);
        return;
      } else {
        res.send(rows);
        return;
      }
    });    

  },

  addSubscription: (req, res) => {
    var query  = 'INSERT INTO subscriptions (streamId, userId, phoneNotifications, emailNotifications) VALUES (' + 
    '(SELECT id FROM streams WHERE title="' + req.body.title + '"), ' + req.userId + ', "false", "false");\n' + 
    'UPDATE streams SET subscriberCount = subscriberCount + 1;\n';
    queries = query.split('\n');
    executeQueries(queries, res);
  },

  updateSubscription: (req, res) => {
    var query  = 'DELETE FROM subscriptions WHERE (userId=' + req.userId + 
    ' AND streamId=(SELECT id FROM streams WHERE title="' + req.body.title + '"));\n' + 
    'UPDATE streams SET subscriberCount = subscriberCount - 1;\n';
    queries = query.split('\n');
    executeQueries(queries, res);
  },

//   getSchedule: (req, res) => {
//     User.getClasses().then((classes) => {
//       classes.getSchedules().then((schedules) => {
//         res.send({data: JSON.stringify(schedules)});
//       })
//     })
//   },
};

var executeQueries = function (queries, res, currIndex) {
  var currIndex = currIndex || 0;
  sql(queries[currIndex], function(error, rows, fields) {
    if (error) {
      console.log('repeater error: ', error)
      res.sendStatus(404);
      return;
    } else {
      currIndex++;
      if (currIndex >= queries.length - 1) {
        res.send(rows);
        return;
      } else {
        executeQueries(queries, res, currIndex);
      }
    }
  })
};

var returnQueries = function (queries, res, callback, currIndex, toRet) {
  var toRet = toRet || [];
  var currIndex = currIndex || 0;
  sql(queries[currIndex], function(error, rows, fields) {
    if (error) {
      console.log('repeater error: ', error)
      res.sendStatus(404);
      return;
    } else {
      currIndex++;
      toRet.push(rows);
      if (currIndex >= queries.length - 1) {
        callback(toRet);
      } else {
         returnQueries(queries, res, callback, currIndex, toRet);
      }
    }
  })
};

