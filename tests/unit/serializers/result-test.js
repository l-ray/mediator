/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'serializer:result',
  'Result Serializer',
  {
    needs: [
      'model:result',
      'model:picture'
    ]
  },
  function() {

    it('exists', function() {
      var serializer = this.subject();
      expect(serializer).to.be.ok;
    });

    it('convert a single picture on a result to a one element array of pictures and returns an empty array for empty source ', function(){
      var serializer = this.subject();

      Mediator.ApplicationStore = DS.Store.extend({
        adapter: DS.MochaAdapter
      });

      var store = Mediator.ApplicationStore.create({
        container: this.container
      });
      expect(
        serializer.extractArray(
          store,
          store.modelFor('result'),
          {"results":[]}
        )
      ).to.be.an.instanceOf(Array).and.have.lengthOf(0);
    });

});
