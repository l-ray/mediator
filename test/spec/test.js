/*global describe, it */
'use strict';
(function () {
    describe('Give it some context', function () {
        describe('maybe a bit more context here', function () {
            it('should hold levenshtein', function () {
                expect(window.smLevenshtein).to.not.be.an('undefined');
            });
            it('should hold qgram', function () {
                expect(window.smQGram).to.not.be.an('undefined');
            });
            it('should hold smithWaterman', function () {
                expect(window.smSmithWaterman).to.not.be.an('undefined');
            });
            it('should hold longest substring', function () {
                expect(window.smLongestSubstring).to.not.be.an('undefined');
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