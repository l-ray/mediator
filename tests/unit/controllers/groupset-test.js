/* jshint expr:true */
import { expect, assert } from 'chai';
import Ember from 'ember';
import {
  describeModule,
  it
} from 'ember-mocha';

/* global smSmithWaterman */
/* global smQGram */
/* global smUtilities */

describeModule(
  'controller:groupset',
  'GroupsetController',
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
      var subject = this.subject();
      console.log("The store is ..."+subject);
      expect(subject).to.be.ok;
    });

    it('should recognize identical picture urls.', function(){

      var controller = this.subject();

      expect(
        controller.__isSimilarBecauseOfIdenticalPictures(
          ["http://test.de/lol.jpg","http://test.de/ignoreThis.jpg"],
          ["http://test.de/lol.jpg"]
        )
      ).to.be.equal(true);

    });

    it('should recognize not identical picture urls.', function(){
      //    Ember.run( function() {

      var controller = this.subject();

      expect(
        controller.__isSimilarBecauseOfIdenticalPictures(
          ["http://test.de/lol.jpg"],
          ["http://test.de/lalal.jpg"]
        )
      ).to.be.equal(false,"Veranstaltung nicht aehnlich");

      //   });
    });

    it('should recognize similar datasets', function(){

      var controller = this.subject();

      expect(smUtilities).to.be.ok;
      expect(smUtilities.reducedSummary).to.be.ok;

      var context = {
        __isSimilarBecauseOfIdenticalPictures:controller.__isSimilarBecauseOfIdenticalPictures,
        _CONST_LEVENSHTEIN_RATIO : 0.7,
        _CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE : 0.36,
        _CONST_QGRAM_RATIO : 0.61,
        _CONST_QGRAM_LEVEL1_RATIO : 0.5
      };

      expect(controller.__isSimilar.call(context,
        {id:"1",title:'test1', summary:'test1'},
        {id:"2",title:'test2', summary:'test2'}
      )).to.be.equal(true,
        "results with similar title");

      expect(controller.__isSimilar.call(context,
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

      expect(controller.__isSimilar.call(context,
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

      expect(controller.__isSimilar.call(context,
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

      var controller = this.subject();
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

      controller.processSimilarityMeasurement.call(
        {
          model:model,
          __isSimilar: controller.__isSimilar,
          __isSimilarBecauseOfIdenticalPictures:controller.__isSimilarBecauseOfIdenticalPictures,
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

    it("should return categories with their number of existence", function() {

      var controller = this.subject();
      controller.set('doGrouping',false);
      var store = controller.get('store');
      var model = store.createRecord('groupset', {});

      controller.set('model', model);

      var item1 = store.createRecord('group', {"categories": ["punk","rock","folk"]});
      var item2 = store.createRecord('group', {"categories": ["punk"]});

      controller.get('model.groups').pushObjects([item1, item2]);
      controller.get('model.groups').enumerableContentDidChange();

      var underTest = controller.get('categories');
      expect(underTest).to.be.an('array').and.of.length(3);
      expect(underTest).to.contain({key:'punk',value: 2,selected:false});
      expect(underTest).to.contain({key:'rock',value: 1,selected:false});
      expect(underTest).to.contain({key:'folk',value: 1,selected:false});

    });

    it('returns empty array for empty categories', function() {
      var store = this.subject().get('store');

      var controller = this.subject();
      controller.set('doGrouping',false);
      var model = store.createRecord('groupset', {});
      controller.set('model', model);

      var item = store.createRecord('group', {});

      controller.get('model.groups').pushObject(item);
      controller.get('model.groups').enumerableContentDidChange();

      var underTest = controller.get('categories');

      expect(underTest).to.be.an('array').and.empty;
    });

    it('returns empty array for empty groupset', function() {
      var store = this.subject().get('store');

      var controller = this.subject();
      controller.set('model', store.createRecord('groupset', {}));

      expect(controller.get('categories')).to.be.an('array').and.empty;
    });

    it("should show all groups when no categories are selected", function() {

      var controller = this.subject();
      controller.set('doGrouping',false);
      var store = controller.get('store');
      var model = store.createRecord('groupset', {});

      controller.set('model', model);

      var item1 = store.createRecord('group', {"categories": ["punk","rock","folk"]});
      var item2 = store.createRecord('group', {"categories": ["punk"]});

      controller.get('model.groups').pushObjects([item1, item2]);
      controller.get('model.groups').enumerableContentDidChange();

      var underTest = controller.get('filteredGroups');
      expect(underTest.toArray()).to.be.instanceof(Array).and.have.length(2);
      expect(underTest.toArray(), "without set category").to.contain(item1);
      expect(underTest.toArray(), "without set category").to.contain(item2);

    });

    it("should show only groups with selected categories", function() {

      var controller = this.subject();
      var store = controller.get('store');
      var model = store.createRecord('groupset', {});

      controller.set('model', model);

      var item1 = store.createRecord('group', {"categories": ["punk","rock","folk"]});
      var item2 = store.createRecord('group', {"categories": ["punk"]});

      controller.get('model.groups').pushObjects([item1, item2]);
      controller.get('model.groups').enumerableContentDidChange();

      controller.addSelectedCategory("rock");

      var underTest = controller.get('filteredGroups');
      expect(underTest.toArray()).to.be.instanceof(Array).and.have.length(1);
      expect(underTest, "with category rock set").to.contain(item1);
      expect(underTest, "with category rock set").to.not.contain(item2);
    });

    it("should reset groups after removing selected categories", function() {

      var controller = this.subject();
      controller.set('doGrouping',false);
      var store = controller.get('store');
      var model = store.createRecord('groupset', {});

      controller.set('model', model);
      controller.set('selectedCategories',["rock"]);

      var item1 = store.createRecord('group', {title:"123","categories": ["punk","rock","folk"]});
      var item2 = store.createRecord('group', {title:"987","categories": ["punk"]});

      controller.get('model.groups').pushObjects([item1, item2]);
      controller.get('model.groups').enumerableContentDidChange();

      controller.removeSelectedCategory("rock");

      var underTest = controller.get('filteredGroups');
      expect(underTest.toArray(),underTest.map(k => k.get('title')).toArray()).to.be.instanceof(Array).and.have.length(2);
    });

  }
);
