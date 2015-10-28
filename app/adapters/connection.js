import DS from 'ember-data';
import Ember from 'ember';

var generateConnectionsForDate = function(store, startDateString) {

  var startDate =new Date(startDateString);

  return function (rootSource) {
    var rootSourceId = rootSource.get('id');
    var calculatedId = rootSourceId + "-" + startDateString;
    var isActive = rootSource.get('active');
    var resultUrl = "/api" + "/results/" + rootSourceId + "/" + startDateString + "/";

    var connectionObject = {
      'id': calculatedId,
      'source': rootSourceId,
      'active': isActive,
      'startDate': startDate,
      'links': {'results': resultUrl}
    };

    // in case record already exists, retrieve it from cache.
    var tmpConnection = null;

    if (store.hasRecordForId("connection", calculatedId)) {
      tmpConnection = store.findRecord("connection", calculatedId);
    } else {
      tmpConnection = store.createRecord("connection", connectionObject);
    }

    var rootSourceConnectionsPromise = rootSource.get('connections');
    var fillRootSource = tmpCon => rootSourceConnectionsPromise.then(c => c.pushObject(tmpCon));

    if (tmpConnection instanceof Ember.RSVP.Promise){
      tmpConnection.then(fillRootSource);
    } else {
      fillRootSource(tmpConnection);
    }

    return connectionObject;
  };
};

export default DS.RESTAdapter.extend({

  query: function (store, type, query, array) {

    var toConnectionByDate = generateConnectionsForDate(store, query.startDate);

    console.log("Asking for connections with startDate " + query.startDate + " and array " + array + " from store " + store);

    return new Ember.RSVP.Promise(function (resolve, reject) {

        store.findAll('source', { reload: false }).then(
          function (sources) {
            console.log("found |" + sources.get('length') + "| sources ");
            var results = sources.map(toConnectionByDate);
            resolve({"connections": results});
          }, reject);

    });
  },

  /**
   * Should manage the lazy retrieval of the results and add a group to every record
   */
  findHasMany: function (store, snapshot, url, relationship) {

    console.log("in FINDHASMANY with snapshot " + snapshot.type + " url " + url + "relationship " + relationship.type);
    var initialPromise = this._super(store, snapshot, url, relationship);
    /*jslint eqeq: true*/
    if (relationship.type != "result") {
      return initialPromise;
    }
    else {

      return new Ember.RSVP.Promise(function (resolve) {
        initialPromise.then(function (something) {
          console.log("creating new promise for snapshot with "+something.results+"("+something.results.toArray().length+")");
          if (typeof something.results !== "undefined") {
            // something.results = Ember.makeArray(something.results);
            var groupSetId = snapshot.belongsTo('groupset', {id: true});

            something.results.map(
              function (result) {
                if (Ember.isEmpty(result.group)) {

                  var newGroupId = result.id;
                  store.push({
                    data: {
                      id: newGroupId,
                      type: 'group',
                      relationships: {
                        "groupset": {
                          data: {id: groupSetId, type: 'groupset'}
                        }
                      }
                    }
                  });
                  //debugger
                  result.group = newGroupId;
                  return result;
                }
                else {
                  console.log("Group is not empty");
                }
              });
          }
          console.log("Resolving something now");
          resolve(something);

        });
      });
    }
  }

});
