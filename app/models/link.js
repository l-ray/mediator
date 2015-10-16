import DS from 'ember-data';
import makeUrlAbsolute from 'mediator/utils/make-url-absolute';

var LinkModel = DS.Model.extend({
    url: DS.attr('string'),
    result: DS.belongsTo('result'),
    name: (function(){
        return this.get('result').get('sourceName');
    }).property('result'),
    absoluteUrl: makeUrlAbsolute('url', 'result.resultUrl')
});

// delete below here if you do not want fixtures
LinkModel.reopenClass({
  FIXTURES : [

    {
      id: 0,

      url: 'http://example.com/foo'

    },

    {
      id: 1,

      url: 'http://example.com/bar'

    }

  ]
  });

export default LinkModel;
