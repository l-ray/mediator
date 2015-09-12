/* jshint expr:true */
import { expect } from 'chai';
import Ember from 'ember';

import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'adapter:source',
  'SourceAdapter',
  {
    // Specify the other units that are required for this test.
    needs: ['model:source']
  },
  function() {
    it('returns the same promise when called several times', function() {
      var adapter = this.subject();
      adapter.reopen({
        _super:function() {
            return new Ember.RSVP.Promise(
              function(resolve){
                setTimeout(function() {resolve([]);},2000);
              });
          }
      });
      expect(
        adapter.findAll('source'),
        "identical promise when called shortly after another"
      ).to.equal(adapter.findAll('source'));
    });
  }

);
