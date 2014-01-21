/*global describe, it */
'use strict';
(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should run here few assertions', function () {
                expect(window.smLevenshtein).to.not.be.undefined;
                expect(window.smQGram).to.not.be.undefined;
                expect(window.smSmithWaterman).to.not.be.undefined;
            });
        });
    });
})();


/*
 describe('Enumeration of results correctly', function () {
 it('should add a new connection correctly', function(){
 Ember.run( function() {
 var item = store.createRecord('result',{});
 expect(item.get("priority")).to.be.equal(0);
 })
 });
 });

 */