Mediator.SourcesRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('source');
  }
});

