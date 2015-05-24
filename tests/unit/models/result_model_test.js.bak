/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Result (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.ApplicationStore = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:result', Mediator.Result);
            container.register('model:connection', Mediator.Connection);
            container.register('model:source', Mediator.Source);
            container.register('model:picture', Mediator.Picture);
            container.register('model:link', Mediator.Link);
            container.register('model:group', Mediator.Group);
            container.register('model:groupset', Mediator.Groupset);

            store = Mediator.ApplicationStore.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe('returning array where expected', function () {
            it('initially shows empty categories', function(){
                Ember.run( function() {
                    var item = store.createRecord('result',{});
                    expect(item.get("categories")).to.be.empty;
                })
            });

            it('fills categories', function(){
                Ember.run( function() {
                    var item = store.createRecord('result',{'categories':'pop,rock,etc'});
                    expect(item.get("categories")).not.to.be.empty;
                })
            });
        });

        describe('returning sources name', function () {
            it('initially ', function(){
                Ember.run( function() {
                    var item = store.createRecord('result',{});
                    expect(item.get("sourceName")).to.be.empty;
                })
            });

            it('filled connection', function(){
                Ember.run( function() {
                    var item = store.createRecord(
                        'result',{
                            'connection':store.createRecord('connection', {
                                'source' : store.createRecord('source',{'name':'lilaSource'})
                            })
                        });
                    expect(item.get("sourceName")).not.to.be.empty;
                    item.get("sourceName").should.equal('lilaSource');
                })
            });
        });

        describe('calculate result-priority dependent from properties', function () {
            it('should on standard return', function(){
              Ember.run( function() {
                  var item = store.createRecord('result',{});
                  expect(item.get("priority")).to.be.equal(0);
              })
            });

            it('should on price-only return', function(){
                Ember.run( function() {
                    var item = store.createRecord('result',{'price' : "fifty-something"});
                    expect(item.get("priority")).to.be.equal(50);
                })
            });

            it('should on picture list only return', function(){
                Ember.run( function() {
                    var pic = store.createRecord('picture',{});
                    var item = store.createRecord('result');
                    item.get('pictures').pushObject(pic);
                    expect(item.get("priority")).to.be.equal(100);
                })
            })
        });

    });
})();