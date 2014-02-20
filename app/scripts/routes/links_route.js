Mediator.LinksRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('link');
  }
});

