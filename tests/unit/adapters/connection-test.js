/* jshint expr:true */
import { expect,assert } from 'chai';
import Ember from 'ember';
import sinon from 'sinon';
import Mediator from '../../../app';
// import SourceModel from '../../../app/models/source.js';
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

    it("returns list of connections for the given start date holding correct sources.", function (done) {

      var store = {
        createRecord : function(type, content) {
           if (type === "connection") {
             return Ember.Object.create(content);
           } else {
             throw "unknown type";
           }
         },
        findAll : function() {
        return new Ember.RSVP.Promise(
          function (resolve) {
            resolve(Ember.ArrayProxy.create({
                content: [
                  Ember.Object.create({
                    "id": "1", "name": "bar", "url": "http://bar.de/",
                    "icon": "http://bar.de/ico/favicon.ico",
                    "additional": "true", "priority": "100", "active": "true",
                    "connections":new Ember.RSVP.Promise(function (r) {r(new Ember.A());})}),
                  Ember.Object.create({
                    "id": "2", "name": "foo", "url": "http://salsa.ie/",
                    "icon": "http://salsa.ie/favicon.ico",
                    "additional": "false", "priority": "100", "active": "true",
                    "connections":new Ember.RSVP.Promise(function (r) {r(new Ember.A());})})
                ],
                objectAtContent: function (idx) {
                  return this.get('content').objectAt(idx);
                }
              })
            );
          });
        }
      };

      var adapter = this.subject();

      adapter.query(store, 'connection', {startDate:"2014-01-02"}).then(
        function (result) {

          expect(result).to.be.ok;
          expect(result).to.have.a.property('connections').that.is.an('array');
          expect(result.connections).to.have.length(2);
          result.connections.forEach(function(c){
            expect(c).to.have.a.property("startDate").that.be.a('date');
            expect(c.startDate.toISOString()).to.contain("2014-01-02");
            expect(c).to.have.a.property("source").that.be.not.empty;
            expect(c).to.have.a.property("links").that.have.a.property("results");
            expect(c.links.results).to.be.a("string").and.be.not.empty;
          });

          done();
        },
        function (error) {
          throw "promise returned error: " + error.message;
        });
    });

    it("reloads lazy results payload correctly by adding group object.", function (done) {

      var store = {
        findHasMany: function() {
          return new Ember.RSVP.Promise(
            function(resolve){
              resolve(
                { "results" :
                  Ember.ArrayProxy.create({
                    content: [
                      Ember.Object.create({
                        "id": "s1-3", "start": "2014-05-15",
                        "end": "2014-05-15", "title": "foo",
                        "subtitle": "foo", "abstract": "foo",
                        "description": "foo", "price": "50",
                        "url": "foo", "location": "foo-woanders",
                        "categories": "block,floete,punk,rock,folk"
                      }),
                      Ember.Object.create({
                        "id": "s1-4", "start": "2014-05-15",
                        "end": "2014-05-15", "title": "bar",
                        "subtitle": "bar", "abstract": "bar",
                        "description": "bar","price": "700",
                        "url": "bar", "connection": "1-2014-05-15",
                        "categories": "folk,punk", "location": "bar-testlocation"
                      })
                    ],
                    objectAtContent: function (idx) {
                      return this.get('content').objectAt(idx);
                    }
                  })
                }
              );
          });
        },
        push: function(data) {
          expect(data,"JSON data object").to.have.property('data').and.to.have.a.deep.property("type","group");
        }
      };
      var adapter = this.subject();
      adapter.reopen({
        _super:store.findHasMany
      });
      var snapshot = {
        belongsTo: function(){
          return "12345";
        }
      };
      var relationship = {type:"result"};
      var url = "result";
      adapter.findHasMany(store, snapshot, url, relationship)
        .then(
        function (n) {
          expect(n).to.have.property("results");
          expect(n.results.toArray()).to.have.length(2);
          n.results.toArray().forEach(function(item) {
            console.log("item group"+item+ " holding "+item.group);
            expect(item.group).to.be.ok;
          });
          done();
        });

    });
  }
);
