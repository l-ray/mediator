Mediator.LinkRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('link', params.link_id);
  }
});

