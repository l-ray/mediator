/* jshint expr:true */
import { expect,assert } from 'chai';
import Ember from 'ember';
import Mediator from '../../../app';
import {
  describeModule,
  it
} from 'ember-mocha';

describeModule(
  'adapter:connection',
  'ConnectionAdapter',
  {
    needs: [
      'model:result',
      'model:source',
      'model:connection',
      'model:group',
      'model:groupset',
      'model:picture',
      'model:link'
    ]
  },
  function() {

    it('exists', function() {
      var adapter = this.subject();
      expect(adapter).to.be.ok;
    });

    it.skip("returns list of connections for the given start date holding correct sources.", function () {

        Mediator.ApplicationStore = DS.Store.extend({
          adapter: DS.MochaAdapter
        });

        var store = Mediator.ApplicationStore.create({
          container: this.container,

          findAll: function (type) {
            if (type === "source") {
              console.log("asking for a source");
              var store = this;
              return new Ember.RSVP.Promise(
                function(resolve){
                  resolve(Ember.ArrayProxy.create({
                    content: [
                      store.createRecord(type, {
                        "id": "1", "name": "bar", "url": "http://bar.de/",
                        "icon": "http://bar.de/ico/favicon.ico",
                        "additional": "true", "priority": "100", "active": "true"
                      }),
                      store.createRecord(type, {
                        "id": "2", "name": "foo", "url": "http://salsa.ie/",
                        "icon": "http://salsa.ie/favicon.ico",
                        "additional": "false", "priority": "100", "active": "true"
                      })
                    ],
                    objectAtContent: function (idx) {
                      return this.get('content').objectAt(idx);
                    }
                  })
                );
              });
            } else throw "mock store does not support "+type;
          }
        });
      var adapter = this.subject();

      adapter.query(store, 'connection', {startDate:"2014-01-02"}).then(
        function (result) {
          expect(result).to.be.ok;
          expect(result).to.have.a.property('connections').that.is.an('array');
          expect(result.connections).to.have.length(2);
          result.connections.forEach(function(c){
            expect(c).to.have.a.property("source").that.be.instanceOf(DS.Model);
            expect(c).to.have.a.property("startDate").that.be.a('date');
            expect(c.startDate.toISOString()).to.contain("2014-01-02");
            expect(c).to.have.a.property("links").that.have.a.property("results");
            expect(c.links.results).to.be.a("string").and.be.not.empty;
          });
        },
        function (error) {
          throw "promise returned error: " + error.message;
        });
    });

    it.skip("reloads lazy results payload correctly by adding group object.", function () {

      Mediator.ApplicationStore = DS.Store.extend({
        adapter: DS.MochaAdapter
      });

      var store = Mediator.ApplicationStore.create({
        container: this.container,

        findHasMany: function(store) {
            return new Ember.RSVP.Promise(
              function(resolve){
                resolve(
                  Ember.ArrayProxy.create({
                    content: [
                      store.createRecord("result", {
                        "id": "1", "name": "bar", "url": "http://bar.de/",
                        "icon": "http://bar.de/ico/favicon.ico",
                        "additional": "true", "priority": "100", "active": "true"
                      }),
                      store.createRecord("result", {
                        "id": "2", "name": "foo", "url": "http://salsa.ie/",
                        "icon": "http://salsa.ie/favicon.ico",
                        "additional": "false", "priority": "100", "active": "true"
                      })
                    ],
                    objectAtContent: function (idx) {
                      return this.get('content').objectAt(idx);
                    }
                  })
                );
              });
        }
      });
      var adapter = this.subject();
      var snapshot = {
        belongsTo: function(){
          console.log("IN THE BELONGS TO FUNCTION");
          return "12345";
        }
      };
      var relationship = {type:"mediator@model:result:"};
      var url = "whatever";
      adapter.findHasMany(store, snapshot, url, relationship)
        .then(
        function (n) {
          console.log("IN THE N FUNCTION");
          expect(n).to.have.length(4);
          n.forEach(function(item) {
            expect(item.group).to.be.ok;
          });
        });

    });
  }
);
