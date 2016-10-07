var jwt = require('jsonwebtoken');
var key = require('./keys.js');

var authenticate = function (req, res, next) {
  
  if (!req.body.jwt) {

    res.sendStatus(401);

  } else {

    jwt.verify(req.headers.jwt, key, function (error, decoded) {

      if (error) {

        res.sendStatus(401);

      } else {

        res.sendStatus(200);

      }
    });
  }
};