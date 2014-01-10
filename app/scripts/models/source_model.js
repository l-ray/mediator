/*global Ember*/

Mediator.Source = DS.Model.extend({

    name: DS.attr('string'),

    url: DS.attr('string'),

    icon: DS.attr('string'),

    additional: DS.attr('boolean',{ defaultValue: false }),

    priority: DS.attr('number',{defaultValue: 0 }),

    connections: DS.hasMany('connection', {'async':true}),

    lastMoved: DS.attr('number',{defaultValue: 0 })
});

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