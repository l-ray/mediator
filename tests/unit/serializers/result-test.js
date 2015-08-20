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
      'model:picture',
      'model:connection',
      'model:group',
      'model:link',
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
        serializer.normalizeArrayResponse(
          store,
          store.modelFor('result'),
          {"results":[]}
        ).data,
        " a normalized array response of an empty array"
      ).to.be.an.instanceOf(Array).and.have.lengthOf(0);

      expect(
        serializer.normalizeArrayResponse(
          store,
          store.modelFor('result'),
          {"results":{}}
        ).data,
        " a normalized array response of an empty object"
      ).to.be.an.instanceOf(Array).and.have.lengthOf(1);
      expect(
        serializer.normalizeArrayResponse(
          store,
          store.modelFor('result'),
          {"results":[{},{}]}
        ).data,
        "a normalized array response of an array with two empty objects"
      ).to.be.an.instanceOf(Array).and.have.lengthOf(2);
    });

});
