var chai = require('chai');
var sinon = require('sinon');
var request = require('supertest');
var app = require('../server/config/app-config.js');

var expect = chai.expect;
var should = chai.should;

describe('Server', function () {

  it('should have a "/users/login" endpoint', function (done) {
    request(app).get('/users/login', function (err, resp, body) {
      expect(!!err).to.equal(false);
      done();
    });
  });

  it('should have a "/users/signup" endpoint', function (done) {
    request(app).get('/users/signup', function (err, resp, body) {
      expect(!!err).to.equal(false);
      done();
    });
  });
});










