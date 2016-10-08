var jwt = require('jsonwebtoken');
var key = require('./keys.js');

var giveToken = function (req, res) {
  var newBody = JSON.parse(JSON.stringify(req.body));
  newBody.token = jwt.sign(req.body, key);
  res.send(newBody);
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

        next();

      }
    });
  }
};

module.exports = {
  giveToken: giveToken,
  checkToken: checkToken,
  middleware: authMiddleware,
};