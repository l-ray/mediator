/* jshint expr:true */
import { expect } from 'chai';
import Ember from 'ember';
import {
  describe,
  it
} from 'mocha';
import makeUrlAbsolute from 'mediator/utils/make-url-absolute';

describe('makeUrlAbsolute', function() {

  var TestObject = Ember.Object.extend({
    baseUrl : 'http://t.do',
    theValue: '/image.jpg',
    absolutePath : makeUrlAbsolute('theValue','baseUrl')
  });

  it('combines base and url for non absolute urls.', function() {
    var _underTest = TestObject.create();
    expect(_underTest.get('absolutePath')).to.be.equal("http://t.do/image.jpg");
  });

  it('also corrects missing slash.', function() {
    var _underTest = TestObject.create();
    _underTest.set('baseUrl', 'http://t.do');
    _underTest.set('theValue','image.jpg');
    expect(_underTest.get('absolutePath')).to.be.equal("http://t.do/image.jpg");
  });

  it('also reduces double slash.', function() {
    var _underTest = TestObject.create();
    _underTest.set('baseUrl', 'http://t.do/');
    _underTest.set('theValue','/image.jpg');
    expect(_underTest.get('absolutePath')).to.be.equal("http://t.do/image.jpg");
  });

  it('keeps absolute value non-ssl untouched.', function() {
    var _underTest = TestObject.create();
    var _tstAbsolute = 'http://test.me/image.jpg';
    _underTest.set('theValue',_tstAbsolute);
    expect(_underTest.get('absolutePath')).to.be.equal(_tstAbsolute);
  });

  it('keeps absolute value ssl untouched.', function() {
    var _underTest = TestObject.create();
    var _tstAbsolute = 'https://test.me/image.jpg';
    _underTest.set('theValue',_tstAbsolute);
    expect(_underTest.get('absolutePath')).to.be.equal(_tstAbsolute);
  });

});
