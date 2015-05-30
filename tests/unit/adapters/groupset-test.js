/* jshint expr:true */
import { expect, assert } from 'chai';
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
      'model:groupset',
      'model:picture',
      'model:link'
    ],
    beforeEach: function (done) {
      console.log("BEFORE-EACH");
      done();
    },
    afterEach: function (done) {
      console.log("AFTER_EACH");
      done();
    }
  },
  function () {

    it('exists', function () {
      var adapter = this.subject();
      expect(adapter).to.be.ok;
    });


     it("returns single groupset according the given type id via finder-method.", function () {

         Mediator.ApplicationStore = DS.Store.extend({
         adapter: DS.MochaAdapter
         });

       var store = Mediator.ApplicationStore.create({
         container: this.container,

         find: function (type, options) {
           return Ember.ArrayProxy.create({
             content: [
               this.createRecord(type, {
                 startDate: new Date(Date.parse(options.startDate))
               })],
             objectAtContent: function (idx) {
               return this.get('content').objectAt(idx);
             }
           });
         }
       });

         var adapter = this.subject();

         adapter.find(store, 'groupset', "2014-01-02").then(
           function (result) {
             expect(result).to.be.instanceOf(Object);
             expect(result.date).to.equal("2014-01-02");
             expect(result.connections).to.have.length(1);
           },
           function (error) {
             throw "promise returned error: " + error.message;
           });
     });

    it("returns array of groupsets via findAll-method.", function () {

      Mediator.ApplicationStore = DS.Store.extend({
        adapter: DS.MochaAdapter
      });

      var store = Mediator.ApplicationStore.create({
        container: this.container,

        find: function (type, options) {
          return Ember.ArrayProxy.create({
            content: [
              this.createRecord(type, {
                startDate: new Date(Date.parse(options.startDate))
              })],
            objectAtContent: function (idx) {
              return this.get('content').objectAt(idx);
            }
          });
        }
      });

      // var model = store.createRecord('connection',{});
      var adapter = this.subject();
      adapter.TODAY = new Date("2014-01-02");
      adapter.DAYS_INTO_THE_PAST = 1;
      adapter.CALENDAR_SIZE = 3;

      adapter.findAll(store).then(
        function (results) {
          assert.lengthOf(results,3,"calendar length");
          results.forEach(function(result,idx){
            expect(result).to.be.instanceOf(Object);
            expect(result.date).to.be.a('string').and.equal("2014-01-0"+(idx+1));
            expect(result.connections).to.have.length(1);
          });
        },
        function (error) {
          throw "promise returned error: " + error.message;
        });

    });

  });
