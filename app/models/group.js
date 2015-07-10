import DS from 'ember-data';
import Ember from 'ember';
import Mediator from '../app';

/* global smUtilities */

var GroupModel = DS.Model.extend( Ember.Enumerable,
    {

    recycled: false,

    lastMoved: DS.attr('number', {defaultValue: 0 }),

    initialized: DS.attr('boolean', {defaultValue:true}),

    priorityByUser: DS.attr('number', {defaultValue: 0 }),

    // results are pushed manually into group, so there is no asynchronity here
    results: DS.hasMany('result'),

    groupset: DS.belongsTo('groupset'),

    enabledResults: function() {
      return this.get('results').filter(function(r){return r.get('enabled');});
    }.property('results.@each.enabled'),

      priorityBySystem: function() {
        return (this.get('results').get('length') === 0) ?
            0 :
            this.get('results')
                .uniq()
                .reduce(
                    function (currentMax, n){
                        return Math.max(currentMax,n.get('priority'));
                    },0);
    }.property('results.@each.priority'),

    priorityByRuleSet: function() {

        var priority = 0;
        var holdsPriority = function(n){return n.get('enabled') && !n.get('connection.ignorePriority');};
        var sumUpPriorities = function(currentPriority,currentResult) {
            var resultPrio = currentResult.get('connection.priority');
            if (
                resultPrio != null
                ) {
                currentPriority += parseInt(resultPrio);
            }
            return currentPriority;
        };

        var results = this.get('results').filter(holdsPriority);

        var resultCount = results.get('length');

        if (resultCount === 0) { return 0; }

        var prioritySum = results.reduce(sumUpPriorities,0);

        priority = Math.floor(prioritySum/resultCount);

        return priority;
    }.property('results.@each.connectionPriority', 'results.@each.connectionIgnorePriority', 'results.@each.enabled'),

    _SourceNotSetException: { name: 'PatternSourceNotSetException', message: 'PatternSource Not Set in Connection.' },
    _InvalidArgumentException: { name: 'InvalidArgumentException', message: 'Argument is not from the correct type.' },

    length: function(){return this.get('results.length');}.property('results'),

    nextObject: function(index) {
        return this.get('results').nextObject(index);
    },

    pushObjects: function(objects) {
        this.enumerableContentWillChange();
        this.get('results').pushObjects(objects);
        this.enumerableContentDidChange();
    },

    title: function() {
        var selected = this.get('results').filter(
                            function(item){
                                if (item && item.get('title') && item.get('title').trim()) { return true; }
                            }).get('firstObject');
        return selected ? selected.get('title') : "";
    }.property('results.@each.title','length'),

    subtitle: function() {
        var selected = this.get('results').filter(
            function(item){
                return !Ember.isEmpty(item.get('subtitle'));
            }).get('firstObject');
        return selected ? selected.get('subtitle') : "";
    }.property('results.@each.subtitle'),

    price: function() {
        var selected = this.get('results').filter(
            function(item){
                return !Ember.isEmpty(item.get('price'));
            }).get('firstObject');
        return selected ? selected.get('price') : "";
    }.property('results.@each.price'),

    location: function() {
        var selected = this.get('results').filter(
            function(item){
                return !Ember.isEmpty(item.get('location'));
            }).get('firstObject');
        return selected ? selected.get('location') : "";
    }.property('results.@each.location'),

    startDate: function() {
        var selected = this.get('results').filter(
            function(item){
                return !Ember.isEmpty(item.get('start'));
            }).get('firstObject');
        return selected ? selected.get('start') : "";
    }.property('results.@each.start'),

    reducedLocation: function() {
        return smUtilities.returnCompareString(this.get('location'));
    }.property('location'),

    reducedTitle: function() {
        return smUtilities.returnCompareString(this.get('title'));
    }.property('title'),

    reducedSummary: function() {
        return smUtilities.reducedSummary(this.get('title'),this.get('location'));
    }.property('title','location'),

    connections: function() {
        return this.get('results')
          .map(function(n){return n.get('connection');})
          .filter(function(n) {return n instanceof Mediator.Connection;});
    }.property('results.@each.connection'),

    pictures: function() {
      return this.flattenProperties(this.get('results.@each.pictures'));
    }.property('results.@each.pictures'),

    links: function() {
      return this.flattenProperties(this.get('results.@each.links'));
    }.property('results.@each.links'),

    categories: function() {
      return this.flattenProperties(this.get('results.@each.categories').map(
        function(n) {
          try {
            return n.split(Mediator.constants._RESULT_CATEGORY_SPLITTER);
          } catch (e) {
            return [];
          }
        })
      );
    }.property('results.@each.categories'),

    flattenProperties: function(propertyEnum) {
      var result = propertyEnum
        .filter(function(n){return !Ember.isEmpty(n);})
        .map(function(n){return n.toArray();});
      return result.length > 0 ? result.reduce(this.flattenArray).uniq():result;
    },

    flattenArray : function(a, b) {return a.concat(b);},

    priority: function() {
      return (this.get('priorityByRuleSet') +
          this.get('priorityBySystem') +
          this.get('priorityByUser'));
    }.property('priorityByRuleSet', 'priorityBySystem', 'priorityByUser'),

    enabled: function() {

      var isEnabled = function(item) {return item.get("enabled");};

      var anySubEnabled = this.get('results').any(isEnabled);
      return !this.get('recycled') && anySubEnabled;
    }.property('recycled','results.@each.enabled')

});

// delete below here if you do not want fixtures
GroupModel.reopenClass({
  FIXTURES : [

  {
    id: 0,

    /*title: 'foo',*/

    recycled: false,

    initialized: false,

    priorityByRuleSet: 100,

    priorityByUser: 100,

    priorityBySystem: 100,

    results: [1,2]

  },

  {
    id: 1,

   /* title: 'foo',*/

    recycled: 'foo',

    initialized: 'foo',

    priorityByRuleSet: 'foo',

    priorityByUser: 'foo',

    priorityBySystem: 'foo',

    results: undefined

  }

]
});

export default GroupModel;

