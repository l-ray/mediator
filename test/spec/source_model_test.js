/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Source (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:source', Mediator.Source);
            container.register('model:connection', Mediator.Connection);
            store = Mediator.Store.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe('initialize like expected', function () {
          it('should return the given parameters correctly', function(){
              Ember.run( function() {

                  var oItem = store.createRecord('source',{name:"myName"});

                  expect(oItem.get("name")).to.be.equal("myName");
                  expect(oItem.get("priority")).to.be.equal(0);
                  expect(oItem.get("lastMoved")).to.be.equal(0);
                  // expect(oItem.get("additional")).to.be.false();

              })
          })
           })
    });
})();

/*
 describe('should handle new connections correctly', function () {

 with (this) {
 expect(0,oItem.size(),"Array zu beginn leer");
 var oConnection = new Connection();
 oItem.push(oConnection);
 expect(1,oItem.size(),"Array später befüllt um 1");
 assert(oItem.toArray()[0] == oConnection);

 }},

 testGetByDate:function() {with (this) {
 var oConnection = new Connection();
 var myDate= new Date();
 oConnection.setStartDate(myDate);
 oItem.push(oConnection);

 assertInstanceOf(Connection,oItem.getByDate(myDate),"gefundenes Item vom richtigen Typ");
 assertEqual(oConnection,oItem.getByDate(myDate),"korrektes Item wird gefunden");

 var oConnection2 = new Connection();
 oConnection2.setStartDate(new Date(5));
 oItem.push(oConnection2);

 assertInstanceOf(Connection,oItem.getByDate(myDate),"gefundenes Item vom richtigen Typ");
 assertEqual(oConnection,oItem.getByDate(myDate),"korrektes Item wird gefunden");
 assertEqual(undefined,oItem.getByDate(new Date(1234597856461)),"inkorrektes Item nicht gefunden");

 }},

 testSetActive: function() {
 with (this) {
 oItem.setActive(true);
 assert(oItem.isActive());
 oItem.setActive(false)
 assert(!oItem.isActive());
 oItem.setActive(true);
 assert(oItem.isActive());
 }
 },

 testSetName: function() {
 with (this) {
 oItem.setName("test");
 assertEqual("test",oItem.getName());
 }
 },

 testSetURL: function() {
 with (this) {
 oItem.setURL("http://test.de");
 assertEqual("http://test.de",oItem.getURL());
 }
 },

 testSetId: function() {
 with (this) {
 oItem.setId("myId");
 assertEqual("myId",oItem.getId());
 }
 },

 testSetIcon: function() {
 with (this) {
 oItem.setIcon("http://web.de/favicon.ico");
 assertEqual("http://web.de/favicon.ico",oItem.getIcon());
 }
 },

 testPriority:function() {
 with (this) {
 }
 },

 testAdditional: function() {
 with (this) {
 }
 },


 });
 }); */

/*

 // Run before each test case.
 beforeEach(function () {
 // Put the application into a known state, and destroy the defaultStore.
 // Be careful about DS.Model instances stored in App; they'll be invalid
 // after this.
 // This is broken in some versions of Ember and Ember Data, see:
 // https://github.com/emberjs/data/issues/847
 Ember.run(function () { App.reset(); });
 // Display an error if asynchronous operations are queued outside of
 // Ember.run.  You need this if you want to stay sane.
 Ember.testing = true;
 });

 // Run after each test case.
 afterEach(function () {
 Ember.testing = false;
 });

 describe("App.Employee", function () {
 it("has a name", function () {
 var jane;
 Ember.run(function () {
 // Won't actually load until the end of the run-block.
 jane = App.Employee.find(1);
 });
 jane.get("name").should.equal("Jane Q. Public");
 });
 });

 */