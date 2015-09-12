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
var createGroupsetCalendar = function(store, today, calendarSize, relativeStartDaysInPast, callback) {

  var firstDayOfCalendar = new Date(today.getTime());
  firstDayOfCalendar.setDate(today.getDate() - relativeStartDaysInPast);

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
       var promiseArray = store.query('connection',{ 'startDate': id });

       return new Ember.RSVP.Promise(
         function(resolve) {
           promiseArray.then(function(a){resolve(wrapConnectionsIntoGroupset(a));});
         }
       );
     },

     // generate Groupsets for the next x days in advance
     findAll: function(store) {

        return createGroupsetCalendar(
           store,
           TODAY,
           CALENDAR_SIZE,
           DAYS_INTO_THE_PAST,
           wrapConnectionsIntoGroupset
         );
     },

    setCalendarProperties: function(today, daysIntoPast, daysOverAll) {
      TODAY = today;
      DAYS_INTO_THE_PAST = daysIntoPast;
      CALENDAR_SIZE = daysOverAll;
    }

});
