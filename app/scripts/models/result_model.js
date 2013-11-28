/*global Ember*/
Mediator.Result = DS.Model.extend({
    start: DS.attr('date'),

    end: DS.attr('date'),

    title: DS.attr('string'),

    subtitle: DS.attr('string'),

    abstract: DS.attr('string'),

    description: DS.attr('string'),

    price: DS.attr('number'),

    url: DS.attr('string'),

    priority: DS.attr('number'),

    source: DS.belongsTo('source'),

    group: DS.belongsTo('group'),

    pictures: DS.hasMany('picture')
});

// probably should be mixed-in...
Mediator.Result.reopen({
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
Mediator.Result.FIXTURES = [
  
  {
    id: 0,
    
    start: 'foo',
    
    end: 'foo',
    
    title: 'foo',
    
    subtitle: 'foo',
    
    abstract: 'foo',
    
    description: 'foo',
    
    price: 'foo',
    
    url: 'foo',
    
    priority: 'foo',

    source: undefined,

    group: undefined
    
  },
  
  {
    id: 1,
    
    start: 'foo',
    
    end: 'foo',
    
    title: 'foo',
    
    subtitle: 'foo',
    
    abstract: 'foo',
    
    description: 'foo',
    
    price: 'foo',
    
    url: 'foo',
    
    priority: 'foo',

    source: undefined,

    group: undefined
    
  }
  
];
