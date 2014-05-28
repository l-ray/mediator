// Mediator.GroupsetAdapter = DS.FixtureAdapter.extend({ });

 Mediator.GroupsetAdapter = DS.FixtureAdapter.extend({

     // generate the complete groupset for the given ID including
     // connections
     find: function(store, type, id) {
         var fixtures = this.fixturesForType(type),
             fixture;

         console.log("groupSet find");

         var startDate = id;

        console.log(store.find('connection',{ "startDate": startDate }));

         Ember.assert("Unable to find fixtures for model type "+type.toString(), fixtures);

         if (fixtures) {
             fixture = Ember.A(fixtures).findProperty('id', id);
         }

         if (fixture) {
             return this.simulateRemoteCall(function() {
                 return fixture;
             }, this);
         }
     },

     // generate Groupsets for the next x days in advance
     findAll: function(store, type) {

        var fixtures = this.fixturesForType(type);
         var results = [];

        fixtures.forEach(function(item) {

            var newGroupset = store.createRecord('groupset', {
                date : item.date,
                id: item.id
            });


            console.log("finding connections for groupset "+item.id);

            var promiseArray = store.find('connection',{ 'startDate': item.id });
            console.log("promiseArray"+promiseArray);
            promiseArray.then(
                function(connections){
                    console.log("Got the following connections:"+connections);

                    connections.forEach(
                        function(connection) {
                            console.log("Found connection:"+connection);

                            newGroupset.get('connections').then(function(n) {
                                console.log("pushed connection |"+connection+"| with source |"+connection.get('source')+"| into groupset "+newGroupset);
                                n.pushObject(connection);
                                connection.set('groupset', newGroupset);
                            });
                        }
                    )
                }, function(data) { console.log("something broke"+data);}
            );

            results.push(newGroupset);
        });

         Ember.assert("Unable to find fixtures for model type "+type.toString(), fixtures);

         console.log("Groupset all-find");

         return results;
     }

});