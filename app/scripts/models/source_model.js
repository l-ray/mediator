/*global Ember*/

Mediator.Source = DS.Model.extend({

    name: DS.attr('string'),

    url: DS.attr('string'),

    icon: DS.attr('string'),

    additional: DS.attr('boolean'),

    priority: DS.attr('number'),

    connections: DS.hasMany('connection') ,

    lastMoved: DS.attr('number',0)
});

// probably should be mixed-in...
Mediator.Source.reopen({
    // certainly I'm duplicating something that exists elsewhere...
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