/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'groupset',
  'Group-Set',
  {
  needs: [
    'model:source',
    'model:connection',
    'model:result',
    'model:group',
    'model:picture',
    'model:link'
    ]

  },
  function() {
        'use strict';

            it('should allow to add results', function(){
              var store = this.store();
                    var item = store.createRecord('groupset',{});

                    expect(item).to.be.an.instanceOf(DS.Model);
                    expect(item.get("lastObject")).to.be.an('undefined');
                    expect(item.get("firstObject")).to.be.an('undefined');

                    var groups = item.get('groups');
                    groups.pushObject(store.createRecord('group'));
                    item.enumerableContentDidChange();
                    expect(item.get('lastObject')).to.be.not.an('undefined');
                    expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
            });
            it('should give correct result set size', function(){
              var store = this.store();

                    var item = store.createRecord('groupset',{});
                    expect(item).to.be.an.instanceOf(DS.Model);
                    assert.lengthOf(item.toArray(),0);

                    var firstResult = store.createRecord('group',{});
                    var groups = item.get('groups');
                    groups.pushObject(firstResult);

                    item.enumerableContentDidChange();

                    assert.lengthOf(item.toArray(),1);

            });

});
