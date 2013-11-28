/*global Ember*/
Mediator.Source = DS.Model.extend({
    name: DS.attr('string'),

    url: DS.attr('string'),

    icon: DS.attr('string'),

    active: DS.attr('boolean'),

    additional: DS.attr('boolean'),

    priority: DS.attr('number'),

    connections: DS.hasMany('connection')
});

// probably should be mixed-in...
Mediator.Source.reopen({
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
Mediator.Source.FIXTURES = [
  
  {
    id: 0,
    
    name: 'foo',
    
    url: 'foo',
    
    icon: 'foo',
    
    active: 'foo',
    
    additional: 'foo',
    
    priority: 'foo',

    connections: undefined
    
  },
  
  {
    id: 1,
    
    name: 'foo',
    
    url: 'foo',
    
    icon: 'foo',
    
    active: 'foo',
    
    additional: 'foo',
    
    priority: 'foo',

    connections: undefined
  }
  
];
