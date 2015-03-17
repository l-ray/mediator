/*global Ember*/
Mediator.Picture = DS.Model.extend({

    name: DS.attr('string'),

    url: DS.attr('string'),

    thumbnailUrl: DS.attr('string'),

    description: DS.attr('string'),

    priority: DS.attr('number'),

    result: DS.belongsTo('result'),

    src: (function(){
            return this.get('thumbnailUrl') || this.get('url');
         }).property('thumbnailUrl','url')
});

Mediator.Picture.FIXTURES = [

  {
    id: 0,

    name: 'foo',

    result: 1,

    url: 'http://nichtlustig.de/comics/full/081028.jpg',

    thumbnailUrl: 'http://nichtlustig.de/comics/full/081028.jpg',

    description: 'foo',

    priority: 12

  },

  {
    id: 1,

    name: 'bar',

    result: 1,

    url: 'http://static.nichtlustig.de/comics/full/130925.jpg',

    thumbnailUrl: 'http://static.nichtlustig.de/comics/full/130925.jpg',

    description: 'bar',

    priority: 12

  }

];
