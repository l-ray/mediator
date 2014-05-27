/*global Ember*/
Mediator.Group = DS.Model.extend( Ember.Enumerable,
    {

    recycled: DS.attr('boolean', {defaultValue:false}),

    lastMoved: DS.attr('number', {defaultValue: 0 }),

    initialized: DS.attr('boolean', {defaultValue:true}),

    priorityByRuleSet: DS.attr('number', {defaultValue: 0 }),

    priorityByUser: DS.attr('number', {defaultValue: 0 }),

    results: DS.hasMany('result', {async:true}),

    groupset: DS.belongsTo('groupset'),

    priorityBySystem: function() {
        return (this.get('results').get('length') == 0) ?
            0 :
            new Ember.Set(this.get('results'))
                .reduce(
                    function (currentMax, n){
                        return Math.max(currentMax,n.get('priority'));
                    },0);
    }.property('results.@each.priority'),

    _SourceNotSetException: { name: 'PatternSourceNotSetException', message: 'PatternSource Not Set in Connection.' },
    _InvalidArgumentException: { name: 'InvalidArgumentException', message: 'Argument is not from the correct type.' },

    length: function(){return this.get('results.length');}.property('results'),

    nextObject: function(index) {
        return this.get('results').nextObject(index);
    },

    pushObjects: function(objects) {
        this.enumerableContentWillChange();
        this.get('results').pushObjects(objects);
        this.enumerableContentDidChange();
    },

    title: function() {
        var selected = this.get('results').filter(
                            function(item, index, self){
                                if (item && item.get('title') && item.get('title').trim()) { return true; }
                            }).get('firstObject');
        return selected ? selected.get('title') : "";
    }.property('results.@each.title','length'),

    subtitle: function() {
        var selected = this.get('results').filter(
            function(item, index, self){
                return !Ember.isEmpty(item.get('subtitle'));
            }).get('firstObject');
        return selected ? selected.get('subtitle') : "";
    }.property('results.@each.subtitle'),

    price: function() {
        var selected = this.get('results').filter(
            function(item){
                return !Ember.isEmpty(item.get('price'));
            }).get('firstObject');
        return selected ? selected.get('price') : "";
    }.property('results.@each.price'),

    location: function() {
        var selected = this.get('results').filter(
            function(item){
                return !Ember.isEmpty(item.get('location'));
            }).get('firstObject');
        return selected ? selected.get('location') : "";
    }.property('results.@each.location'),

    startDate: function() {
        var selected = this.get('results').filter(
            function(item){
                return !Ember.isEmpty(item.get('start'));
            }).get('firstObject');
        return selected ? selected.get('start') : "";
    }.property('results.@each.start'),

    _returnCompareString: function(myString) {
        return $.trim(myString.toLowerCase().replace(/[^a-zäöü0-9]+/g," "));
    },

    reducedLocation: function() {
        return this._returnCompareString(this.get('location'));
    }.property('location'),

    reducedTitle: function() {
        return this._returnCompareString(this.get('title'));
    }.property('title'),

    reducedSummary: function() {
        return new Ember.Set(this._returnCompareString(this.get('title')+" "+this.get('location'))
            .split(" ")).filter(function(s) {return s.length > 1;})
            .join(" ");
    }.property('title','location'),

    connections: function() {
        return this.get('results').map(function(n){return n.get('connection');}).filter(function(n) {return n instanceof Mediator.Connection});
    }.property('results.@each.connection'),

    pictures: function() {
        var localPictures = new Ember.Set();
        this.get('results').forEach(function(n) {localPictures.addEach(n.get('pictures'));});
        return localPictures.toArray();
    }.property('results.@each.pictures'),

    links: function() {
        var localLinks = new Ember.Set();
        this.get('results').forEach(function(n) {localLinks.addEach(n.get('links'));});
        return localLinks.toArray();
    }.property('results.@each.links'),

    categories: function() {
        var itemSet = new Ember.Set();
        this.get('results').forEach(
            function(n) {
                try {
                    itemSet.addEach(n.get('categories').split(Mediator.constants._RESULT_CATEGORY_SPLITTER));
                } catch (e) {
                    // expected object
                }
            }
        );
        return itemSet.toArray();
    }.property('results.@each.categories'),

    priority: function() {
        return (this.get('priorityByRuleSet')
            + this.get('priorityBySystem')
            + this.get('priorityByUser'));
    }.property('priorityByRuleSet', 'priorityBySystem', 'priorityByUser')

});

// delete below here if you do not want fixtures
Mediator.Group.FIXTURES = [

  {
    id: 0,

    /*title: 'foo',*/
    
    recycled: false,
    
    initialized: false,
    
    priorityByRuleSet: 100,
    
    priorityByUser: 100,
    
    priorityBySystem: 100,

    results: [1,2],

  },
  
  {
    id: 1,

   /* title: 'foo',*/
    
    recycled: 'foo',
    
    initialized: 'foo',
    
    priorityByRuleSet: 'foo',
    
    priorityByUser: 'foo',
    
    priorityBySystem: 'foo',

    results: undefined,

  }
  
];