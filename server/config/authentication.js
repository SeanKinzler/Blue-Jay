var jwt = require('jsonwebtoken');
var key = require('./keys.js');

var giveToken = function (req, res) {
  var newBody = JSON.parse(JSON.stringify(req.body));
  newBody.token = jwt.sign(req.body, key);
  res.send(newBody);
};

var checkToken = function (req, res, next) {
  
  if (!req.headers.jwt) {

    res.send(302);

  } else {

    jwt.verify(req.headers.jwt, key, function (error, decoded) {

      if (error) {

        res.send(302);

      } else {

        console.log(decoded);

        res.send(200);

      }
    });
  }
};

var authMiddleware = function (req, res, next) {
  if (!req.headers.jwt) {

    res.send(302);

  } else {

    jwt.verify(req.headers.jwt, key, function (error, decoded) {

      if (error) {

        res.send(302);

      } else {

        

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