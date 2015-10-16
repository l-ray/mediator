/* jshint expr:true */
import { expect } from 'chai';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'controller:groupsets',
  'GroupsetsController',
  {
    // Specify the other units that are required for this test.
    needs: [
      'model:source',
      'model:connection',
      'model:result',
      'model:picture',
      'model:link',
      'model:groupset',
      'model:group'
    ]
  },
  function() {
    // Replace this with your real tests.
    it('returns dates sorted', function() {
      var controller = this.subject();

      var store = controller.get('store');

      var testDates =  ["2015-04-04","2015-04-03","2015-04-01"];

      testDates = testDates
                    .map(f => store.createRecord('groupset', {"date": new Date(f)}));

      controller.set('content',testDates.toArray());

      let sortedArray = controller.get('sortedGroupsets').toArray();
      for (var i=0; i < sortedArray.length-1; i++) {
        expect(sortedArray[i].get('date')).to.be.a('date').and.below(sortedArray[i+1].get('date'));
      }

      controller.get('content').pushObject(
        store.createRecord('groupset', {"date": new Date("2015-04-02")})
      );

      for (i=0; i < sortedArray.length-1; i++) {
        expect(sortedArray[i].get('date')).to.be.a('date').and.below(sortedArray[i+1].get('date'));
      }

    });
  }
);
