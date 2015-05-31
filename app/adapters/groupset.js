import DS from 'ember-data';
import Ember from 'ember';

export default  DS.Adapter.extend({

     DAYS_INTO_THE_PAST : 2,
     CALENDAR_SIZE : 16,
     TODAY: new Date(),

     // generate the complete groupset for the given ID including
     // connections
     find: function(store, type, id) {

       // fill up with connections
       var promiseArray = store.findQuery('connection',{ 'startDate': id });

       var wrapConnectionsIntoGroupset = this.wrapConnectionsIntoGroupset;
         return new Ember.RSVP.Promise(
           function(resolve) {
             promiseArray.then(function(a){resolve(wrapConnectionsIntoGroupset(a));});
           }
         );
     },

     // generate Groupsets for the next x days in advance
     findAll: function(store) {

       var firstDayOfCalendar = new Date(this.TODAY.getTime());
       firstDayOfCalendar.setDate(this.TODAY.getDate() - this.DAYS_INTO_THE_PAST);

       var calendar = Array.apply(null, new Array(this.CALENDAR_SIZE))
             .map(function(cur,index){
                 var newDay = new Date(firstDayOfCalendar.getTime());
                 newDay.setDate(firstDayOfCalendar.getDate()+index);
                 return  newDay;
             }
         );

         var proxyArrays = calendar.map(function(item) {

            var itemId = item.toISOString().substr(0,10);
            return store.find('connection',{ 'startDate': itemId });
         });

       return new Ember.RSVP.map(proxyArrays,this.wrapConnectionsIntoGroupset);
     },

     wrapConnectionsIntoGroupset:function(connections) {

       Ember.assert("Multiple connections for every start date ", connections.get('length') > 0);
       var startDates = connections.objectAtContent(0).get('startDate').toISOString().substr(0, 10);
       var connectionsAsId = connections.map(function (con) {return con.get('id');});

       return {
         'date': startDates,
         'id': startDates,
         'connections': connectionsAsId
       };
     }

});
