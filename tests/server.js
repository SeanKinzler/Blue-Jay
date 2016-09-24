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
        .send({
          username: 'steve',
          password: 'steveIsCool'
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "POST => /users/signup" endpoint', function (done) {
      request(app)
        .post('/users/signup')
        .send({
          username: 'steve',
          password: 'steveIsCool'
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });
  });
});










