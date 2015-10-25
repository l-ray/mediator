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
      done();
    },
    afterEach: function (done) {
      done();
    }
  },
  function () {

    it('exists', function () {
      var adapter = this.subject();
      expect(adapter).to.be.ok;
    });

     it("returns single groupset according the given type id via finder-method.", function (done) {

         Mediator.ApplicationStore = DS.Store.extend({
         adapter: DS.MochaAdapter
         });

       var store = withMockedConnectionsStore(this.container);

       var adapter = this.subject();
       adapter.findRecord(store, 'groupset', "2014-01-02").then(
         function (result) {
           expect(result).to.be.instanceOf(Object);
           expect(result.date).to.equal("2014-01-02");
           expect(result.connections).to.have.length(1);
           done();
         },
         function (error) {
           throw "promise returned error: " + error.message;
         });
     });

    it("returns array of groupsets via findAll-method.", function (done) {

      var adapter = this.subject();
      adapter.setCalendarProperties(new Date("2014-01-02"), 1, 3);

      adapter.findAll(withMockedConnectionsStore(this.container)).then(
        function (groupsets) {
          expect(groupsets,"calendar length").to.have.length(3);
          groupsets.forEach(function(gs,idx){
            expect(gs).to.be.instanceOf(Object);
            expect(gs.date).to.be.a('string').and.equal("2014-01-0"+(idx+1));
            expect(gs.connections).to.have.length(1);
          });
          done();
        },
        function (error) {
          throw "promise returned error: " + error.message;
        });

    });

    it("returns array of groupsets via query.", function () {

      var adapter = this.subject();
      var container = this.container;

      expect(function(){
          adapter.query(withMockedConnectionsStore(container),'groupset',{ });
        }
      ).to.throw(Ember.Error,/Assertion Failed/);

      expect(function(){
        adapter.query(withMockedConnectionsStore(container),'groupset',{
          startDate: new Date("2014-02-01")
        });}
      ).to.throw(Ember.Error,/Assertion Failed/);

      expect(function(){
        adapter.query(withMockedConnectionsStore(container),'groupset',{
          calendarSize: 3
        });}
      ).to.throw(Ember.Error,/Assertion Failed/);
    });

    it("returns array of groupsets via query.", function (done) {

      var adapter = this.subject();

      adapter.query(withMockedConnectionsStore(this.container),'groupset',{
          startDate: new Date("2014-02-01"),
          calendarSize: 3
      }).then(
        function (groupsets) {
          expect(groupsets,"calendar length").to.have.length(3);
          groupsets.forEach(function(gs,idx){
            expect(gs).to.be.instanceOf(Object);
            expect(gs.date).to.be.a('string').and.equal("2014-02-0"+(idx+1));
            expect(gs.connections).to.have.length(1);
          });
          done();
        },
        function (error) {
          throw "promise returned error: " + error.message;
        });

    });

    function withMockedConnectionsStore(container) {

      Mediator.ApplicationStore = DS.Store.extend({
        adapter: DS.MochaAdapter
      });

      return Mediator.ApplicationStore.create({
        container: container,

        query: function (type, options) {
          var store = this;
          return new Ember.RSVP.Promise(
            function (resolve) {
              resolve(Ember.ArrayProxy.create({
                  content: [
                    store.createRecord(type, {
                      startDate: new Date(Date.parse(options.startDate))
                    })],
                  objectAtContent: function (idx) {
                    return this.get('content').objectAt(idx);
                  }
                })
              );
            }
          );
        }
      });
    }

  });
