/*global describe, it */
'use strict';

 (function () {

    describe('Mediator.GroupSet (Controller)', function () {

        var store = null;
        var controller = null;

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
            // an empty object will act as our PostsController
            container.register('controller:groupset', { });

            controller = Mediator.GroupsetController.create({
                container: container
            });

            store = Mediator.Store.create({
                container: container
            });
        });

        after(function () {
            store = null;
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
                        controller.__isSimilarBecauseOfIdenticalPictures(
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
                        controller.__isSimilarBecauseOfIdenticalPictures(
                                testPRItem1,
                                testPRItem2
                            )
                    ).to.be.equal(false,"Veranstaltung nicht aehnlich");

                })
            });

            it('should recognize similar datasets', function(){
                Ember.run( function() {

                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    var testPRItem2 = store.createRecord('result',{'title':'test2'});;

                    var item1 = store.createRecord('group');
                    var item2 = store.createRecord('group');

                    var results = item1.get('results');
                    results.pushObject(testPRItem1);
                    var otherResults = item2.get('results');
                    otherResults.pushObject(testPRItem2);

                    expect(controller.__isSimilar(item1,item2)).to.be.equal(true);

                    testPRItem1.set('title',"PUNSCHIGEL / STOP DANCING IF YOU CAN!!!");
                    testPRItem2.set('title',"PUNSCHIGEL");

                    testPRItem1.set('location',"Altes Wettb�ro");
                    testPRItem2.set('location',"Altes Wettb�ro");

                    expect(controller.__isSimilar(item1,item2)).to.be.equal(true,"Veranstaltung aehnlich");

                    testPRItem2.set("location","kuhlhemd");
                    testPRItem2.set("title", "klamauk");

                    expect(controller.__isSimilar(item1,item2)).to.be.equal(false,"Veranstaltung unaehnlich");

                    testPRItem1.set("location","Beatpol (ehemals Starclub)");
                    testPRItem1.set("title","JULI ZEH & SLUT");

                    testPRItem2.set("location","Beatpol");
                    testPRItem2.set("title","JULI ZEH & SLUT (D) 'CORPUS DELICTI - EINE SCHALLNOVELLE'");

                    var debugDescription = "Veranstaltung beatpol aehnlich\n";
                    debugDescription += item1.get("reducedSummary")+"<-->"+item2.get("reducedSummary")+"\n";
                    debugDescription += "qgram:"+ smQGram.similarity(item1.get("reducedSummary"), item2.get("reducedSummary"))+" | ";
                    debugDescription += "smithWaterman:"+ smSmithWaterman.similarity(item1.get("reducedSummary"), item2.get("reducedSummary"))+"\n";

                    controller.__isSimilar(item1,item2).should.be.equal(true,debugDescription);
                });
            });
        });

        describe('Combining similar result groups', function () {

            it('should combine groupSets with similar groups', function(){
                Ember.run( function() {
                    var model = store.createRecord('groupset',{});
                    controller.set('model',model);

                    var groupItem1 = store.createRecord('group', {});
                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    testPRItem1.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'})
                    );

                    var groupItem2 = store.createRecord('group', {});
                    var testPRItem2 = store.createRecord('result',{'title':'test2'});
                    testPRItem2.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'})
                    );


                    var results = groupItem1.get('results');
                    results.pushObject(testPRItem1);
                    var otherResults = groupItem2.get('results');
                    otherResults.pushObject(testPRItem2);

                    var groups = model.get('groups');

                    expect(groups.get('length')).to.be.equal(0);
                    assert.isFunction(groups.pushObject);
                    expect(controller.get('groups.length')).to.be.equal(0);
                    expect(groupItem1).to.be.an.instanceOf(Mediator.Group);
                    expect(groupItem2).to.be.an.instanceOf(Mediator.Group);
                    expect(controller.__isSimilar(testPRItem1,testPRItem2)).to.equal(true);

                    groupItem1.set('groupset', model);
                    groupItem2.set('groupset', model);

                    model.get('groups').pushObject(groupItem1);
                    model.get('groups').pushObject(groupItem2);

                    model.enumerableContentDidChange();
                    model.toArray().should.have.length(2, "before clean up");

                    assert.isFunction(controller.cleanUp);

                    controller.processSimilarityMeasurement();
                    model.enumerableContentDidChange();

                    // reduce items to one group
                    model.toArray().should.have.length(1, "after clean-up");
                    model.get('firstObject').toArray().should.have.length(2, "groups per set");
                })

            });

            it('should not combine groupSets with unsimilar groups', function(){
                Ember.run( function() {
                    var model = store.createRecord('groupset',{});
                    controller.set('model', model);

                    var item1 = store.createRecord('group');
                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    testPRItem1.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'}));

                    var item3 = store.createRecord('group');
                    var testPRItem3 = store.createRecord('result',{'title':"Larifari", 'location':"Lasterfahri"});

                    var results = item1.get('results');
                    results.pushObject(testPRItem1);
                    var otherResults = item3.get('results');
                    otherResults.pushObject(testPRItem3);

                    var groups = model.get('groups');

                    groups.pushObjects([item1, item3]);
                    model.enumerableContentDidChange();
                    model.toArray().should.have.length(2);

                    controller.cleanUp();

                    model.toArray().should.have.length(2);
                    model.get('firstObject').toArray().should.have.length(1, "groups per set");
                    model.get('lastObject').toArray().should.have.length(1, "groups per set");
                })
            });

        });

        describe('recognize new results and convert them into own cluster/group', function () {
            it('should travers connections for new results and put those as new groups into the set', function() {
                Ember.run( function() {
                    controller.set('store', store);

                    var connection1 = store.createRecord('connection',{});
                    var connection2 = store.createRecord('connection',{});
                    var connection3 = store.createRecord('connection',{});

                    var model = store.createRecord('groupset',{});
                    model.get('connections').pushObject(connection1);
                    model.get('connections').pushObject(connection2);
                    model.get('connections').pushObject(connection3);
                    controller.set('model', model);

                    controller.addResultsAsGroups();

                })
            }),

            it('should return a group with the given result in the first step', function() {
                Ember.run( function() {
                    controller.set('store', store);
                    var resultItem = store.createRecord('result',{'title':'test1'});
                    var returned = controller.__produceNewGroupForResult(resultItem);

                    returned.toArray().should.have.length(1, "results per group");
                    expect(returned.toArray()).to.have.members([resultItem]);
                })
            })
        });


        /*
        addResultsAsGroups: function() {
            var store = this.store;
            var groups = this.get("groups");
            this.get('connections').forEach(
                function(connection) {
                    if(connection.get('status') == Mediator.ConnectionStatus.RECEIVING) {
                        connection.get('results').forEach(
                            function (result) {
                                console.log("working on result:"+result.get('id'));
                                if (Ember.isEmpty(result.get('group'))) {
                                    var tmpGroup = store.createRecord('group');
                                    var tmpGroupResults = tmpGroup.get('results');
                                    tmpGroupResults.pushObject(result);
                                    console.log("pushed result |"+result.get('id')+"|results per group:"+ tmpGroup.get('length'));
                                    result.set('group', tmpGroup);
                                    groups.pushObject(tmpGroup);
                                }
                            }
                        );
                        //connection.set('status',Mediator.ConnectionStatus.IDLE);
                    }
                }
            );
        },*/

    });
})();