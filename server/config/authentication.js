var jwt = require('jsonwebtoken');
var key = require('keys.js');

var authenticate = function (req, res, next) {
  
  if (!req.body.jwt) {

    res.sendStatus(401);

  } else {

    jwt.verify(req.body.jwt, key, function (error, decoded) {

      if (error) {

        res.send(401);

      } else {

        next();

      }
    });
  }
};