var chai = require('chai');
var sinon = require('sinon');
var jsdom = require('jsdom');

var should = chai.should;
var expect = chai.expect;

describe('Example tests', function () {

  it('should pass for truthy values', function () {
    expect(true).to.equal(!!1);
  });
});

describe('jsDOM', function () {
  it('should grab a window, given a url', function () {
    jsdom.env({
      url: 'http://www.google.com',
      scripts: ["http://code.jquery.com/jquery.js"],
      done: function (errors, window) {
        expect(!!errors).to.equal(false);
        expect(!!window).to.equal(true);
      }
    });
  });
});