/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Result (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:result', Mediator.Result);
            container.register('model:connection', Mediator.Connection);
            container.register('model:source', Mediator.Source);
            container.register('model:picture', Mediator.Picture);
            store = Mediator.Store.create({
                container: container
            });
        });

        after(function () {
            store = null;
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
                    var item = store.createRecord('result',{'pictures' : pic});
                    item.get('pictures').pushObject(pic);
                    expect(item.get("priority")).to.be.equal(100);
                })
            })
        });
    });
})();