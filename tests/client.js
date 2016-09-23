var chai = require('chai');
var sinon = require('sinon');
var jsdom = require('jsdom');
var expect = chai.expect;
var should = chai.should;
var bundle;


var doc = jsdom.jsdom('<!doctype html><html><body><div id="app"></div></body></html>');
var win = doc.defaultView;
global.document = doc;
global.window = win;
var propagateToGlobal = function (window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key)) {
      if (key in global) {
        global[key] = window[key];
      }
    }
  }
};
propagateToGlobal(win);


describe('Client tests', function () {
  describe('Landing page', function () {
    before(function () {

      bundle = require('../client/bundled/bundle.js');
    });

    it('should contain an "app" div', function () {
      expect(!!document.getElementById('app')).to.equal(true);
    });
  });
});









