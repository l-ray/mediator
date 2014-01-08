/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.Group (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:group', Mediator.Group);
            container.register('model:result', Mediator.Result);
            container.register('model:connection', Mediator.Connection);
            store = Mediator.Store.create({
                container: container
            });
        });

        after(function () {
            store = null;
        });

        describe('Extends Ember.Enumerable ', function () {
            it('should allow to add results', function(){
                Ember.run( function() {

                    var item = store.createRecord('connection',{});
                    expect(item.get("lastObject")).to.be.undefined;
                    expect(item.get("firstObject")).to.be.undefined;

                    item.get('results').pushObject(store.createRecord('result'));
                    item.enumerableContentDidChange();
                    expect(item.get('lastObject')).to.be.an.instanceOf(Mediator.Result);
                    expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
                })
            });
            it('should give correct result set size', function(){
                Ember.run( function() {

                    var item = store.createRecord('connection',{});
                    expect(item.get("length")).to.be.zero;

                    var firstResult = store.createRecord('result',{connection:item});
                    item.get('results').pushObject(firstResult);
                    item.enumerableContentDidChange();

                    expect(item.get('length')).to.be.one;
                })
            })
        });

        describe('calculate group priority dependent from properties', function () {
            it('should on standard return 0', function(){
              Ember.run( function() {
                  var item = store.createRecord('group',{});
                  expect(item.get("priority")).to.be.zero;
              })
            });
         });

        describe('return optimal title/subtitle', function () {

            it('should on standard have an empty title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("title")).to.be.empty;
                })
            });

            it('should show first non-empty title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    item.get('results').pushObject(store.createRecord('result', {}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.one;
                    expect(item.get("title")).to.be.empty;

                    var testTitle = "cool, bro";
                    item.get('results').pushObject(store.createRecord('result', {'title':testTitle}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.two;
                    expect(item.get("title")).to.be.equal(testTitle);

                    item.get('results').pushObject(store.createRecord('result', {'title':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.three;
                    expect(item.get("title")).to.be.equal(testTitle);
                })
            });

            it('should on standard have an empty sub-title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("subtitle")).to.be.empty;
                })
            });

            it('should show first non-empty sub-title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    item.get('results').pushObject(store.createRecord('result', {}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.one;
                    expect(item.get("subtitle")).to.be.empty;

                    var subTitle = "cool, bro";
                    item.get('results').pushObject(store.createRecord('result', {'subtitle':subTitle}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.two;
                    expect(item.get("subtitle")).to.be.equal(subTitle);

                    item.get('results').pushObject(store.createRecord('result', {'subtitle':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.three;
                    expect(item.get("subtitle")).to.be.equal(subTitle);
                })
            });

            it('should on standard have an empty price', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("price")).to.be.empty;
                })
            });

            it('should show first non-empty price', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    item.get('results').pushObject(store.createRecord('result', {}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.one;
                    expect(item.get("price")).to.be.empty;

                    var price = "5 Euro";
                    item.get('results').pushObject(store.createRecord('result', {'price':price }));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.two;
                    expect(item.get("price")).to.be.equal(price);

                    item.get('results').pushObject(store.createRecord('result', {'price':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.three;
                    expect(item.get("price")).to.be.equal(price);
                })
            });

            it('should on standard have an empty location', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("location")).to.be.empty;
                })
            });

            it('should show first non-empty location', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    item.get('results').pushObject(store.createRecord('result', {}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.one;
                    expect(item.get("location")).to.be.empty;

                    var location = "Himmelreich";
                    item.get('results').pushObject(store.createRecord('result', {'location':location}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.two;
                    expect(item.get("location")).to.be.equal(location);

                    item.get('results').pushObject(store.createRecord('result', {'location':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.three;
                    expect(item.get("location")).to.be.equal(location);
                })
            });

        })

    });
})();