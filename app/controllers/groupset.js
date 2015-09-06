import Ember from 'ember';

/* global smSmithWaterman */
/* global smQGram */

var flattenProperties =  function(propertyEnum) {
  var flattenArray = function(a, b) {return a.concat(b);};
  var result = propertyEnum
    .filter(function(m){return !Ember.isEmpty(m);})
    .map(function(n){return n.toArray();});
  return result.length > 0 ? result.reduce(flattenArray):result;
};

var categoriesAsModel = function(localCategories, selectedCategories) {
  return Object.keys(localCategories).map(
    function(k){
      return {
        key : k,
        value : localCategories[k],
        'selected': selectedCategories.contains(k)
      };
    }
  );
};


export default Ember.Controller.extend({

  selectedCategories: [],

  doGrouping: Boolean(true),

  actions: {
    recycleCategory(item){
      this.removeSelectedCategory(item);
    },
    selectCategory(item){
      console.log("in selectCategory");
      this.addSelectedCategory(item);
    }
  },

  groups: function(){
    return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
      sortProperties: ['priority','title'],
      sortAscending: false,
      content: this.get('filteredGroups')
    });
  }.property('model.filteredGroups','selectedCategories.[]'),

  updateGroupSorting: Ember.observer('model.groups.[]', function() {
    if (this.get('doGrouping')) {
        Ember.run.throttle({

          model: this.get("model"),
          __isSimilar: this.__isSimilar,
          __isSimilarBecauseOfIdenticalPictures: this.__isSimilarBecauseOfIdenticalPictures,
          _CONST_LEVENSHTEIN_RATIO: 0.7,
          _CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE: 0.36,
          _CONST_QGRAM_RATIO: 0.61,
          _CONST_QGRAM_LEVEL1_RATIO: 0.5,
          _RESULT_CATEGORY_SPLITTER: ','
        }, this.processSimilarityMeasurement, 1000);
      }
  }),

  // expected, that model.groups.@each.enabled includes add/remove on groups-enumeration
  filteredGroups: function(){
    var groups = this.get('model.groups');
    return this.get('selectedCategories.length')===0 ?
      groups :
      groups.filter(
          c => this.get('selectedCategories').any(
              sc => c.get('categories').contains(sc)
          )
      );
  }.property('model.groups.@each.enabled','selectedCategories.[]'),

  addSelectedCategory: function(category) {
    this.get('selectedCategories').pushObject(category);
  },

  removeSelectedCategory: function(category) {
    this.get('selectedCategories').removeObject(category);
  },

  categories: function(){
    var categories= this.get('model.groups')
      .filterBy('recycled',false).mapBy('categories');
    categories = flattenProperties(categories);
    var counts = {};
    categories.forEach(element => counts[element] = (counts[element] || 0) + 1);
    return categoriesAsModel(counts, this.get('selectedCategories'));
  }.property('model.groups.@each.categories','model.groups.@each.recycled','selectedCategories.[]'),

  processSimilarityMeasurement: function() {

    var model = this.model;
    console.log("Starting similarity measurement with "+model.get('groups.length') );
    for (var i=0; i < model.get('groups.length'); i++) {

      var currentI = model.get("groups").toArray()[i];

      for (var j=0; j < model.get('groups.length'); j++) {

        var currentJ = model.get("groups").toArray()[j];
        console.log("Is similar " + (i !== j) + " - " + currentJ.get('initialized') );
        if (i !== j &&
          currentJ.get('initialized')) {
          console.log("is similar -> " + currentI.get("results.length") + " und "+currentJ.get("results.length")+" - pictures " + currentI.get('pictures').mapBy('url') + currentJ.get('pictures').mapBy('url'));
          if (this.__isSimilar(
              {
                id : currentI.get("id"),
                summary : currentI.get("reducedSummary"),
                title : currentI.get("reducedTitle"),
                location : currentI.get("reducedLocation"),
                pictures : currentI.get('pictures').mapBy('url').toArray()
              },
              {
                id : currentJ.get("id"),
                summary : currentJ.get("reducedSummary"),
                title : currentJ.get("reducedTitle"),
                location : currentJ.get("reducedLocation"),
                pictures : currentJ.get('pictures').mapBy('url').toArray()
              }
            )) {
            console.log("Yes, is similar");
            currentI.set('initialized', false);
            currentI.pushObjects(currentJ.get('results').toArray());
            currentI.enumerableContentDidChange();

            model.get("groups").removeObject(currentJ);
            model.enumerableContentDidChange(currentJ);
            j--;
          }
        }
      }

    }
  },

  // retrieves similarity of two given groups
  __isSimilar: function(patternResultGroup1, patternResultGroup2) {

    if (patternResultGroup1.id === patternResultGroup2.id) {
      return true;
    }

    var ratio;

    if (this.__isSimilarBecauseOfIdenticalPictures(patternResultGroup1.pictures, patternResultGroup2.pictures)) {
      return true;
    }

    console.log("Comparing summary |"+patternResultGroup1.summary+"| und |"+patternResultGroup2.summary+"|");
    var coarseGrain1 = smQGram.similarity(
      patternResultGroup1.summary,
      patternResultGroup2.summary
    );

    var similarityFactor = 0;

    if ((coarseGrain1) > this._CONST_QGRAM_RATIO) {
      //matrix[i][j] =
      similarityFactor =
        (smSmithWaterman.similarity(
            patternResultGroup1.summary,
            patternResultGroup2.summary
          )
        );
    } else {
      //matrix[i][j] =
      similarityFactor = 0;
    }
    //ratio = matrix[i][j];
    ratio = similarityFactor;

    if ((ratio > this._CONST_LEVENSHTEIN_RATIO)) {
      return true;
    } else {

      if (ratio > this._CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE) {
        ratio =
          ((smSmithWaterman.similarity(
              patternResultGroup1.title,
              patternResultGroup2.title
            ) +
            smSmithWaterman.similarity(
              patternResultGroup1.location,
              patternResultGroup2.location)
          ) /2 );
      }
      console.log("similarity ratio: "+ ratio + " with Levenshtein setting: "+this._CONST_LEVENSHTEIN_RATIO);
      return (ratio > this._CONST_LEVENSHTEIN_RATIO);
    }
  },

  __isSimilarBecauseOfIdenticalPictures:function(list1, list2) {

    if (!Ember.isArray(list1) || list1.length === 0) {return false;}

    if (!Ember.isArray(list2) || list2.length === 0) {return false;}

    var concatList = list1.concat(list2);

    return (concatList.uniq().length < concatList.length);
  }
});
