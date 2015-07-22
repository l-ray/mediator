/* jshint expr:true */
import { expect, assert } from 'chai';
import Ember from 'ember';
import Mediator from '../../../app';
import {
  describeModule,
  it
} from 'ember-mocha';

/* global smSmithWaterman */
/* global smQGram */
/* global smUtilities */

describeModule(
  'controller:connections',
  'Application store',
  {
    // Specify the other units that are required for this test.
    needs: [
    'model:source',
    'model:connection',
    'model:result',
    'model:picture',
    'model:link',
    'model:groupset',
    'model:group'
    ]
  },
  function() {

          it('exists', function() {
                  var controller = this.subject().get('store');
                  console.log("The store is ..."+controller);
                  expect(controller).to.be.ok;
                });

            it('should recognize identical picture urls.', function(){

                  var store = this.subject().get('store');

                  expect(
                    store.__isSimilarBecauseOfIdenticalPictures(
                              ["http://test.de/lol.jpg","http://test.de/ignoreThis.jpg"],
                              ["http://test.de/lol.jpg"]
                          )
                  ).to.be.equal(true);

            });

            it('should recognize not identical picture urls.', function(){
            //    Ember.run( function() {

                  var store = this.subject().get('store');

                  expect(
                    store.__isSimilarBecauseOfIdenticalPictures(
                            ["http://test.de/lol.jpg"],
                            ["http://test.de/lalal.jpg"]
                          )
                  ).to.be.equal(false,"Veranstaltung nicht aehnlich");

             //   });
            });

            it('should recognize similar datasets', function(){

                  var store = this.subject().get('store');

                  expect(smUtilities).to.be.ok;
                  expect(smUtilities.reducedSummary).to.be.ok;

                  var context = {
                    __isSimilarBecauseOfIdenticalPictures:store.__isSimilarBecauseOfIdenticalPictures,
                    _CONST_LEVENSHTEIN_RATIO : 0.7,
                    _CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE : 0.36,
                    _CONST_QGRAM_RATIO : 0.61,
                    _CONST_QGRAM_LEVEL1_RATIO : 0.5
                  };

                    expect(store.__isSimilar.call(context,
                      {id:"1",title:'test1', summary:'test1'},
                      {id:"2",title:'test2', summary:'test2'}
                    )).to.be.equal(true,
                      "results with similar title");

                    expect(store.__isSimilar.call(context,
                      {
                        id:"1",
                        title:"PUNSCHIGEL / STOP DANCING IF YOU CAN!!!",
                        location:"Altes Wettbüro",
                        summary: smUtilities.reducedSummary(
                          "PUNSCHIGEL / STOP DANCING IF YOU CAN!!!",
                          "Altes Wettbüro"
                        )
                      },
                      {
                        id:"2",
                        title:"PUNSCHIGEL",
                        location:"Altes Wettbüro",
                        summary: smUtilities.reducedSummary(
                          "PUNSCHIGEL",
                          "Altes Wettbüro"
                        )
                      }
                    )).to.be.equal(true,"event similar and location the same");

                    expect(store.__isSimilar.call(context,
                      {
                        id:"1",
                        title:"PUNSCHIGEL / STOP DANCING IF YOU CAN!!!",
                        location:"Altes Wettbüro",
                        summary: smUtilities.reducedSummary(
                          "PUNSCHIGEL / STOP DANCING IF YOU CAN!!!",
                          "Altes Wettbüro"
                        )
                      },
                      {
                        id:"2",
                        title: "klamauk",
                        location:"kuhlhemd",
                        summary: smUtilities.reducedSummary(
                          "klamauk",
                          "kuhlhemd"
                        )
                      }
                    )).to.be.equal(false,"location and event not similar");

                    expect(store.__isSimilar.call(context,
                      {
                        id:"1",
                        title:"JULI ZEH & SLUT",
                        location:"Beatpol (ehemals Starclub)",
                        summary: smUtilities.reducedSummary(
                          "JULI ZEH & SLUT",
                          "Beatpol (ehemals Starclub)"
                        )
                      },
                      {
                        id:"2",
                        title: "JULI ZEH & SLUT (D) 'CORPUS DELICTI - EINE SCHALLNOVELLE'",
                        location:"Beatpol",
                        summary: smUtilities.reducedSummary(
                          "JULI ZEH & SLUT (D) 'CORPUS DELICTI - EINE SCHALLNOVELLE'",
                          "Beatpol"
                        )
                      }
                    )).to.be.equal(true,"JULI ZEH & SLUT");
            });

            it('should combine groupSets with similar groups', function(){
                  var store = this.subject().get('store');

                  var model = store.createRecord('groupset',{});

                  expect(model).to.be.ok;
                  expect(model.get).to.be.ok;

                    var groupItem1 = store.createRecord('group', {});
                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    testPRItem1.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'})
                    );

                    var results = groupItem1.get('results');
                    results.pushObject(testPRItem1);


                    var groupItem2 = store.createRecord('group', {});
                    var testPRItem2 = store.createRecord('result',{'title':'test2'});
                    testPRItem2.get('pictures').pushObject(
                        store.createRecord('picture',{url:'"http://test.de/lol.jpg"'})
                    );

                    var otherResults = groupItem2.get('results');
                    otherResults.pushObject(testPRItem2);

                    var groups = model.get('groups');

                    expect(groups.get('length')).to.be.equal(0);
                    assert.isFunction(groups.pushObject);
                    expect(model.get('groups.length')).to.be.equal(0);
                    expect(groupItem1).to.be.an.instanceOf(DS.Model);
                    expect(groupItem2).to.be.an.instanceOf(DS.Model);

                    groupItem1.set('groupset', model);
                    groupItem2.set('groupset', model);

                    model.get('groups').pushObject(groupItem1);
                    model.get('groups').pushObject(groupItem2);

                    model.enumerableContentDidChange();
                    expect(model.toArray()).to.have.length(2, "before clean up");

                    store.processSimilarityMeasurement.call(
                      {
                        model:model,
                        __isSimilar: store.__isSimilar,
                        __isSimilarBecauseOfIdenticalPictures:store.__isSimilarBecauseOfIdenticalPictures,
                        _CONST_LEVENSHTEIN_RATIO : 0.7,
                        _CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE : 0.36,
                        _CONST_QGRAM_RATIO : 0.61,
                        _CONST_QGRAM_LEVEL1_RATIO : 0.5,
                        _RESULT_CATEGORY_SPLITTER: ','
                      }

                    );
                    model.enumerableContentDidChange();

                    // reduce items to one group
                    expect(model.toArray()).to.have.length(1, "after clean-up");
                    expect(model.get('firstObject').toArray()).to.have.length(2, "groups per set");

            });

            it('should not combine groupSets with unsimilar groups', function(){

                  var store = this.subject().get('store');

                    var model = store.createRecord('groupset',{});

                    var item1 = store.createRecord('group');
                    var testPRItem1 = store.createRecord('result',{'title':'test1'});
                    testPRItem1.get('pictures').pushObject(
                      store.createRecord('picture',{url:'"http://test.de/lol.jpg"'})
                    );
                    var results = item1.get('results');
                    results.pushObject(testPRItem1);

                    var item3 = store.createRecord('group');
                    var testPRItem3 = store.createRecord('result',{'title':"Larifari", 'location':"Lasterfahri"});

                    var otherResults = item3.get('results');
                    otherResults.pushObject(testPRItem3);

                    var groups = model.get('groups');

                    groups.pushObjects([item1, item3]);
                    model.enumerableContentDidChange();
                    expect(model.toArray()).to.have.length(2);

                    expect(model.get('firstObject').toArray()).to.have.length(1, "groups per set");
                    expect(model.get('lastObject').toArray()).to.have.length(1, "groups per set");
            });

        });
