var jwt = require('jsonwebtoken');
var key = require('keys.js');

var authenticate = function (req, res, next) {
  
  if (!req.body.jwt) {
    
    res.sendStatus(401);

  } else if (!jwt(req.body.jwt, key)) {
    
    res.sendStatus(401);

  } else {

    next();
    
  }
};