/*global Ember*/
Mediator.Picture = DS.Model.extend({
    name: DS.attr('string'),

    url: DS.attr('string'),

    thumbnailUrl: DS.attr('string'),

    description: DS.attr('string'),

    priority: DS.attr('number'),

    source: DS.belongsTo('source')
});

// probably should be mixed-in...
Mediator.Picture.reopen({
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
Mediator.Picture.FIXTURES = [
  
  {
    id: 0,
    
    name: 'foo',
    
    url: 'foo',
    
    thumbnailUrl: 'foo',
    
    description: 'foo',
    
    priority: 'foo'
    
  },
  
  {
    id: 1,
    
    name: 'foo',
    
    url: 'foo',
    
    thumbnailUrl: 'foo',
    
    description: 'foo',
    
    priority: 'foo'
    
  }
  
];
