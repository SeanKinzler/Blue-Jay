var jwt = require('jsonwebtoken');
var key = require('./credentials/jwtKey.js');

var createToken = function (input) {
  return jwt.sign(input, key);
};

var giveToken = function (req, res) {
  var newBody = JSON.parse(JSON.stringify(req.body));
  newBody.token = jwt.sign(req.body, key);
  res.send(newBody);
};

var decodeToken = function (token, callback) {
  jwt.verify(token, key, callback);
};

var checkToken = function (req, res, next) {
  
  if (!req.headers.jwt) {

    res.sendStatus(302);

  } else {

    jwt.verify(req.headers.jwt, key, function (error, decoded) {

      if (error) {

        res.sendStatus(302);

      } else {

        res.sendStatus(200);

      }
    });
  }
};

var authMiddleware = function (req, res, next) {

  if (req.path.slice(0, 4) !== '/api') {
    
    next();

  } else if (!req.headers.jwt) {

    res.sendStatus(401);

  } else {

    jwt.verify(req.headers.jwt, key, function (error, decoded) {

      if (error) {
        res.sendStatus(401);

      } else {

        req.username = decoded.username;
        req.userId = decoded.id;

        next();

      }
    });
  }
};

module.exports = {
  giveToken: giveToken,
  checkToken: checkToken,
  middleware: authMiddleware,
  createToken: createToken,
  decode: decodeToken,
};