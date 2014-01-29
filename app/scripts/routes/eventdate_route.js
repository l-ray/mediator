Mediator.EventdateRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('eventdate', params.eventdate_id);
  }
});

