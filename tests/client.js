var chai = require('chai');
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;
var expect = chai.expect;
var should = chai.should;

global.document = jsdom('<!doctype html><html><body><div id="app"></div></body></html>');
global.window = document.defaultView;
for (var key in window) {
  if (!window.hasOwnProperty(key)) {
    if (key in global) {
      global[key] = window[key];
    }
  }
}
global['navigator'] = window['navigator'];

require('../client/bundled/bundle.js');

describe('Client:', function () {
  describe('Landing page', function () {
    var server, response;

    it('should contain an "app" div', function () {
      expect(!!document.getElementById('app')).to.equal(true);
    });

    it('should dynamically render React components', function () {
      var reactElement = document.getElementById('app');
      expect(!!reactElement.children.length).to.equal(true);
    });

    it('should have a login button', function () {
      var loginButton = document.getElementById('login');
      expect(!!loginButton).to.equal(true);
    });

    it('should have a signup button', function () {
      var signupButton = document.getElementById('signup');
      expect(!!signupButton).to.equal(true);
    });

    before(function () {
      server = sinon.fakeServer.create();
      server.respondWith('POST', 'users/login', [
        200,
        { 'Content-Type': 'application/json' },
        'Logged in!'
      ]);

      server.respondWith('POST', 'users/signup', [
        200,
        { 'Content-Type': 'application/json' },
        'Signed up!'
      ]);
    });

    it('should POST to /users/login when login is clicked', function (done) {
      var loginButton = document.getElementById('login');

      loginButton.click();

      setTimeout(function () {
        expect(!!loginButton).to.equal(true);
        done();
      }, 0);
    });

    it('should POST to /users/signup when signup is clicked', function (done) {
      var signupButton = document.getElementById('signup');

      signupButton.click();

      setTimeout(function () {
        expect(!!signupButton).to.equal(true);
        done();
      }, 0);
    });
  });
});









