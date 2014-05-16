/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.GroupSet (Model)', function () {

        var store = null;

        beforeEach(function() {
            Mediator.Store = DS.Store.extend({
                adapter: Mediator.ApplicationAdapter
            });
            var container = new Ember.Container();
            container.register('model:group', Mediator.Group);
            container.register('model:groupset', Mediator.Groupset);
            container.register('model:result', Mediator.Result);
            container.register('model:picture', Mediator.Picture);
            container.register('model:link', Mediator.Link);
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
                    var item = store.createRecord('groupset',{});
                    expect(item).to.be.an.instanceof(Mediator.Groupset);
                    expect(item.get("lastObject")).to.be.undefined;
                    expect(item.get("firstObject")).to.be.undefined;

                    item.get('groups').then(function(groups){
                        groups.pushObject(store.createRecord('group'));
                        item.enumerableContentDidChange();
                        expect(item.get('lastObject')).to.be.an.instanceOf(Mediator.Group);
                        expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
                    });
                })
            });
            it('should give correct result set size', function(){
                Ember.run( function() {

                    var item = store.createRecord('groupset',{});
                    expect(item).to.be.an.instanceof(Mediator.Groupset);
                    item.toArray().should.have.length.zero;

                    var firstResult = store.createRecord('group',{});
                    item.get('groups').then( function(groups) {
                        groups.pushObject(firstResult);

                        item.enumerableContentDidChange();

                        expect(item.get('length')).to.be.one;
                    });
                })
            })
        });

        describe('Similarities between objects ', function () {
            it('should recognize identical picture urls.', function(){
                Ember.run( function() {

                    var testPRItem1 = store.createRecord('result',{'title':"test1"});
                    testPRItem1.get('pictures').pushObjects([
                            store.createRecord('picture',{url:'"http://test.de/lol.jpg"'}),
                            store.createRecord('picture',{url:'"http://test.de/ignoreThis.jpg"'})
                        ]
                    );

                    var testPRItem2 = store.createRecord('result',{'title':"test2"});
                    testPRItem2.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'})
                    );

                    expect(
                        store.createRecord('groupset',{})
                            .__isSimilarBecauseOfIdenticalPictures(
                                testPRItem1,
                                testPRItem2
                            )
                    ).to.be.equal(true);

                })
            });

            it('should recognize not identical picture urls.', function(){
                Ember.run( function() {

                    var testPRItem1 = store.createRecord('result',{'title':"test1"});
                    testPRItem1.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'})
                    );

                    var testPRItem2 = store.createRecord('result',{'title':"test2"});
                    testPRItem2.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lalal.jpg"'})
                    );

                    expect(
                        store.createRecord('groupset',{})
                            .__isSimilarBecauseOfIdenticalPictures(
                                testPRItem1,
                                testPRItem2
                            )
                    ).to.be.equal(false,"Veranstaltung nicht aehnlich");

                })
            });

            it('should recognize similar datasets', function(){
                Ember.run( function() {
                    var item = store.createRecord('groupset',{});

                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    var testPRItem2 = store.createRecord('result',{'title':'test2'});;

                    var item1 = store.createRecord('group');
                    var item2 = store.createRecord('group');

                    item1.get('results').then(function(results) {
                        results.pushObject(testPRItem1);
                        item2.get('results').then(function(otherResults) {
                            otherResults.pushObject(testPRItem2);

                            expect(item.__isSimilar(item1,item2)).to.be.equal(true);

                            testPRItem1.set('title',"PUNSCHIGEL / STOP DANCING IF YOU CAN!!!");
                            testPRItem2.set('title',"PUNSCHIGEL");

                            testPRItem1.set('location',"Altes Wettb�ro");
                            testPRItem2.set('location',"Altes Wettb�ro");

                            expect(item.__isSimilar(item1,item2)).to.be.equal(true,"Veranstaltung aehnlich");

                            testPRItem2.set("location","kuhlhemd");
                            testPRItem2.set("title", "klamauk");

                            expect(item.__isSimilar(item1,item2)).to.be.equal(false,"Veranstaltung unaehnlich");

                            testPRItem1.set("location","Beatpol (ehemals Starclub)");
                            testPRItem1.set("title","JULI ZEH & SLUT");

                            testPRItem2.set("location","Beatpol");
                            testPRItem2.set("title","JULI ZEH & SLUT (D) 'CORPUS DELICTI - EINE SCHALLNOVELLE'");

                            var debugDescription = "Veranstaltung beatpol aehnlich\n";
                            debugDescription += item1.get("reducedSummary")+"<-->"+item2.get("reducedSummary")+"\n";
                            debugDescription += "qgram:"+ smQGram.similarity(item1.get("reducedSummary"), item2.get("reducedSummary"))+" | ";
                            debugDescription += "smithWaterman:"+ smSmithWaterman.similarity(item1.get("reducedSummary"), item2.get("reducedSummary"))+"\n";

                            item.__isSimilar(item1,item2).should.be.equal(true,debugDescription);
                        });
                    });

                });
            });
        });

        describe('Combining similar result groups', function () {

            it('should combine groupSets with similar groups', function(){
                Ember.run( function() {
                    var item = store.createRecord('groupset',{});

                    var item1 = store.createRecord('group');
                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    testPRItem1.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'}));

                    var item2 = store.createRecord('group');
                    var testPRItem2 = store.createRecord('result',{'title':'test2'});
                    testPRItem2.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'}));

                    item1.get('results').then(function(results) {
                        results.pushObject(testPRItem1);
                        item2.get('results').then(function(otherResults) {
                            otherResults.pushObject(testPRItem2);

                            item.get('groups').then(function(groups) {
                                groups.pushObjects([item1,item2]);

                                item.enumerableContentDidChange();
                                item.toArray().should.have.length(2);

                                item.cleanUp();
                                // reduce items to one group
                                item.toArray().should.have.length(1, "set-length");
                                item.get('firstObject').toArray().should.have.length(2, "groups per set");
                            });

                        });
                    });

                })
            });

            it('should not combine groupSets with unsimilar groups', function(){
                Ember.run( function() {
                    var item = store.createRecord('groupset',{});

                    var item1 = store.createRecord('group');
                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    testPRItem1.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'}));

                    var item3 = store.createRecord('group');
                    var testPRItem3 = store.createRecord('result',{'title':"Larifari", 'location':"Lasterfahri"});

                    item1.get('results').then(function(results) {
                        results.pushObject(testPRItem1);
                        item3.get('results').then(function(otherResults) {
                            otherResults.pushObject(testPRItem3);

                            item.get('groups').then(function(groups) {

                                groups.pushObjects([item1, item3]);
                                item.enumerableContentDidChange();
                                item.toArray().should.have.length(2);

                                item.cleanUp();

                                item.toArray().should.have.length(2);
                                item.get('firstObject').toArray().should.have.length(1, "groups per set");
                                item.get('lastObject').toArray().should.have.length(1, "groups per set");
                            });
                        });
                    });
                })
            });

        })
    });
})();