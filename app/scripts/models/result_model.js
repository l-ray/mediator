/*global Ember*/
Mediator.Result = DS.Model.extend({
    
    start: DS.attr('date'),

    end: DS.attr('date'),

    title: DS.attr('string'),

    subtitle: DS.attr('string'),

    abstract: DS.attr('string'),

    description: DS.attr('string'),

    location: DS.attr('string'),

    price: DS.attr('number'),

    url: DS.attr('string'),

    connection: DS.belongsTo('connection'),

    group: DS.belongsTo('group'),

    pictures: DS.hasMany('picture'),

    categories: DS.attr('string'),

    links: DS.hasMany('link'),

    priority: function() {
        var tmpPriority = 0;
        if (this.get('categories') && this.get('categories').length > 0) tmpPriority += 100;
        if (this.get('pictures') && this.get('pictures.length') > 0) tmpPriority += 100;
        if (this.get('links') && this.get('links.length') > 0)  tmpPriority += 100;
        if (typeof(this.get('price')) !== 'undefined') tmpPriority += 50;
        return tmpPriority;
    }.property('price', 'categories', 'pictures', 'links'),

    connectionPriority: Ember.computed.alias('connection.priority'),

    connectionIgnorePriority: Ember.computed.alias('connection.ignorePriority'),

    enabled: Ember.computed.alias('connection.active'),

    toString: function () {
        return "[Title:"+this.get('title') + ", Location:" + this.get('location') + ", start:" + this.get('start')+"]";
    },

    sourceName: function() {
        try {
            return this.get('connection').get('name');
        } catch (e) {
            return "";
        }
    }.property('connection'),

    resultUrl: function() {
        var url = this.get('url');
        var sourceUrl = this.get('connection') ? this.get('connection').get('sourceUrl'): '';
        return url ? url : sourceUrl;
    }.property('connection')

});

Mediator.Result.FIXTURES = [

    {
        id: 0,

        start: new Date(5000),

        end: new Date(),

        title: 'foo',

        subtitle: 'foo',

        abstract: 'foo',

        location: 'foo-testlocation',

        description: 'foo',

        price: '50',

        url: 'foo',

        connection: '0-2014-05-15',

        /*pictures: [ ],*/

        categories: 'block,floete,punk,rock,folk'

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

        location: 'bar-testlocation',

        url: 'bar',

        connection: '1-2014-05-15',

        /*pictures: [ 0 , 1 ],*/

        group: undefined,

        categories: 'folk,punk'

    },

    {
        id: 2,

        start: new Date(),

        end: new Date(),

        title: 'bar2',

        subtitle: 'bar2',

        abstract: 'bar2',

        description: 'bar2',

        location: 'bar2-testlocation',

        price: 'bar2',

        url: 'bar2',

        connection: '1-2014-05-15',

        group: undefined,

        categories: 'pop,rock'
    }

];
