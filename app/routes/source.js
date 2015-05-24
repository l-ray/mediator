import Ember from 'ember';

export default Ember.Route.extend({
  model: function(model) {
    return this.get('store').find('source', model.source_id);
  }
});

