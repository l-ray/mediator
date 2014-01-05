/*global Ember*/

Mediator.Source = DS.Model.extend({

    name: DS.attr('string'),

    url: DS.attr('string'),

    icon: DS.attr('string'),

    additional: DS.attr('boolean',{ defaultValue: false }),

    priority: DS.attr('number',{defaultValue: 0 }),

    connections: DS.hasMany('connection'),

    lastMoved: DS.attr('number',{defaultValue: 0 })
});

// probably should be mixed-in...
/*Mediator.Source.reopen({
 attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});*/

// delete below here if you do not want fixtures

Mediator.Source.FIXTURES = [
  
  {
    id: 0,
    
    name: 'foo',
    
    url: 'http://www.groovestation.de/',
    
    icon: 'http://www.groovestation.de/favicon.ico',

    additional: false,
    
    priority: 50
    
  },
  
  {
    id: 1,
    
    name: 'bar',
    
    url: 'http://www.banq.de/',
    
    icon: 'http://www.banq.de/ico/favicon.ico',
    
    additional: true,
    
    priority: 100
  }
  
];