/*global Ember*/
Mediator.Result = DS.Model.extend({
    
    start: DS.attr('date'),

    end: DS.attr('date'),

    title: DS.attr('string'),

    subtitle: DS.attr('string'),

    abstract: DS.attr('string'),

    description: DS.attr('string'),

    price: DS.attr('number'),

    url: DS.attr('string'),

    connection: DS.belongsTo('connection'),

    group: undefined, /* DS.belongsTo('group'), */

    pictures: DS.hasMany('picture'),

    categories: undefined, /* DS.hasMany('category'), */

    links: undefined, /*DS.hasMany('link'),*/


    priority: function() {
        var tmpPriority = 0;

        if (this.get('categories') && this.get('categories').get('length') > 0) tmpPriority += 100;
        if (this.get('pictures') && this.get('pictures').get('length') > 0) tmpPriority += 100;
        if (this.get('links') && this.get('links').get('length') > 0)  tmpPriority += 100;
        if (typeof(this.get('price')) !== 'undefined')    tmpPriority += 50;

        return tmpPriority;
    }.property('price', 'categories', 'pictures', 'links'),

    toString: function () {
        return this.get('title') + ", " + this.get('location') + ", " + this.get('startDate');
    }

});

// probably should be mixed-in...
/*Mediator.Result.reopen({
    // certainly I'm duplicating something that exists elsewhere...
	attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});*/

// delete below here if you do not want fixtures
Mediator.Result.FIXTURES = [

    {
        id: 0,

        start: new Date(5000),

        end: new Date(),

        title: 'foo',

        subtitle: 'foo',

        abstract: 'foo',

        description: 'foo',

        price: '50',

        url: 'foo',

        connection: 0,

        group: undefined,

        category: undefined

    },

    {
        id: 1,

        start: new Date(),

        end: new Date(),

        title: 'bar',

        subtitle: 'bar',

        abstract: 'bar',

        description: 'bar',

        price: 'bar',

        url: 'bar',

        connection: 1,

        pictures: ['0','1'],

        group: undefined,

        categories: undefined
    },

    {
        id: 2,

        start: new Date(),

        end: new Date(),

        title: 'bar2',

        subtitle: 'bar2',

        abstract: 'bar2',

        description: 'bar2',

        price: 'bar2',

        url: 'bar2',

        connection: '1',

        group: undefined,

        categories: undefined
    }

];
