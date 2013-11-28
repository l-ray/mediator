Mediator.PicturesRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('picture');
  }
});

