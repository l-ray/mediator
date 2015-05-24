import DS from 'ember-data';

var SourceModel = DS.Model.extend({

    name: DS.attr('string'),

    url: DS.attr('string'),

    icon: DS.attr('string'),

    active: DS.attr('boolean', {defaultValue: true}),

    additional: DS.attr('boolean',{ defaultValue: false }),

    priority: DS.attr('number',{defaultValue: 0 }),

    connections: DS.hasMany('connection', {'async':true}),

    lastMoved: DS.attr('number',{defaultValue: 0 })
});

SourceModel.reopenClass({
    FIXTURES : [

      {
        id: 0,

        name: 'fooFixture',

        url: 'http://www.groovestation.de/',

        icon: 'http://l-ray.de/fileadmin/images/ico_movie.gif',

        additional: false,

        priority: 50

      },

      {
        id: 1,

        name: 'barFixture',

        url: 'http://www.banq.de/',

        icon: 'http://l-ray.de/fileadmin/images/ico_project.gif',

        additional: true,

        priority: 100
      }

    ]
  });

export default SourceModel;
