/* jshint expr:true */
import Mediator from '../../../app';
import { expect, assert } from 'chai';
import {
  describeModel,
  it
} from 'ember-mocha';

describeModel(
  'result',
  'Result Model',
  {
  needs: [
    'model:source',
    'model:connection',
    'model:group',
    'model:groupset',
    'model:picture',
    'model:link'
    ]

  },
  function() {
        'use strict';

             it('initially shows empty categories', function(){
               var store = this.store();
                    var item = store.createRecord('result',{});
                    expect(item.get("categories")).to.be.empty;
                });

            it('fills categories', function(){
              var store = this.store();
                    var item = store.createRecord('result',{'categories':'pop,rock,etc'});
                    expect(item.get("categories")).not.to.be.empty;
            });

            it('initially ', function(){
              var store = this.store();
                    var item = store.createRecord('result',{});
                    expect(item.get("sourceName")).to.be.empty;
            });

            it('filled connection', function(){
              var store = this.store();
                    var item = store.createRecord(
                        'result',{
                            'connection':store.createRecord('connection', {
                                'source' : store.createRecord('source',{'name':'lilaSource'})
                            })
                        });
                    expect(item.get("sourceName")).not.to.be.empty;
                    expect(item.get("sourceName")).to.equal('lilaSource');
            });

            it('should on standard return', function(){
              var store = this.store();
                  var item = store.createRecord('result',{});
                  expect(item.get("priority")).to.be.equal(0);
            });

            it('should on price-only return', function(){
              var store = this.store();
                    var item = store.createRecord('result',{'price' : "fifty-something"});
                    expect(item.get("priority")).to.be.equal(50);
            });

            it('should on picture list only return', function(){
              var store = this.store();
                    var pic = store.createRecord('picture',{});
                    var item = store.createRecord('result');
                    item.get('pictures').pushObject(pic);
                    expect(item.get("priority")).to.be.equal(100);
            });
    });
