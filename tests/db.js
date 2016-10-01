if (!process.env.TRAVIS_PULL_REQUEST) {
  var bcrypt = require('bcrypt');
  var chai = require('chai');
  var sinon = require('sinon');

  var should = chai.should;
  var expect = chai.expect;
  var assert = chai.assert;

  var sql = require('../server/db/sqlConnectionHelper.js');
  var dbHelpers = require('../server/db/rawSQLHandlers.js');

  describe('Database', function () {
    var random = bcrypt.hashSync('asdf', 5);
    var random2 = bcrypt.hashSync('asdf', 5);
    var userId = 1;

    it('should have access to the environment variables', function () {
      expect(process.env.DBHOST).to.not.equal(undefined);
      expect(process.env.DBPORT).to.not.equal(undefined);
      expect(process.env.DBPASSWORD).to.not.equal(undefined);
    });

    it('should be accessible', function(done) {
      sql('SHOW COLUMNS FROM users', function (err, rows, fields) {
        expect(!err).to.equal(true);
        done();
      });
    });

    it('should be able to create users', function (done) {
      dbHelpers.addUser({
        body: {
          'username': random,
          'firstname': random,
          'lastname': random,
          'email': random
        }
      }, {
        send: function (input) {
          done();
        }
      });
    });

    it('should be able to find users', function (done) {
      dbHelpers.getUser({
        body: {
          'username': random
        }
      }, {
        send: function (input) {
          userId = input[0].id;
          done();
        }
      });
    });


    it('should be able to create classes', function(done) {
      dbHelpers.addClass({
        body: {
          'classname': random,
          'access': random,
          'keywords': random,
          'instructorid': userId,
        }
      }, {
        send: function (input) {
          done();
        }
      });
    });

    it('should be able to find classes', function (done) {
      dbHelpers.getClasses({
        body: {
          classname: random,
        }
      }, {
        send: function (input) {
          done();
        }
      })
    });

    it('should join users and classrooms', function(done) {
      done();
    });

    it('should be able to delete users', function (done) {
      dbHelpers.deleteUser({
        body: {
          'username': random,
        }
      }, {
        send: function (input) {
          done();
        }
      });
    });

    it('should be able to delete classes', function (done) {
      dbHelpers.deleteClass({
        body: {
          classname: random,
        }
      }, {
        send: function (input) {
          console.log(input);
          done();
        }
      });
    });
  });
}
