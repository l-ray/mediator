import Ember from 'ember';

export default Ember.Route.extend({
  model: function(model) {
    return this.get('store').find('picture', model.picture_id);
  }
});

