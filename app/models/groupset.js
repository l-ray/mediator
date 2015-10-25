import DS from 'ember-data';
import Ember from 'ember';

const _WEEKDAY = {Saturday:6,Sunday:0};

var isDayOfTheWeek = function(dependentKey, weekday) {
  return Ember.computed(dependentKey,function handler() {
    var comparisonDate = Ember.get(this, dependentKey);
    return comparisonDate instanceof Date ? comparisonDate.getDay() === weekday : false;
  });
};

var GroupSetModel =  DS.Model.extend(Ember.Enumerable,{

    date: DS.attr('date', { async: false }),

    groups: DS.hasMany('group', { async: false }),

    // as connections rely on sources, that has to be loaded asynchronous, this might have to async
    connections: DS.hasMany('connection', { async: true }),

    length: function(){return this.get('groups.length');}.property('groups'),

    nextObject: function(index) {
        return this.get('groups').nextObject(index);
    },

    isSaturday: isDayOfTheWeek('date',_WEEKDAY.Saturday),

    isSunday: isDayOfTheWeek('date',_WEEKDAY.Sunday),

    isToday: function() {
      var givenDate = this.get("date");
      var reducedToDay = function(date){return ~~(date.getTime()/(1000*60*60*24));};
      return givenDate instanceof Date ? reducedToDay(givenDate) === reducedToDay(new Date()) : false;
    }.property('date')

});

export default GroupSetModel;
