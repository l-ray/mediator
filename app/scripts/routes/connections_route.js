Mediator.ConnectionsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('connection');
  }
});

