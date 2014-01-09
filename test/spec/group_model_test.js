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

        describe('return optimal title', function () {

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

            it('should show reduced title(lower case, only letters/numbers)', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var test = "cooL, bro";
                    var testReduced = "cool bro";
                    item.get('results').pushObject(store.createRecord('result', {'title':test}));
                    item.enumerableContentDidChange();
                    expect(item.get("reducedTitle")).to.be.equal(testReduced);
                })
            });
        });

        describe('return optimal subtitle', function () {

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

        });

        describe('return optimal price', function () {

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
        });

        describe('return optimal location', function () {
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

            it('should show reduced location (lower case, only letters/numbers)', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var test = "cooL, bro";
                    var testReduced = "cool bro";
                    item.get('results').pushObject(store.createRecord('result', {'location':test}));
                    item.enumerableContentDidChange();
                    expect(item.get("reducedLocation")).to.be.equal(testReduced);
                })
            });
        });

        describe('return optimal startDate', function () {

            it('should on standard have an empty startDate', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("startDate")).to.be.empty;
                })
            });

            it('should show first non-empty startDate', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    item.get('results').pushObject(store.createRecord('result', {}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.one;
                    expect(item.get("startDate")).to.be.empty;

                    var startDate = "2013-12-11 20:00";
                    item.get('results').pushObject(store.createRecord('result', {'startDate':startDate}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.two;
                    expect(item.get("startDate")).to.be.equal(startDate);

                    item.get('results').pushObject(store.createRecord('result', {'startDate':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    expect(item.get('length')).to.be.three;
                    expect(item.get("startDate")).to.be.equal(startDate);
                })
            });

        }),

            describe('return summary string', function () {

                it('should on standard have an empty summary', function(){
                    Ember.run( function() {
                        var item = store.createRecord('group',{});
                        expect(item.get("reducedSummary")).to.be.empty;
                    })
                });

                it('should show nothing double)', function(){
                    Ember.run( function() {
                        var title ="bro coOl bro yeah cool";
                        var location ="cool what yeah-";
                        var item = store.createRecord('group',{});

                        item.get('results').pushObject(store.createRecord('result', {'title':title, 'location':location}));
                        item.enumerableContentDidChange();

                        expect(item.get('reducedSummary').split(" ").length).to.be.four;
                        expect(item.get('reducedSummary').split(" ")).to.contain("bro");
                        expect(item.get('reducedSummary').split(" ")).to.contain("cool");
                        expect(item.get('reducedSummary').split(" ")).to.contain("yeah");
                        expect(item.get('reducedSummary').split(" ")).to.contain("what");
                    })
                });

                it('should be lower case letter/numbers only)', function(){
                    Ember.run( function() {
                        var title ="mQGiyQFsPJHwpPprgv7DWW3lxFC!%$&%$§´é´qôb";
                        var location ="vvueBBZK7QqoBlF2txZXtqMNF";
                        var item = store.createRecord('group',{});

                        item.get('results').pushObject(store.createRecord('result', {'title':title, 'location':location}));
                        item.enumerableContentDidChange();

                        expect(item.get('reducedSummary').length).to.be.gt.zero;
                        expect(item.get('reducedSummary').length).to.be.lt(title.length + location.length);
                        expect(item.get('reducedSummary')).to.be.equal(item.get('reducedSummary').toLowerCase());
                        expect(item.get('reducedSummary')).to.match(/[\d\s ]/);
                    })
                });

            })

    });
})();