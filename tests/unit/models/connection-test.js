/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'connection',
  'Connection',
  {
  needs: [
    'model:source',
    'model:groupset',
    'model:result',
    'model:group',
    'model:picture',
    'model:link'
    ]

  },
  function() {
        'use strict';

    it('exists', function() {
      var model = this.subject();
      // var store = this.store();
      expect(model).to.be.ok;
    });

          it('should allow to add results', function(){
             var store = this.store();

              var item = store.createRecord('connection',{});
              assert.isUndefined(item.get("lastObject"));
              assert.isUndefined(item.get("firstObject"));

              item.get('results').then(function(n) {

                  var currentLength = n.get('length');
                  n.pushObject(store.createRecord('result'));
                  item.enumerableContentDidChange();
                  expect(item.get('length')).to.be.equal(currentLength + 1);
                  expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
              });

          });

          it('should give correct result set size', function(){

                var store = this.store();
                var item = store.createRecord('connection',{});
                // expect(item.get("length")).to.be.zero;

                var firstResult = store.createRecord('result',{connection:item});
                item.get('results').then(function(n) {
                    n.pushObject(firstResult);
                    item.enumerableContentDidChange();
                   // expect(item.get('length')).to.be.one;
                });
            });

            it('should provide a name and url attribute', function(){
                //Ember.run( function() {
                    var store = this.store();
                    var item = store.createRecord('connection',{});
                    expect(item.get("name")).to.be.not.undefined;
                    expect(item.get("name")).to.be.null;
                    expect(item.get("sourceUrl")).to.be.not.undefined;
                    expect(item.get("sourceUrl")).to.be.null;

                    item.set('source',store.createRecord('source',{name:'testSource', url:'http://web.de'}));
                    expect(item.get("name")).to.be.a('string').and.equal('testSource');
                    expect(item.get("sourceUrl")).to.be.a('string').and.equal('http://web.de');
                //})
            });

});
