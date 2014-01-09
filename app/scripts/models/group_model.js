/*global Ember*/
Mediator.Group = DS.Model.extend( Ember.Enumerable,
    {

    recycled: DS.attr('boolean', {defaultValue:false}),

    lastMoved: DS.attr('number', {defaultValue: 0 }),

    initialized: DS.attr('boolean', {defaultValue:true}),

    priorityByRuleSet: DS.attr('number', {defaultValue: 0 }),

    priorityByUser: DS.attr('number', {defaultValue: 0 }),

    priorityBySystem: DS.attr('number', {defaultValue: 0 }),

    results: DS.hasMany('result'),

    _SourceNotSetException: { name: 'PatternSourceNotSetException', message: 'PatternSource Not Set in Connection.' },
    _InvalidArgumentException: { name: 'InvalidArgumentException', message: 'Argument is not from the correct type.' },

    length: function(){return this.get('results').get('length');}.property('results'),

    nextObject: function(index) {
        return this.get('results').nextObject(index);
    },

    title: function() {
        var selected = this.get('results').filter(
                            function(item, index, self){
                                if (item && item.get('title') && item.get('title').trim()) { return true; }
                            }).get('firstObject');
        return selected ? selected.get('title') : "";
    }.property('results','length'),

    subtitle: function() {
        var selected = this.get('results').filter(
            function(item, index, self){
                if (item && item.get('subtitle') && item.get('subtitle').trim()) { return true; }
            }).get('firstObject');
        return selected ? selected.get('subtitle') : "";
    }.property('results','length'),

    price: function() {
        var selected = this.get('results').filter(
            function(item, index, self){
                if (item && item.get('price') && item.get('price').trim()) { return true; }
            }).get('firstObject');
        return selected ? selected.get('price') : "";
    }.property('results','length'),

    location: function() {
        var selected = this.get('results').filter(
            function(item, index, self){
                if (item && item.get('location') && item.get('location').trim()) { return true; }
            }).get('firstObject');
        return selected ? selected.get('location') : "";
    }.property('results','length'),

    startDate: function() {
        var selected = this.get('results').filter(
            function(item, index, self){
                if (item && item.get('startDate') && item.get('startDate').trim()) { return true; }
            }).get('firstObject');
        return selected ? selected.get('startDate') : "";
    }.property('results','length'),

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

    sources: function() {
        return this.get('results').map(function(n){return n.get('source');}).filter(function(n) {return n instanceof Mediator.Source});
    }.property('results'),

        /*)
    getCategories: function() {
        var localCategories = new Ember.Set();
        for (var i=0; i < this.elements.length; i++) {
            localCategories = localCategories.addEach(this.elements[i].categories);
        }
        return localCategories;
    },

    getPictures: function() {
        var localPictures = new Ember.Set();
        for (var i=0; i < this.elements.length; i++) {
            if (this.elements[i].pictures().length > 0)
                localPictures= localPictures.addEach(this.elements[i].pictures);
        }
        return localPictures();
    },

    getLinks: function() {
        var localLinks = new Ember.Set();
        for (var i=0; i < this.elements.length; i++) {
            if (this.elements[i].getLinks().length >0)
                localLinks = localLinks.addEach(this.elements[i].getLinks());
        }
        return localLinks;
    },

    get: function(iCount) { return this.elements[iCount];},

    addPatternResult: function(item) {
        if (item instanceof Mediator.Result) {
            this.elements.push(item);
            this.update();
        } else throw this._InvalidArgumentException;
    },

    update:function() {
        var priorityBySystem = 0;
        priorityBySystem = this.getSources().inject(
            priorityBySystem,
            function (sum,item) {
                return sum + item.getPriority();
            }
        );
        priorityBySystem += this.getPatternResults().max(function (n){return n.getPriority();});

        this.iPriorityBySystem = priorityBySystem;
    },

    getPatternResults: function() {
        return this.elements;
    },

    addAll: function(items) {
        this.increasePriorityBySystem(items.inject(0, function(memo, item) {return memo + item.getPriority();}));
        this.elements = this.elements.concat(items);
        this.update();
    },

    increasePriorityByRuleset: function(count) {
        if (!isNaN(count))
            this.priorityByRuleset += count;
    },

    increasePriorityByUser: function(count) {
        if (!isNaN(count))
            this.priorityByUser += count;
    },

    increasePriorityBySystem: function(count) {
        if (!isNaN(count))
            this.priorityBySystem += count;
    },
*/
    priority: function() {
        return this.get('priorityByRuleSet') + this.get('priorityBySystem') + this.get('priorityByUser');
    }.property('priorityByRuleSet', 'priorityBySystem', 'priorityByUser')

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

    results: undefined
  },
  
  {
    id: 1,

    title: 'foo',
    
    recycled: 'foo',
    
    initialized: 'foo',
    
    priorityByRuleSet: 'foo',
    
    priorityByUser: 'foo',
    
    priorityBySystem: 'foo',

    results: undefined
  }
  
];
