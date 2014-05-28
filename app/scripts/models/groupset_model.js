/*global Ember*/

Mediator.Groupset = DS.Model.extend(Ember.Enumerable,{

    date: DS.attr('date'),

    groups: DS.hasMany('group'),

    // as connections rely on sources, that has to be loaded asynchronous, this might have to async
    connections: DS.hasMany('connection', { async: true }),

    length: function(){return this.get('groups').get('length');}.property('groups'),

    nextObject: function(index) {
        return this.get('groups').nextObject(index);
    },

    sortingStrategy: function(a) {return (a.get("priority") instanceof Function)?-a.get("priority"):0;},

    setElementsWithCategoryToRecycled: function(item) {
        this.groups
            .findAll(function(s){
                    return s.get("categories").collect(
                        function(s) {return s.toLowerCase();}
                    ).indexOf(item.toLowerCase()) != -1;
            }).each(function(n) {n.set("recycled",true);});
    },

    sort: function() {
        this.elements = this.get("groups").sortingStrategy(this.sortingStrategy);
    },

    isSaturday: function() {
        var day = this.get('date').getDay();
        return day == 6;
    }.property('date'),

    isSunday: function() {
        var day = this.get('date').getDay();
        return day == 0;
    }.property('date')

});

// delete below here if you do not want fixtures
Mediator.Groupset.FIXTURES = [

  {
    id: '2014-05-14',
    date: new Date(2014,5,14),
    groups: []
  },

  {
    id: '2014-05-15',
    date: new Date(2014,5,15),
    groups: [0,1]
  },
  
  {
    id: '2014-05-16',
    date: new Date(2014,5,16),
    groups: []
  },

  {
    id: '2014-05-17',
    date: new Date(2014,5,17),
    groups: []
  },

  {
    id: '2014-05-18',
    date: new Date(2014,5,18),
    groups: []
  }
  
];

