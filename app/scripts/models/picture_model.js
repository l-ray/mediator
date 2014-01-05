/*global Ember*/
Mediator.Picture = DS.Model.extend({

    name: DS.attr('string'),

    url: DS.attr('string'),

    thumbnailUrl: DS.attr('string'),

    description: DS.attr('string'),

    priority: DS.attr('number'),

    result: DS.belongsTo('result')
});

// probably should be mixed-in...
Mediator.Picture.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

// delete below here if you do not want fixtures
Mediator.Picture.FIXTURES = [
  
  {
    id: 0,
    
    name: 'foo',
    
    url: 'http://nichtlustig.de/comics/full/081028.jpg',
    
    thumbnailUrl: 'http://nichtlustig.de/comics/full/081028.jpg',
    
    description: 'foo',
    
    priority: 12
    
  },
  
  {
    id: 1,
    
    name: 'bar',
    
    url: 'http://static.nichtlustig.de/comics/full/130925.jpg',
    
    thumbnailUrl: 'http://static.nichtlustig.de/comics/full/130925.jpg',
    
    description: 'bar',
    
    priority: 12
    
  }
  
];
