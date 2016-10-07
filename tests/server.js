var chai = require('chai');
var sinon = require('sinon');
var request = require('supertest');
var app = require('../server/config/app-config.js');
var expect = chai.expect;
var should = chai.should;

describe('Server:', function () {

  describe('Endpoints', function () {

    it('should have a "POST => /users/login" endpoint', function (done) {
      request(app)
        .post('/users/login')
        .send({})
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "POST => /api/users" endpoint', function (done) {
      request(app)
        .post('/api/users')
        .send({
          'username': 'test1',
          'password': 'testpass',
          'firstName': 'Sean',
          'lastName': 'K',
          'email': 'test1@test1.com'
        })
        .end(function (err, resp, body) {
          console.log('resp: ', err);
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "GET => /api/users" endpoint', function (done) {
      request(app)
        .get('/api/users')
        .send({})
        .end(function (err, resp, body) {
          console.log('resp: ', err);
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "POST => /api/streams" endpoint', function (done) {
      request(app)
        .post('/api/streams')
        .send({
          'title': 'testclass',
          'online': 'true',
          'subscriberCount': 0,
          'creatorId': 1,
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "DELETE => /api/streams/" endpoint', function (done) {
      request(app)
        .delete('/api/streams')
        .send({
          'title': 'testclass',
          'online': 'true',
          'subscriberCount': 0,
          'creatorId': 1,
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "DELETE => /api/users" endpoint', function (done) {
      request(app)
        .delete('/api/users')
        .send({
          'username': 'test1',
          'password': 'testpass',
          'firstName': 'Sean',
          'lastName': 'K',
          'email': 'test1@test1.com'
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "POST => /api/users" endpoint', function (done) {
      request(app)
        .post('/api/users')
        .send({
          'username': 'test1',
          'password': 'testpass',
          'firstName': 'Sean',
          'lastName': 'K',
          'email': 'test1@test1.com'
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });
  });
});

