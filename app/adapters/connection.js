import DS from 'ember-data';
import Ember from 'ember';
import Mediator from '../app';

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
                            'status'   : Mediator.ConnectionStatus.IDLE,
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
    console.log("Called connection findHasMany with snapshot |"+snapshot+
      "| and url |"+url+"| and relationship |"+relationship+"|");
    var initialPromise =  this._super(store, snapshot, url, relationship);
    return new Ember.RSVP.Promise(function (resolve) {
      //var store = this.store;
      initialPromise.then(function (something) {
        var groupSetId = snapshot.belongsTo('groupset', {id: true});
        var groupSet = store.find('groupset', groupSetId);

        groupSet.then(function (gs) {

          console.log("groupset " + gs + " with something " + something);

          something.results.map(
            function (result) {
              console.log("working on result:" + result.id + " with group " + result.group);
              if (Ember.isEmpty(result.group)) {
                console.log("group is empty");
                var newGroupId = result.id;
                var group = store.push('group',{
                  "id":newGroupId,
                  "groupset":groupSetId

                });

                console.log("pushed updated group");
                result.group = group;
                console.log("added group to groups "+result.group+" with group "+group.get('id'));
                return result;
              }
            });
          resolve(something);
        });
      });
    });
  },


  /**
   * Should manage the lazy retrieval of the results and add a group to every record
   */
  findBelongsTo: function(store, snapshot, url, relationship) {
    console.log("Called connection findBelongsTo with snapshot |"+snapshot +
      "| and url |"+url+"| and relationship |"+relationship+"|");
    return this._super(store, snapshot, url, relationship);
  }

});
