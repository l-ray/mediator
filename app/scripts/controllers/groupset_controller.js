Mediator.GroupsetController = Ember.ObjectController.extend({

    addResultsAsGroups: function() {
        var store = this.store;
        var groups = this.get("groups");
        this.get('connections').forEach(
            function(connection) {
                if(connection.get('status') == Mediator.ConnectionStatus.RECEIVING) {
                    connection.get('results').forEach(
                        function (result) {
                            if (Ember.isEmpty(result.get('group'))) {
                                var tmpGroup = store.createRecord('group');
                                tmpGroup.get('results').then(function(n){n.pushObject(result);console.log("results per group:"+ n.get('length'));});
                                result.set('group', tmpGroup);
                                groups.pushObject(tmpGroup);
                            }
                        }
                    );
                }
            }
        );
    }.observes('connections.@each.status'),

    cleanUp: function() {
        console.log("started cleaning up");

        var matrixLength = this.get('groups.length');
        console.log("Matrix-length"+matrixLength);

        var groups = this.get('groups');

 /*       groups.forEach(function(group){
            var group1 = group;
            groups.forEach(function(group2){
                var group2 = group2;

                if ( group1 != group2
                    && group2.get('initialized')
                    && this.__isSimilar(group1, group2)) {

                    group1.set('initialized', false);
                    group1.pushObjects(group2.get('results'));
                    this.get("groups").removeObject(group2);
                    j--;
                }

            })
        })
*/

        for (var i=0; i < this.get('groups.length'); i++) {

            var currentI = this.get("groups").toArray()[i];

            for (var j=0; j < this.get('groups.length'); j++) {

                var currentJ = this.get("groups").toArray()[j];
                console.log("currentJ:"+currentJ);

                if ( i!=j
                    && currentJ.get('initialized')
                    && this.__isSimilar(currentI, currentJ)) {

                    currentI.set('initialized', false);
                    currentI.pushObjects(currentJ.get('results').toArray());
                    this.get("groups").removeObject(currentJ);
                    j--;
                }
            }

        }
        //this.enumerableContentDidChange();
        console.log("group has |"+this.get('groups.length')+"| elements");
    }.observes('groups.length'),

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

});