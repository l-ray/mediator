import DS from 'ember-data';

/*global Ember*/

var ConnectionModel = DS.Model.extend(Ember.Enumerable, {

    startDate: DS.attr('date'),

    endDate: DS.attr('date'),

    editMode: Boolean(false),

    active: DS.attr('boolean', {defaultValue: true}),

    source: DS.belongsTo('source'),

    length: Ember.computed.alias('results.length'),

    sourceUrl: Ember.computed.alias('source.url'),

    priority: Ember.computed.alias('source.priority'),

    ignorePriority: Ember.computed.alias('source.additional'),

    groupset: DS.belongsTo('groupset'),

    results: DS.hasMany('result', {'async':true}),

    nextObject: function(index) {
      var results = this.get('results');
      return results.nextObject(index);
    },

    name: function() {
      return this.get('source.name');
    }.property('source.name'),

    toString: function() {
        return "[Connection id:"+this.get('id')+"]";
    }
});

// delete below here if you do not want fixtures
ConnectionModel.reopenClass({

  FIXTURES : [

    {
      id: '0-2014-05-15',

      startDate: new Date(),

      endDate: new Date(),

      active: Boolean.true,

      source: 0,

      results: ['0']

    },

    {
      id: '1-2014-05-15',

      startDate: new Date(),

      endDate: new Date(),

      active: true,

      source: 1,

      results: ['1', '2']

    }

  ]
});

export default ConnectionModel;
