import DS from 'ember-data';
import Ember from 'ember';
import Mediator from '../app';

export default DS.RESTAdapter.extend({

    findQuery: function(store, type, query, array) {

        var startDateString = query.startDate;
        var startDateArray= startDateString.split("-");
        var startDate = new Date(startDateArray[0],startDateArray[1],startDateArray[2]);
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
    }

  /**
  findHasMany: function(store, record, url) {
        console.log("Called findHasMany with record |"+record+"| and url |"+url+"|");
      return DS.RESTAdapter.prototype.findHasMany(store, record, url);
    }
   **/

});
