Mediator.GroupsetsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('groupset');
  }
});

