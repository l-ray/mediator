Mediator.SourceEditRoute = Ember.Route.extend({
  model: function(model) {
    return this.get('store').find('source', model.source_id);
  }
});

