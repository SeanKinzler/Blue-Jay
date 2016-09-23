var chai = require('chai');
var sinon = require('sinon');

var should = chai.should;
var expect = chai.expect;

describe('Example tests', function () {

  it('should pass for truthy values', function () {
    expect(true).to.equal(!!1);
  });
});