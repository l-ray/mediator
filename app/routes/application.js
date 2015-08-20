import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    // Set the IndexController's `title`
    controller.set('groupset', this.get('store').findAll('groupset') );
  }
});
