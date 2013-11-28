Mediator.ConnectionEditRoute = Ember.Route.extend({
  model: function(model) {
    return this.get('store').find('connection', model.connection_id);
  }
});

