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

                    item.get('groups').pushObject(store.createRecord('group'));
                    item.enumerableContentDidChange();
                    expect(item.get('lastObject')).to.be.an.instanceOf(Mediator.Group);
                    expect(item.get('firstObject')).to.be.equal(item.get('lastObject'));
                })
            });
            it('should give correct result set size', function(){
                Ember.run( function() {

                    var item = store.createRecord('groupset',{});
                    expect(item).to.be.an.instanceof(Mediator.Groupset);
                    expect(item.get("length")).to.be.zero;

                    var firstResult = store.createRecord('group',{});
                    item.get('groups').pushObject(firstResult);
                    item.enumerableContentDidChange();

                    expect(item.get('length')).to.be.one;
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
                    ).to.be.true;

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
                    ).to.be.false;

                })
            });

            it('should recognize similar datasets', function(){
                Ember.run( function() {
                        var item = store.createRecord('groupset',{});

                        var testPRItem1 = store.createRecord('result',{'title':'test1'});
                        var testPRItem2 = store.createRecord('result',{'title':'test2'});;

                        var item1 = store.createRecord('group');
                        item1.get('results').pushObject(testPRItem1);

                        var item2 = store.createRecord('group');
                        item2.get('results').pushObject(testPRItem2);

                        expect(item.__isSimilar(item1,item2)).to.be.true;

                        testPRItem1.set('title',"PUNSCHIGEL / STOP DANCING IF YOU CAN!!!");
                        testPRItem2.set('title',"PUNSCHIGEL");

                        testPRItem1.set('location',"Altes Wettb�ro");
                        testPRItem2.set('location',"Altes Wettb�ro");

                    /*
                        info(item1.getLocationCompareString()+" <--> "+item2.getLocationCompareString());
                        info(item1.getTitleCompareString()+" <--> "+item2.getTitleCompareString());
                        info(item1.getCompleteCompareString()+" <--> "+item2.getCompleteCompareString());
                    */
                        /*
                        expect(Simmetrix.SmithWaterman.getSimilarity(item1.get("reducedSummary"),item2.get("reducedSummary"))).to.be.one;
                        */
                        /*info(QGramsDistance.getSimilarity(item1.getCompleteCompareString(),item2.getCompleteCompareString()));
                        assert(this.item.__isSimilar(item1,item2),"Veranstaltung aehnlich");

                        testPRItem2.setLocation("kuhlhemd");
                        testPRItem2.setTitle("klamauk");

                        assert(!this.item.__isSimilar(item1,item2),"Veranstaltung unaehnlich");

                        testPRItem1.setLocation("Beatpol (ehemals Starclub)");
                        testPRItem1.setTitle("JULI ZEH & SLUT");

                        testPRItem2.setLocation("Beatpol");
                        testPRItem2.setTitle("JULI ZEH & SLUT (D) 'CORPUS DELICTI - EINE SCHALLNOVELLE'");

                        info(item1.getCompleteCompareString()+"<-->"+item2.getCompleteCompareString());
                        info(QGramsDistance.getSimilarity(item1.getCompleteCompareString(),item2.getCompleteCompareString()));
                        info(SmithWaterman.getSimilarity(item1.getCompleteCompareString(),item2.getCompleteCompareString()));
                        assert(this.item.__isSimilar(item1,item2),"Veranstaltung beatpol aehnlich");

                        fail("not yet implemented");*/
                    });
            });

                    /*

                    testCleanUp:function(){with(this) {
                        var testPRItem1 = new PatternResult();
                        testPRItem1.setTitle("test1");
                        testPRItem1.addPicture(new PatternPicture("http://test.de/lol.jpg"));

                        var testPRItem2 = new PatternResult();
                        testPRItem2.setTitle("test2");
                        testPRItem2.addPicture(new PatternPicture("http://test.de/lol.jpg"));

                        var item1 = new PatternResultGroup();
                        item1.addPatternResult(testPRItem1);

                        var item2 = new PatternResultGroup();
                        item2.addPatternResult(testPRItem2);

                        this.item.push(item1);
                        this.item.push(item2);
                        this.item.cleanUp();

                        assertEqual(1,this.item.size());

                        var testPRItem3 = new PatternResult();
                        testPRItem3.setTitle("Larifari");
                        testPRItem3.setLocation("Lasterfahri");
                        testPRItem3.addCategory("PopCorn");

                        var item3 = new PatternResultGroup();
                        item3.addPatternResult(testPRItem3);
                        this.item.push(item3);
                        this.item.cleanUp();

                        assertEqual(2,this.item.size());
                        fail("not yet implemented");
                    }},
                })
            });
 */
        })
    });
})();