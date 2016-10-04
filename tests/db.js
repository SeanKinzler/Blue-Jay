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

 it('should be able to find all users', function (done) {
      dbHelpers.getUsers({
        params: {
          'username': random
        }
      }, {
        send: function (input) {
          userId = input[0].id;
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to create a user', function (done) {
      dbHelpers.addUser({
        body: {
          'username': random,
          'firstname': random,
          'lastname': random,
          'email': random
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to find a user', function (done) {
      dbHelpers.getUser({
        params: {
          'username': random
        }
      }, {
        send: function (input) {
          userId = input[0].id;
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to delete a user', function (done) {
      dbHelpers.deleteUser({
        params: {
          'username': random,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to update a user', function (done) {
      dbHelpers.updateUser({
        params: {
          'username': random,
        },
        body: {
          'username': random2,
          'firstname': random,
          'lastname': random,
          'email': random,
          'avatarUrl': random
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to create a stream', function(done) {
      dbHelpers.addStream({
        body: {
          'classname': random,
          'access': random,
          'keywords': random,
          'instructorid': userId,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to search streams', function (done) {
      dbHelpers.searchStreams({
        params: {
          title: random,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to get a stream', function (done) {
      dbHelpers.getStream({
        params: {
          title: random,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to update a stream', function (done) {
      dbHelpers.updateStream({
        params: {
          title: random,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to delete a stream', function (done) {
      dbHelpers.deleteClass({
        params: {
          title: random,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });
  });
}
