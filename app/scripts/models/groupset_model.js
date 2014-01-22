/*global Ember*/

Mediator.Groupset = DS.Model.extend(Ember.Enumerable,{

    date: DS.attr('date', {defaultValue:new Date()}),

    groups: DS.hasMany('group'),

    length: function(){return this.get('groups').get('length');}.property('groups'),

    nextObject: function(index) {
        return this.get('groups').nextObject(index);
    },

    sortingStrategy: function(a) {return (a.get("priority") instanceof Function)?-a.get("priority"):0;},

    setElementsWithCategoryToRecycled: function(item) {
        this.groups
            .findAll(function(s){
                    return s.get("categories").collect(
                        function(s) {return s.toLowerCase();}
                    ).indexOf(item.toLowerCase()) != -1;
            }).each(function(n) {n.set("recycled",true);});
    },

    cleanUp: function() {
        var matrixLength = this.groups.get('length');
        var matrix = new Array(matrixLength);

        for (var i=0; i<this.groups.get('length'); i++) {
            matrix[i] = new Array(this.groups.get('length'));

            for (var j=0; j < this.groups.get('length'); j++) {

                if ( i!=j
                    && this.get("groups").toArray()[j].initialized
                    && this.__isSimilar(this.get("groups").toArray()[i], this.get("groups").toArray()[j])) {

                    this.get("groups").toArray()[i].initialized= false;
                    this.get("groups").toArray()[i].pushObjects(this.get("groups").toArray()[j].get('results'));
                    this.remove(this.get("groups").toArray()[j]);
                    j--;
                }
            }
        }

        try {this.update.defer();} catch (e) {alert(e);};
    },

    // retrieves similarity of two given groups
    __isSimilar: function(patternResultGroup1, patternResultGroup2) {

        var ratio;

        if (this.__isSimilarBecauseOfIdenticalPictures(patternResultGroup1, patternResultGroup2))
            return true;

        var coarseGrain1 = smQGram.similarity(
            patternResultGroup1.get("reducedSummary"),
            patternResultGroup2.get("reducedSummary")
        );

        var similarityFactor = 0;

        // if titles totally fail, we can skip in depth analysis of second value
        /*if (coarseGrain1 >= Mediator.constants._CONST_QGRAM_LEVEL1_RATIO)
         coarseGrain2 = QGramsDistance.getSimilarity(patternResultGroup1.getLocationCompareString(), patternResultGroup2.getLocationCompareString());
         */
        if ((coarseGrain1) > Mediator.constants._CONST_QGRAM_RATIO)
        //matrix[i][j] =
            similarityFactor =
                (smSmithWaterman.similarity(
                    patternResultGroup1.get('reducedSummary'),
                    patternResultGroup2.get('reducedSummary')
                )
                    );
        else
        //matrix[i][j] =
            similarityFactor = 0;

        //ratio = matrix[i][j];
        ratio = similarityFactor;

        if ((ratio > Mediator.constants._CONST_LEVENSHTEIN_RATIO)) {
            return true;
        } else {

            if (ratio > Mediator.constants._CONST_LEVENSHTEIN_RATIO_SECOND_CHANCE) {
                ratio =
                    ((smSmithWaterman.similarity(
                        patternResultGroup1.get('reducedTitle'),
                        patternResultGroup2.get('reducedTitle')
                    ) +
                        smSmithWaterman.similarity(
                            patternResultGroup1.get('reducedLocation'),
                            patternResultGroup2.get('reducedLocation'))
                        ) /2 );
            }

            return (ratio > Mediator.constants._CONST_LEVENSHTEIN_RATIO);
        }
    },

    __isSimilarBecauseOfIdenticalPictures:function(patternResultGroup1, patternResultGroup2) {

        var list1 = patternResultGroup1.get('pictures').mapBy('url');
        if (list1.length == 0) return false;

        var list2 = patternResultGroup2.get('pictures').mapBy('url').uniq();
        if (list2.length == 0) return false;

        var concatList = list1.concat(list2);

        return (concatList.uniq().length < concatList.length);
    },

    sort: function() {
        this.elements = this.get("groups").sortingStrategy(this.sortingStrategy);
    }

});

// delete below here if you do not want fixtures
Mediator.Groupset.FIXTURES = [
  
  {
    id: 0,
    
    date: 'foo'
    
  },
  
  {
    id: 1,
    
    date: 'foo'
    
  }
  
];
