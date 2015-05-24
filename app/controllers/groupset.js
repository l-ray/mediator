import Ember from 'ember';
import Mediator from 'app';
import smSmithWaterman from 'smSmithWaterman';
import smQGram from 'smQGramDistance';

export default Ember.ObjectController.extend({

    addResultsAsGroups: function() {
        var groups = this.get("groups");
        this.get('connections').forEach(
            function(connection) {
                if(connection.get('status') === Mediator.ConnectionStatus.RECEIVING) {
                    connection.get('results').forEach(
                        function (result) {
                            console.log("working on result:"+result.get('id'));
                            if (Ember.isEmpty(result.get('group'))) {
                                groups.pushObject(
                                    this.__produceNewGroupForResult(result)
                                );
                            }
                        },
                        this
                    );
                    connection.set('status',Mediator.ConnectionStatus.IDLE);
                }
            },
            this
        );
    },

    processFreshIncomingResults: function(){
        Ember.run.once(this, 'addResultsAsGroups');
    }.observes('connections.@each.status'),

    __produceNewGroupForResult: function(result) {
        var store = this.store;
        var tmpGroup = store.createRecord('group');
        var tmpGroupResults = tmpGroup.get('results');
        tmpGroupResults.pushObject(result);
        result.set('group', tmpGroup);
        return tmpGroup;
    },

    processSimilarityMeasurement: function() {

        var model = this.get('model');
        for (var i=0; i < model.get('groups.length'); i++) {

            var currentI = model.get("groups").toArray()[i];

            for (var j=0; j < model.get('groups.length'); j++) {

                var currentJ = model.get("groups").toArray()[j];

                if ( i!==j &&
                  currentJ.get('initialized') &&
                  this.__isSimilar(currentI, currentJ)) {

                    currentI.set('initialized', false);
                    currentI.pushObjects(currentJ.get('results').toArray());
                    currentI.enumerableContentDidChange();

                    model.get("groups").removeObject(currentJ);
                    model.enumerableContentDidChange(currentJ);
                     j--;
                }
            }

        }
    },

    cleanUp: function() {
        Ember.run.once(this, 'processSimilarityMeasurement');
    }.observes('groups.length'),

    // retrieves similarity of two given groups
    __isSimilar: function(patternResultGroup1, patternResultGroup2) {

        if (patternResultGroup1 === patternResultGroup2) {
            return true;
        }

        var ratio;

        if (this.__isSimilarBecauseOfIdenticalPictures(patternResultGroup1, patternResultGroup2)) {
          return true;
        }

        var coarseGrain1 = smQGram.similarity(
            patternResultGroup1.get("reducedSummary"),
            patternResultGroup2.get("reducedSummary")
        );

        var similarityFactor = 0;

        if ((coarseGrain1) > Mediator.constants._CONST_QGRAM_RATIO) {
          //matrix[i][j] =
          similarityFactor =
            (smSmithWaterman.similarity(
              patternResultGroup1.get('reducedSummary'),
              patternResultGroup2.get('reducedSummary')
            )
            );
        } else {
        //matrix[i][j] =
            similarityFactor = 0;
        }
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
        if (list1.length === 0) {return false;}

        var list2 = patternResultGroup2.get('pictures').mapBy('url').uniq();
        if (list2.length === 0) {return false;}

        var concatList = list1.concat(list2);

        return (concatList.uniq().length < concatList.length);
    },

});
