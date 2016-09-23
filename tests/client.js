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
bundle = require('../client/bundled/bundle.js');


describe('Client tests', function () {
  describe('Landing page', function () {
    it('should contain an "app" div', function () {
      expect(!!document.getElementById('app')).to.equal(true);
    });

    it('should dynamically render React components', function () {
      var reactElement = document.getElementById('app');
      expect(!!reactElement.children.length).to.equal(true);
    });
  });
});









