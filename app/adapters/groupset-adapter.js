import DS from 'ember-data';
import Ember from 'ember';

export default  DS.FixtureAdapter.extend({

     // generate the complete groupset for the given ID including
     // connections
     find: function(store, type, id) {

         var splitDate = id.split("-");

         var newGroupset = store.createRecord('groupset', {
             date : new Date(splitDate[0],splitDate[1],splitDate[2]),
             id: id
         });

         console.log("Creating Groupset "+splitDate);

         // fill up with connections
         var promiseArray = store.find('connection',{ 'startDate': id });

         promiseArray.then(
             function(connections){
                 console.log("Got the following connections:"+connections);

                 connections.forEach(
                     function(connection) {

                         newGroupset.get('connections').then(function(n) {
                             console.log("pushed connection |"+connection+"| with source |"+connection.get('source')+"| into groupset "+newGroupset);
                             n.pushObject(connection);
                             connection.set('groupset', newGroupset);
                         });
                     }
                 );
             }, function(data) { console.log("Could not retrieve connection."+data);}
         );

         return this.simulateRemoteCall(function() {
             return  newGroupset;
         }, this);
     },

     // generate Groupsets for the next x days in advance
     findAll: function(store, type) {

        var fixtures = this.fixturesForType(type);
        var results = [];

         var DAYS_INTO_THE_PAST = 2;
         var CALENDAR_SIZE = 16;

        var firstDayOfCalendar = new Date();
         firstDayOfCalendar.setDate(new Date().getDate() - DAYS_INTO_THE_PAST);

         console.log("CReated "+firstDayOfCalendar);

         var calendar = Array.apply(null, new Array(CALENDAR_SIZE))
             .map(function(cur,index){
                 var newDay = new Date();
                 newDay.setDate(firstDayOfCalendar.getDate()+index);
                 return  newDay;
             }
         );

         console.log("Sure, My calendar says: "+calendar);

         calendar.forEach(function(item) {

             var itemId = item.toISOString().substr(0,10);

             var newGroupset = store.createRecord('groupset', {
                date : item,
                id: itemId
            });


            console.log("finding connections for groupset "+itemId);

            var promiseArray = store.find('connection',{ 'startDate': itemId });

            promiseArray.then(
                function(connections){
                    console.log("Got the following connections:"+connections);

                    connections.forEach(
                        function(connection) {

                            newGroupset.get('connections').then(function(n) {
                                console.log("pushed connection |"+connection+"| with source |"+connection.get('source')+"| into groupset "+newGroupset);
                                n.pushObject(connection);
                                connection.set('groupset', newGroupset);
                            });
                        }
                    );
                }, function(data) { console.log("Could not retrieve connection."+data);}
            );

            results.push(newGroupset);
        });

         Ember.assert("Unable to find fixtures for model type "+type.toString(), fixtures);

         console.log("Groupset all-find");

         return results;
     }

});
