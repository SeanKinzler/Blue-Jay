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

    it('should have a "POST => /users/signup" endpoint', function (done) {
      request(app)
        .post('/users/signup')
        .send({
          "username":"test1",
          "password":"testpass",
          "firstName":"Sean",
          "lastName":"K",
          "email":"test1@test1.com"
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    })

    it('should have a "DELETE => /users/remove" endpoint', function (done) {
      request(app)
        .delete('/users/remove')
        .send({
          "username":"test1",
          "password":"testpass",
          "firstName":"Sean",
          "lastName":"K",
          "email":"test1@test1.com"
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    })

    it('should have a "POST => /classes/create" endpoint', function (done) {
      request(app)
        .post('/classes/create')
        .send({
          "classname":"testclass",
          "access":true,
          "keywords":"[one,two,three]",
          "scheduleDays":"MTuWThFSaSu",
          "scheduleTime":"1800"
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });

    it('should have a "DELETE => /classes/remove" endpoint', function (done) {
      request(app)
        .delete('/classes/remove')
        .send({
          "classname":"testclass",
          "access":true,
          "keywords":"[one,two,three]",
          "scheduleDays":"MTuWThFSaSu",
          "scheduleTime":"1800"
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    })

    xit('should have a "POST => /users/signup" endpoint', function (done) {
      request(app)
        .post('/users/signup')
        .send({
          "username":"test1",
          "password":"testpass",
          "firstName":"Sean",
          "lastName":"K",
          "email":"test1@test1.com"
        })
        .end(function (err, resp, body) {
          expect(!!resp).to.equal(true);
          done();
        });
    });
  });
});

