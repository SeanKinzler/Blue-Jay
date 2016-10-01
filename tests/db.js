if (!process.env.TRAVIS_PULL_REQUEST) {

  var User = require('../server/db/userModel');
  var Class = require('../server/db/classModel');
  require('../server/db/user_classModel');
  var Schedule = require('../server/db/scheduleModel')
  var chai = require('chai');
  var sinon = require('sinon');

  var should = chai.should;
  var expect = chai.expect;
  var assert = chai.assert;

  var Sequelize = require('sequelize');
  var db = require('../server/db/db');

  //{ force: true }
  // db.sync({ force: true });
  describe('Database', function () {

    it('should have access to the environment variables', function () {
      expect(process.env.DBHOST).to.not.equal(undefined);
      expect(process.env.DBPORT).to.not.equal(undefined);
      expect(process.env.DBPASSWORD).to.not.equal(undefined);
    });

    it('should be accessible', function(done) {
      db.authenticate().then(function(err) {
        assert(true, true, 'db connect success');
        done();
      }).catch(function(err) {
        assert(false, true, 'db connect failed');
        done();
      });
    });

    it('should add a user', function (done) {
      User.findOne({
        where: {username: 'test'}
      })
      .then(function(user) {
        if (user) {
          user.destroy();
        }
      });

      User.create({username: 'test', password: 'testpass'})
      .then(function() {
        console.log('user created');
        User.findOne({
          where: {username: 'test'}
        })
        .then(function(user) {
          expect(user.password).to.equal('testpass');
          user.destroy();
          done();
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

    it ('should join users and classrooms', function(done) {
      User.create({username: 'test', password: 'testpass'})
      .then(function() {
        User.findOne({where: {username: 'test'}})
        .then(function(user) {
          Class.create({classname: 'testclass'})
          .then(function() {
            Class.findOne({where: {classname: 'testclass'}})
            .then(function(classroom) {
              classroom.setInstructor(user);
              console.log(user.prototype);
              user.addClass(classroom)
              .then(function() {
                classroom.getUsers()
                .then(function(joinUser) {
                  expect(joinUser[0].username).to.equal('test');
                  expect(joinUser[0].password).to.equal('testpass');
                  user.destroy();
                  classroom.destroy();
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  // it ('should have schedules', function(done) {
  //   User.create({username: 'test2', password: 'testpass'}).then(function(user) {
  //     Class.create({classname: 'testclass2'}).then(function(classroom) {
  //       Schedule.create({
  //         dayOfWeek: 0, 
  //         startTime: '1500', 
  //         endTime: '1600'
  //       }).then(function (sched) {
  //         classroom.addUser(user)
  //         classroom.setSchedule(sched).then(function() {
  //           classroom.getSchedule().then(function(testSched) {
  //             expect(testSched.dayOfWeek).to.equal(0);
  //             user.destroy();
  //             sched.destroy();
  //             classroom.destroy();
  //             done();
  //           })
  //         })
  //       })
  //     })
  //   })
  // })

}
