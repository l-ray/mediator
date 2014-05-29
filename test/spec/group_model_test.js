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
            container.register('model:picture', Mediator.Picture);
            container.register('model:link', Mediator.Link);
            container.register('model:groupset', Mediator.Groupset);
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

                    var item = store.createRecord('group',{});
                    expect(item.get("lastObject")).to.be.undefined;
                    expect(item.get("firstObject")).to.be.undefined;

                    var results = item.get('results');

                    results.pushObject(store.createRecord('result'));
                    item.enumerableContentDidChange();
                    expect(item.get('lastObject')).to.be.an.instanceOf(Mediator.Result);
                    expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));

                })
            });
            it('should give correct result set size', function(){
                Ember.run( function() {

                    var item = store.createRecord('group',{});
                    item.toArray().should.have.length(0);

                    var firstResult = store.createRecord('result',{});
                    var results = item.get('results');

                    results.pushObject(firstResult);
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(1);

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

        describe('title', function () {

            it('should on standard have an empty title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("title")).to.be.a('string').and.to.be.empty;
                })
            });

            it('should show first non-empty title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    var results = item.get('results');
                    results.pushObject(store.createRecord('result', {}));

                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(1);
                    expect(item.get("title")).to.be.a('string').and.to.be.empty;

                    var testTitle = "cool, bro";
                    results.pushObject(store.createRecord('result', {'title':testTitle}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(2);
                    expect(item.get("title")).to.be.a('string').and.to.equal(testTitle);

                    results.pushObject(store.createRecord('result', {'title':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(3);
                    expect(item.get("title")).to.be.a('string').and.to.equal(testTitle);

                })
            });

            it('should show reduced title(lower case, only letters/numbers)', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var results = item.get('results');
                    results.pushObject(store.createRecord('result', {'title':"cooL, bro"}));

                    item.enumerableContentDidChange();
                    expect(item.get("reducedTitle")).to.be.a('string').and.to.equal("cool bro");

                    item.get('firstObject').set('title',"  .-DiLemM ? ");
                    expect(item.get("reducedTitle")).to.match(/dilemm/,"upperCase and umlaute");

                    item.get('firstObject').set('title',"  .-DiLemMÖ ? ");
                    expect(item.get("reducedTitle")).to.match(/dilemmö/,"upperCase and umlaute");

                    item.get('firstObject').set('title',"U96");
                    expect(item.get("reducedTitle")).to.match(/u96/,"numbers");

                    item.get('firstObject').set('title',"###\ test  -. -Me---");
                    expect(item.get("reducedTitle")).to.be.a('string').and.to.equal("test me","Stripping spaces");
                });
            });
        });

        describe('subtitle', function () {

            it('should on standard have an empty sub-title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("subtitle")).to.be.empty;
                })
            });

            it('should show first non-empty sub-title', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    var results = item.get('results');
                    results.pushObject(store.createRecord('result', {}));

                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(1);
                    expect(item.get("subtitle")).to.be.a('string').and.to.be.empty;

                    var subTitle = "cool, bro";
                    results.pushObject(store.createRecord('result', {'subtitle':subTitle}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(2);
                    expect(item.get("subtitle")).to.be.a('string').and.to.equal(subTitle);

                    results.pushObject(store.createRecord('result', {'subtitle':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(3);
                    expect(item.get("subtitle")).to.be.a('string').and.to.equal(subTitle);
                });
            });

        });

        describe('price', function () {

            it('should on standard have an empty price', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("price")).to.be.empty;
                })
            });

            it('should show first non-empty price', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    var results = item.get('results');
                    results.pushObject(
                        store.createRecord('result', {})
                    );

                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(1);
                    expect(item.get("price")).to.be.empty;

                    var price = "5 Euro";
                    results.pushObject(
                        store.createRecord('result', {'price':price })
                    );
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(2);
                    expect(item.get("price")).to.be.equal(price);

                    results.pushObject(
                        store.createRecord('result', {'price':"dontShowThis"})
                    );
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(3);
                    expect(item.get("price")).to.be.equal(price);

                })
            });
        });

        describe('location', function () {
            it('should on standard have an empty location', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("location")).to.be.a('string').and.to.be.empty;
                })
            });

            it('should show first non-empty location', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    var results = item.get('results');
                    results.pushObject(store.createRecord('result', {}));

                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(1);
                    expect(item.get("location")).to.be.a('string').and.to.be.empty;

                    var location = "Himmelreich";
                    results.pushObject(store.createRecord('result', {'location':location}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(2);
                    expect(item.get("location")).to.be.a('string').and.to.equal(location);

                    results.pushObject(store.createRecord('result', {'location':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(3);
                    expect(item.get("location")).to.be.a('string').and.to.equal(location);
                });
            });

            it('should show reduced location (lower case, only letters/numbers)', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var results = item.get('results');
                    results.pushObject(
                        store.createRecord('result', {'location':'cooL, bro'})
                    );

                    item.enumerableContentDidChange();
                    expect(item.get("reducedLocation")).to.be.a('string').and.to.equal("cool bro");

                    item.get('firstObject').set('location',"  .-DiLemM ? ");
                    expect(item.get("reducedLocation")).to.match(/dilemm/,"upperCase and umlaute");

                    item.get('firstObject').set('location',"  .-DiLemMÖ ? ");
                    expect(item.get("reducedLocation")).to.match(/dilemmö/,"upperCase and umlaute");

                    item.get('firstObject').set('location',"U96");
                    expect(item.get("reducedLocation")).to.match(/u96/,"numbers");

                    item.get('firstObject').set('location',"###\ test  -. -Me---");
                    expect(item.get("reducedLocation")).to.be.a('string').and.to.equal("test me","Stripping spaces");
                });
            });
        });

        describe('startDate', function () {

            it('should on standard have an empty startDate', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("startDate")).to.be.empty;
                })
            });

            it('should show first non-empty startDate', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    var results = item.get('results');
                    results.pushObject(store.createRecord('result', {}));

                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(1);
                    expect(item.get("startDate")).to.be.empty;

                    var startDate = "2013-12-11 20:00";
                    results.pushObject(store.createRecord('result', {'start':startDate}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(2);
                    expect(item.get("startDate")).to.be.equal(startDate);

                    results.pushObject(store.createRecord('result', {'start':"dontShowThis"}));
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(3);
                    expect(item.get("startDate")).to.be.equal(startDate);
                });

            });

        }),

        describe('summary string', function () {

            it('should on standard have an empty summary', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("reducedSummary")).to.be.a('string').and.to.empty;
                })
            });

            it('should show nothing double)', function(){
                Ember.run( function() {
                    var title ="bro coOl bro yeah cool";
                    var location ="cool what yeah-";
                    var item = store.createRecord('group',{});

                    var results = item.get('results');
                    results.pushObject(
                        store.createRecord('result', {'title':title, 'location':location})
                    );

                    item.enumerableContentDidChange();

                    item.get('reducedSummary').split(" ").should.have.length(4);
                    expect(item.get('reducedSummary').split(" "))
                        .to.contain("bro")
                        .and.to.contain("cool")
                        .and.to.contain("yeah")
                        .and.to.contain("what");
                });
            });

            it('should be lower case letter/numbers only)', function(){
                Ember.run( function() {
                    var title ="mQGiyQFsPJHwpPprgv7DWW3lxFC!%$&%$§´é´qôb";
                    var location ="vvueBBZK7QqoBlF2txZXtqMNF";
                    var item = store.createRecord('group',{});

                    var results = item.get('results');
                    results.pushObject(
                        store.createRecord('result', {'title': title, 'location': location})
                    );

                    item.enumerableContentDidChange();

                    item.get('reducedSummary').should.be.a('string');
                    item.get('reducedSummary').should.have.length.gt.zero;
                    item.get('reducedSummary').should.have.length.lt(title.length + location.length);
                    expect(item.get('reducedSummary')).to.be.equal(item.get('reducedSummary').toLowerCase());
                    expect(item.get('reducedSummary')).to.match(/[\d\s ]/);
                });
            });

        })

        describe('pictures of all results', function () {

            it('should on standard have no pictures', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    expect(item.get('pictures')).that.is.not.undefined;
                    expect(item.get('pictures')).to.be.an('array');
                    expect(item.get("pictures")).to.be.empty;
                })
            });

            it('should show all nested pictures)', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var firstResult = store.createRecord('result', {});
                    firstResult.get('pictures')
                        .pushObject(store.createRecord('picture', {'url':'http://test.co/img1.src'}));

                    var secondResult = store.createRecord('result', {});
                    var p2 = secondResult.get('pictures');
                    p2.pushObject(store.createRecord('picture', {'url':'http://test.co/img2.src'}));
                    p2.pushObject(store.createRecord('picture', {'url':'http://test.co/img3.src'}));

                    var results = item.get('results');

                    results.pushObject(firstResult);
                    results.pushObject(secondResult);
                    item.enumerableContentDidChange();

                    expect(item.get('pictures')).to.have.an.property('length');
                    expect(item.get('pictures')).to.be.not.empty;
                    item.get('pictures').should.have.length(3);
                });
            });

        })

        describe('priorities', function () {

            it('should recognize empty system priority', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});
                    expect(item.get("priority")).to.equal(0);
                })
            });

            it('should recognize filled system priority', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var result1 = store.createRecord('result', {});
                    var result2 = store.createRecord('result', {'price': 5});

                    var results = item.get('results');
                    results.pushObject(result1);

                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(1);
                    expect(item.get("priority")).to.be.equal(0);

                    item.get('results').pushObject(result2);
                    item.enumerableContentDidChange();
                    item.toArray().should.have.length(2);
                    expect(item.get('priority')).to.be.equal(result2.get('priority'));
                });
            });

        });

        describe('links of all results', function () {

            it('should on standard have no links', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    expect(item.get('links')).that.is.not.undefined;
                    expect(item.get('links')).to.be.an('array');
                    expect(item.get("links")).to.be.empty;
                })
            });

            it('should show all nested links)', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var firstResult = store.createRecord('result', {});
                    firstResult.get('links')
                        .pushObject(store.createRecord('link', {'url':'http://test.co/img1.src'}));

                    var secondResult = store.createRecord('result', {});
                    var p2 = secondResult.get('links');
                    p2.pushObject(store.createRecord('link', {'url':'http://test.co/img2.src'}));
                    p2.pushObject(store.createRecord('link', {'url':'http://test.co/img3.src'}));

                var results = item.get('results');
                    results.pushObject(firstResult);
                    results.pushObject(secondResult);
                    item.enumerableContentDidChange();

                    expect(item.get('links')).to.have.an.property('length');
                    expect(item.get('links')).to.be.not.empty;
                    item.get('links').should.have.length(3);
                });
            });
        })

        describe('return categories of all results', function () {

            it('should on standard have no links', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    expect(item.get('categories')).that.is.not.undefined;
                    expect(item.get('categories')).to.be.an('array').and.to.be.empty;
                })
            });

            it('should show all nested links)', function(){
                Ember.run( function() {
                    var item = store.createRecord('group',{});

                    var firstResult = store.createRecord('result', {id:"p1"});
                    firstResult.set('categories', "jazz");

                    var secondResult = store.createRecord('result', {id:"p2"});
                    var p2 = secondResult.set('categories',"pop,jazz,etc");

                    var results = item.get('results');
                    results.pushObject(firstResult);
                    results.pushObject(secondResult);
                    item.enumerableContentDidChange();

                    expect(item.get('categories')).to.have.an.property('length').and.to.be.not.empty;
                    item.get('categories').should.have.length(3);
                })
            });
        })
    });
})();