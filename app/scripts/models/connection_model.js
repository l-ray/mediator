/*global Ember*/
Mediator.Connection = DS.Model.extend({
    startDate: DS.attr('date'),

    endDate: DS.attr('date'),

    status: DS.attr('string')

    //source: DS.belongsTo('source')
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
    
    startDate: 'foo',
    
    endDate: 'foo',
    
    status: 'foo',

    source: undefined
    
  },
  
  {
    id: 1,
    
    startDate: 'foo',
    
    endDate: 'foo',
    
    status: 'foo',

    source: undefined
    
  }
  
];
