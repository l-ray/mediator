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

    results: DS.hasMany('result', { async: true }),

    disabled: function() {
        return ([Mediator.ConnectionStatus.WAITING, Mediator.ConnectionStatus.RECEIVING].contains(this.get('status'))).property('status');
    },

    length: function(){return this.get('results').get('length');}.property('results'),

    nextObject: function(index) {
        console.log("in next object"+index);
        return this.results[index];
    },

});

// probably should be mixed-in...
Mediator.Connection.reopen({
  // certainly I'm duplicating something that exists elsewhere...
  attributes: function(){
    var attrs = [];
    var model = this;
    Ember.$.each(Ember.A(Ember.keys(this.get('data'))), function(idx, key){
      var pair = { key: key, value: model.get(key) };
      attrs.push(pair);
    });
    return attrs;
  }.property()
});

// delete below here if you do not want fixtures
Mediator.Connection.FIXTURES = [
  
  {
    id: 0,
    
    startDate: new Date(),
    
    endDate: new Date(),

    active: true,
    
    status: Mediator.ConnectionStatus.WAITING,

    source: 0,

    results: [0]
    
  },
  
  {
    id: 1,
    
    startDate: new Date(),
    
    endDate: new Date(),

    active: false,
    
    status: Mediator.ConnectionStatus.IDLE,

    source: 1,

    results: [1, 2]
    
  }
  
];

