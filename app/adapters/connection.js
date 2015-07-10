import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({

    findQuery: function(store, type, query, array) {

        var startDateString = query.startDate;
        var startDate = new Date(startDateString);
        console.log("Asking for connections with startDate "+query.startDate+" and array " + array + " from store " + store);

        return new Ember.RSVP.Promise(function(resolve, reject){
            var results = [];

            store.find('source').then(function(sources) {
                console.log("found |"+sources.get('length')+"| sources ");
                sources.forEach(
                    function (rootSource) {

                        var calculatedId = rootSource.get('id') + "-"+startDateString;
                        var isActive = rootSource.get('active');
                        var resultUrl = "/api"+"/results/"+rootSource.get('id')+"/"+startDateString+"/";

                        var connectionObject = {
                            'id': calculatedId,
                            'source': rootSource,
                            'active': isActive,
                            'startDate': startDate,
                            'links' : {'results':resultUrl}
                        };

                        var tmpConnection = store.createRecord("connection", connectionObject);
                        rootSource.get('connections').then(function(c){c.pushObject(tmpConnection);});

                        results.push(connectionObject);
                        console.log("["+results.length+"] foreach created |"+rootSource+"| on date |"+startDate+"|from source" + rootSource);
                    }
                );

                resolve({"connections":results});
            },reject);
        });
    },

   /**
   * Should manage the lazy retrieval of the results and add a group to every record
   */
  findHasMany: function(store, snapshot, url, relationship) {

    console.log("in FINDHASMANY with snapshot "+snapshot.type+" url "+url+"relationship "+relationship.type);
     var initialPromise =  this._super(store, snapshot, url, relationship);

     /*jslint eqeq: true*/
    if (relationship.type != "mediator@model:result:") {
      return initialPromise;
    }
     else {
      console.log("creating new promise for snapshot "+snapshot.id);
      return new Ember.RSVP.Promise(function (resolve) {
        // console.log("in new promise");
        initialPromise.then(function (something) {

          something.results = Ember.makeArray(something.results);
          var groupSetId = snapshot.belongsTo('groupset', {id: true});

          something.results.map(
            function (result) {

              if (Ember.isEmpty(result.group)) {

                var newGroupId = result.id;

                var group = store.push('group', {
                  "id": newGroupId,
                  "groupset": groupSetId
                });

                result.group = group;
                return result;
              }
            });
          // console.log("Resolving soething now");
          resolve(something);

        });
      });
    }
  }

});
