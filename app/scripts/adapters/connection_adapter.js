
Mediator.ConnectionAdapter = DS.RESTAdapter.extend({


    // if extending FixtureAdapter
    /*
    findQuery: function(store, type, query, array) {

        var startDateString = query.startDate;
        var startDateArray= startDateString.split("-");
        var startDate = new Date(startDateArray[0],startDateArray[1],startDateArray[2]);
        console.log("Asking for connections with startDate "+query.startDate+" and array " + array + " from store " + store);

        return DS.PromiseArray.create({
            promise: new Promise(function(resolve, reject){
                var results = [];
                console.log("in promise-land");
                store.findAll('source').then(function(sources) {
                    console.log("found |"+sources.get('length')+"| sources ");
                    sources.forEach(
                        function (rootSource) {
                            console.log("working with source"+rootSource.get('id'));
                            var calculatedId = rootSource.get('id') + "-"+startDateString;
                            var tmpConnection = store.createRecord(
                                Mediator.Connection,
                                {
                                    'id': calculatedId,
                                    'source': rootSource,
                                    'startDate': startDate,
                                    'links' : {'results':"/results/"}
                                }
                            );

                            results.push(tmpConnection);
                            console.log("["+results.length+"] foreach created |"+tmpConnection.get('source.id')+"| on date |"+startDate+"|from source" + rootSource);
                        }
                    );
                    console.log("left foreach with results"+results);
                    resolve(results);
                },reject);
            })
        });
    },*/

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
                        var resultUrl = "/results/"+rootSource.get('id')+"/"+startDateString+"/";

                        var connectionObject = {
                            'id': calculatedId,
                            'source': rootSource,
                            'startDate': startDate,
                            'links' : {'results':resultUrl}
                        };

                        var tmpConnection = store.createRecord(Mediator.Connection, connectionObject);
                        rootSource.get('connections').then(function(c){c.pushObject(tmpConnection);});

                        results.push(connectionObject);
                        console.log("["+results.length+"] foreach created |"+rootSource+"| on date |"+startDate+"|from source" + rootSource);
                    }
                );

                resolve({"connections":results});
            },reject);
        });
    },

    findHasMany: function(store, record, url) {
        console.log("Called findHasMany with record |"+record+"| and url |"+url+"|");
        return DS.RESTAdapter.prototype.findHasMany(store, record, url);
    }

});
