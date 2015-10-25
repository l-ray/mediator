import DS from 'ember-data';
import Ember from 'ember';


var DAYS_INTO_THE_PAST = 2;
var CALENDAR_SIZE = 16;
var TODAY = new Date();

var wrapConnectionsIntoGroupset = function(connections) {

  Ember.assert("expect multiple connections for every start date ", connections.get('length') > 0);
  var startDates = connections.objectAtContent(0).get('startDate').toISOString().substr(0, 10);
  var connectionsAsId = connections.map(function (con) {return con.get('id');});

  return {
    'date': startDates,
    'id': startDates,
    'connections': connectionsAsId
  };
};

// generate Groupsets for the next x days in advance
var createGroupsetCalendar = function(store, firstDayOfCalendar, calendarSize, callback) {

  var calendar = Array.apply(null, new Array(calendarSize))
    .map(function(cur,index){
      var newDay = new Date(firstDayOfCalendar.getTime());
      newDay.setDate(firstDayOfCalendar.getDate()+index);
      return  newDay;
    }
  );

  var proxyArrays = calendar.map(function(item) {

    var itemId = item.toISOString().substr(0,10);
    return store.query('connection',{ 'startDate': itemId });
  });

  return new Ember.RSVP.map(proxyArrays,callback);
};

export default DS.Adapter.extend({

     // generate the complete groupset for the given ID including
     // connections
     findRecord: function(store, type, id) {

       // fill up with connections
       var conPromise = store.query('connection',{ 'startDate': id });

       return new Ember.RSVP.Promise(
         function(resolve) {
           conPromise.then(function(a){resolve(wrapConnectionsIntoGroupset(a));});
         }
       );
     },

     query:function(store, type, query) {

       Ember.assert("expect startDate as part of the query ", query.startDate !== undefined);
       Ember.assert("expect calendarSize as part of the query ", query.calendarSize !== undefined);

       return createGroupsetCalendar(
         store,
         query.startDate,
         query.calendarSize,
         wrapConnectionsIntoGroupset
       );
     },

     // generate Groupsets for the next x days in advance
     findAll: function(store) {

       var firstDayOfCalendar = new Date(TODAY.getTime());
       firstDayOfCalendar.setDate(TODAY.getDate() - DAYS_INTO_THE_PAST);

       return createGroupsetCalendar(
           store,
           firstDayOfCalendar,
           CALENDAR_SIZE,
           wrapConnectionsIntoGroupset
         );
     },

    setCalendarProperties: function(today, daysIntoPast, daysOverAll) {
      TODAY = today;
      DAYS_INTO_THE_PAST = daysIntoPast;
      CALENDAR_SIZE = daysOverAll;
    }

});
