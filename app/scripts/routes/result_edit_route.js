Mediator.ResultEditRoute = Ember.Route.extend({
  model: function(model) {
    return this.get('store').find('result', model.result_id);
  }
});

