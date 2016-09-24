var chai = require('chai');
var sinon = require('sinon');

var should = chai.should;
var expect = chai.expect;
var assert = chai.assert;

var Sequelize = require('sequelize');
var db = require('../server/db/db');
var User = require('../server/db/userModel');
var Class = require('../server/db/classModel');
describe('DB init tests', function () {

  it('is connected to the db', function(done) {
    db.authenticate().then(function(err) {
      assert(true, true, 'db connect success');
      done();
    }).catch(function(err) {
      assert(false, true, 'db connect failed');
    });
  });

  it('should add a user', function (done) {
    User.create({username: 'test', password: 'testpass'})
    .then(function() {
      User.findOne({
        where: {username: 'test'}
      })
      .then(function(user) {
        expect(user.password).to.equal('testpass')
        user.destroy();
        done()
      });
    });
  });

  it('should add a classroom', function(done) {
    Class.create({classname: 'testclass'})
    .then(function() {
      Class.findOne({
        where: {classname: 'testclass'}
      })
      .then(function(classroom) {
        expect(classroom.classname).to.equal('testclass');
        classroom.destroy();
        done();
      });
    });
  });
});