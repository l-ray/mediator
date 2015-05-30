import DS from 'ember-data';
import Ember from 'ember';

export default  DS.Adapter.extend({

     DAYS_INTO_THE_PAST : 2,
     CALENDAR_SIZE : 16,

     // generate the complete groupset for the given ID including
     // connections
     // TODO: rewrite like findAll
     find: function(store, type, id) {

         var splitDate = id.split("-");

         var newGroupset = store.createRecord( type, {
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

         return new Ember.RSVP.Promise(function(resolve) {resolve(newGroupset);});
     },

     // generate Groupsets for the next x days in advance
     findAll: function(store) {



        var firstDayOfCalendar = new Date();
         firstDayOfCalendar.setDate(new Date().getDate() - this.DAYS_INTO_THE_PAST);

         console.log("CReated "+firstDayOfCalendar);

         var calendar = Array.apply(null, new Array(this.CALENDAR_SIZE))
             .map(function(cur,index){
                 var newDay = new Date();
                 newDay.setDate(firstDayOfCalendar.getDate()+index);
                 return  newDay;
             }
         );

         console.log("Sure, My calendar says: "+calendar);

         var proxyArrays = calendar.map(function(item) {

             var itemId = item.toISOString().substr(0,10);

            console.log("finding connections for groupset "+itemId);

            return store.find('connection',{ 'startDate': itemId });
         });


       return new Ember.RSVP.map(proxyArrays,function(connections) {
           Ember.assert("Multiple connections for every start date ", connections.get('length') > 0);
           var startDates = connections.objectAtContent(0).get('startDate').toISOString().substr(0,10);
           var connectionsAsId = connections.map(function(con){return con.get('id');});
           return {
             'date' : startDates,
             'id'   : startDates,
             'connections': connectionsAsId
           };
       });
     }

});
