/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import makeUrlAbsolute from 'mediator/utils/make-url-absolute';

describe('makeUrlAbsolute', function() {
  // Replace this with your real tests.
  it('works', function() {
    var result = makeUrlAbsolute("one","two");
    expect(result).to.be.ok;
  });
});
