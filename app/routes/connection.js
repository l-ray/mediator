import Ember from 'ember';

export default Ember.Route.extend({
  model: function(model) {
      if (typeof model.connection_id === 'undefined') {
          return this.get('store').find('connection', {source : model.source, startDate: model.startDate});
      }   else {
        return this.get('store').find('connection', model.connection_id);
      }
  }
});

