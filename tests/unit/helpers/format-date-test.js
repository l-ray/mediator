/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  formatDate
} from 'mediator/helpers/format-date';

describe('FormatDateHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    var result = formatDate(42);
    expect(result).to.be.ok;
  });

  it('returns correct relative date ', function() {
    expect(formatDate(new Date()),"as relative current date").to.be.equal("a few seconds ago");
    expect(formatDate(new Date(0)),"as relative date in the past").to.match(/years ago$/);

  });

  it('returns correct country pattern date ', function() {
    expect(formatDate(new Date(0),"dd"),"as day").to.equal("Th");
    expect(formatDate(new Date(0),"DD"),"as weekday").to.equal("01");
  });
});
