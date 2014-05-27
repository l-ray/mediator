/*global Ember*/

Mediator.ConnectionStatus = {
    IDLE: "idle",
    WAITING: "waiting",
    RECEIVING: "receiving"
}

Mediator.Connection = DS.Model.extend(Ember.Enumerable, {

    startDate: DS.attr('date'),

    endDate: DS.attr('date'),

    status: DS.attr('string', {defaultValue: Mediator.ConnectionStatus.IDLE}),

    editMode: Boolean(false),

    active: DS.attr('boolean', {defaultValue: true}),

    source: DS.belongsTo('source'),

    length: Ember.computed.alias('results.length'),

    groupset: DS.belongsTo('groupset'),

    results: DS.hasMany('result', {'async':true}),

        // possibly not needed at all, as the adapter gives the new IDs
    //id: function() {[this.get('source.id'),this.get('startDate')].join('-')}.property('source.id','startDate'),

    nextObject: function(index) {
        return this.get('results').nextObject(index);
    },

    name: function() {
        return this.get('source.name');
    }.property('source.name'),

    sourceUrl: function() {
        return this.get('source.url');
    }.property('source.url'),

    disabled: function() {
        return ([Mediator.ConnectionStatus.WAITING, Mediator.ConnectionStatus.RECEIVING].contains(this.get('status'))).property('status');
    },

    toString: function() {
        return "[Connection id:"+this.get('id')+"]";
    }
});

// delete below here if you do not want fixtures
Mediator.Connection.FIXTURES = [
  
  {
    id: '0-2014-05-15',
    
    startDate: new Date(),
    
    endDate: new Date(),

    active: true,
    
    status: Mediator.ConnectionStatus.WAITING,

    source: 0,

    results: ['0']
    
  },
  
  {
    id: '1-2014-05-15',
    
    startDate: new Date(),
    
    endDate: new Date(),

    active: false,
    
    status: Mediator.ConnectionStatus.IDLE,

    source: 1,

    results: ['1', '2']
    
  }
  
];

