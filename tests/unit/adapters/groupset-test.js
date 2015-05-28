/* jshint expr:true */
import { expect } from 'chai';
import Ember from 'ember';
import Mediator from '../../../app';
import {
  describeModule,
  it,
  beforeEach,
  afterEach
} from 'ember-mocha';

describeModule(
  'adapter:groupset',
  'GroupSet Adapter',
  {
    // Specify the other units that are required for this test.
    needs: [
      'model:result',
      'model:source',
      'model:connection',
      'model:group',
      'model:groupset'
    ],
    beforeEach: function() { console.log("BEFORE-EACH");},
    afterEach: function() {console.log("AFTER_EACH");}
  },
  function() {

      it('exists', function() {
        var adapter = this.subject();
        expect(adapter).to.be.ok;
      });

/*
      it("returns single groupset according the given type id via finder-method.", function () {

            Mediator.ApplicationStore = DS.Store.extend({
              adapter: DS.MochaAdapter
            });

            var store = Mediator.ApplicationStore.create({
              container: this.container
            });

            // var model = store.createRecord('connection',{});
            var adapter = this.subject();
            adapter.find(store, undefined, "2014-01-01");
        });

      it("returns array of groupsets via findAll-method.", function () {

        Mediator.ApplicationStore = DS.Store.extend({
          adapter: DS.MochaAdapter
        });

        var store = Mediator.ApplicationStore.create({
          container: this.container
        });

        // var model = store.createRecord('connection',{});
        var adapter = this.subject();
        adapter.findAll(store, undefined);
      });
*/
    });
