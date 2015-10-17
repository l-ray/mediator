/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  formatDate
} from 'mediator/helpers/format-date';

const CONST_TEST_DATE = new Date(1970,0,1);

describe('FormatDateHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    var result = formatDate(42);
    expect(result).to.be.ok;
  });

  it('returns correct relative date ', function() {
    expect(formatDate([new Date()]),"as relative current date").to.be.equal("a few seconds ago");
    expect(formatDate([CONST_TEST_DATE]),"as relative date in the past").to.match(/years ago$/);

  });

  it('returns correct country pattern date ', function() {
    expect(formatDate([CONST_TEST_DATE,"dd"]),"as day").to.equal("Th");
    expect(formatDate([CONST_TEST_DATE,"DD"]),"as weekday").to.equal("01");
  });
});
