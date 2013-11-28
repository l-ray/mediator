/*global Ember*/
Mediator.Group = DS.Model.extend(Ember.Enumerable,{

    title: DS.attr('string'),

    recycled: DS.attr('boolean'),

    initialized: DS.attr('boolean'),

    priorityByRuleSet: DS.attr('number'),

    priorityByUser: DS.attr('number'),

    priorityBySystem: DS.attr('number'),

    elements: DS.hasMany('result')

});

// probably should be mixed-in...
Mediator.Group.reopen({
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
Mediator.Group.FIXTURES = [
  
  {
    id: 0,

    title: 'foo',
    
    recycled: false,
    
    initialized: false,
    
    priorityByRuleSet: 100,
    
    priorityByUser: 100,
    
    priorityBySystem: 100,

    elements: undefined
  },
  
  {
    id: 1,

    title: 'foo',
    
    recycled: 'foo',
    
    initialized: 'foo',
    
    priorityByRuleSet: 'foo',
    
    priorityByUser: 'foo',
    
    priorityBySystem: 'foo',

    elements: undefined
  }
  
];
