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

    it('should recognize day of the week correctly.', function(){

      var model = this.subject();

      model.set('date',undefined);
      expect(model.get('isSaturday'),"monday, not saturday").to.be.false;
      expect(model.get('isSunday'),"monday, not sunday").to.be.false;

      model.set('date',new Date(1980,10,29));
      expect(model.get('isSaturday'),"is a saturday").to.be.true;
      expect(model.get('isSunday'),"saturday ain't no sunday.").to.be.false;

      model.set('date',new Date(1980,10,30));
      expect(model.get('isSaturday'),"sunday ain't no saturday").to.be.false;
      expect(model.get('isSunday'),"is a sunday").to.be.true;

      model.set('date',new Date(1980,11,1));
      expect(model.get('isSaturday'),"monday, not saturday").to.be.false;
      expect(model.get('isSunday'),"monday, not sunday").to.be.false;

    });

    it('should recognize today correctly.', function(){

      var model = this.subject();
      var today = new Date();

      model.set('date',undefined);
      expect(model.get('isToday'),"for undefined").to.be.false;

      model.set('date',new Date(today.getUTCFullYear(),today.getUTCMonth(), today.getUTCDate()));
      expect(model.get('isToday'),"is today").to.be.true;

      model.set('date',new Date(today.getUTCFullYear(),today.getUTCMonth(), today.getUTCDate()-1));
      expect(model.get('isToday'),"is yesterday").to.be.false;

      model.set('date',new Date(today.getUTCFullYear(),today.getUTCMonth(), today.getUTCDate()+1));
      expect(model.get('isToday'),"is tomoroow").to.be.false;

    });

});
