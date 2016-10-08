if (!process.env.TRAVIS_PULL_REQUEST) {
  var chai = require('chai');
  var sinon = require('sinon');

  var should = chai.should;
  var expect = chai.expect;
  var assert = chai.assert;

  var sql = require('../server/db/sqlConnectionHelper.js');
  var dbHelpers = require('../server/db/rawSQLHandlers.js');

  describe('Database', function () {
    var random = Math.random() + '';
    var random2 = Math.random() + '';
    var userId = 1;
    var streamId = 1;

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

    it('should be able to find all users', function (done) {
      dbHelpers.getUsers({}, {
        send: function (input) {
          userId = input[input.length - 1].id || input.id;
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to find a user', function (done) {
      dbHelpers.getUser({
        body: {
          'id': userId
        }
      }, {
        send: function (input) {
          userId = input.id;
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to update a user', function (done) {
      dbHelpers.updateUser({
        body: {
          'id': userId,
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
          'title': random,
          'online': 'false',
          'id': userId,
          'subscriberCount': 0,
          'categories': ['testCat'],
          'keywords': ['testKey']
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
          
        },
        body: {
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          streamId = input[input.length - 1].id || input.id
          done();
        }
      });
    });

    it('should be able to get a stream', function (done) {
      dbHelpers.getStream({
        body: {
          id: streamId,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          var streamId = input[0].id || input.id;
          done();
        }
      });
    });

    it('should be able to update a stream', function (done) {
      dbHelpers.updateStream({
        body: {
          id: streamId,
          online: 'true',
          description: random,
          subscriberCount: 5
        },
        categories: ['testCat2'],
        keywords: ['testKey2']
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to add a subscription', function (done) {
      dbHelpers.addSubscription({
        body: {
          streamId: streamId,
          userId: userId
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      })
    });

    it('should be able to remove a subscription', function (done) {
      dbHelpers.addSubscription({ 
        body: {
          userId: userId,
          streamId: streamId
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      })
    });

    it('should be able to delete a user', function (done) {
      dbHelpers.deleteUser({
        params: {
          'username': random2,
        }
      }, {
        send: function (input) {
          expect(input).to.not.equal(404);
          done();
        }
      });
    });

    it('should be able to delete a stream', function (done) {
      dbHelpers.deleteStream({
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
