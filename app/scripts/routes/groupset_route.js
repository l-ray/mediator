Mediator.GroupsetRoute = Ember.Route.extend({
  model: function(model) {
    return this.get('store').find('groupset', model.groupset_id);
  }
});

