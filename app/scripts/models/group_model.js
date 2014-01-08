/*global Ember*/
Mediator.Group = DS.Model.extend( //Ember.Enumerable,
    {

    title: DS.attr('string'),

    recycled: DS.attr('boolean', {defaultValue:false}),

    lastMoved: DS.attr('number', {defaultValue: 0 }),

    initialized: DS.attr('boolean', {defaultValue:true}),

    priorityByRuleSet: DS.attr('number', {defaultValue: 0 }),

    priorityByUser: DS.attr('number', {defaultValue: 0 }),

    priorityBySystem: DS.attr('number', {defaultValue: 0 }),

    results: DS.hasMany('result'),

    _SourceNotSetException: { name: 'PatternSourceNotSetException', message: 'PatternSource Not Set in Connection.' },
    _InvalidArgumentException: { name: 'InvalidArgumentException', message: 'Argument is not from the correct type.' },

    title: function() {
        var elementsLength = this.get('results') ? this.get('results').get('length'):0;
        switch (elementsLength) {
              case 0: return "";
              default: for (var i=0; i< elementsLength;i++) {
                  if (this.results[i].get('title')
                      && this.results[i].get('title') != "")
                      return this.results[i].get('title');
              };
          }
          return "";
    }.property('results'),
/*
    getSubTitle: function() {
        switch (this.elements.length) {
            case 0: return "";
            default: for (var i=0; i< this.elements.length;i++) {
                if (this.elements[i].getSubTitle() !== undefined
                    && this.elements[i].getSubTitle() != "")
                    return this.elements[i].getSubTitle();
            };
        }
        return "";
    },

    getStartDate: function() {
        switch (this.elements.length) {
            case 0: return "";
            case 1: return this.elements[0].getStartDate();
            default: return this.elements[0].getStartDate();
        }
        return this.elements[0].getStartDate();
    },

    getPrice: function() {
        switch (this.elements.length) {
            case 0: return "";
            case 1: return this.elements[0].getPrice();
            default: return this.elements[0].getPrice();
        }
        return this.elements[0].getPrice();
    },
    getLocation: function() {
        switch (this.elements.length) {
            case 0: return "";
            default: for (var i=0; i< this.elements.length;i++) {
                if (this.elements[i].getLocation() !== undefined
                    &&this.elements[i].getLocation() != "")
                    return this.elements[i].getLocation();
            };
        }
        return "";
    },

    _returnCompareString: function(myString) {
        return $.trim(myString.toLowerCase().replace(/[^a-zäöü0-9]+/g," "));
    },

    getLocationCompareString: function() {
        return this._returnCompareString(this.getLocation());
    },

    getTitleCompareString: function() {
        return this._returnCompareString(this.getTitle());
    },

    getCompleteCompareString: function() {
        return this._returnCompareString(this.getTitle()+" "+this.getLocation())
            .split(" ").uniq()
            .findAll(function(s) {return s.length > 1;})
            .join(" ");
    },

    getSources: function() {
        var localSources = new Ember.Set();
        for (var i=0; i < this.elements.length; i++) {
            if (this.elements[i].source instanceof Mediator.Source
                // || this.elements[i].source instanceof Mediator.SourceLinkDecorator
                )
                localSources.push(this.elements[i].source);
        }
        return localSources;
    },

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
