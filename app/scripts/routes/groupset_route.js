Mediator.GroupsetRoute = Ember.Route.extend({

    model: function(params) {

      return this.get('store').find('groupset', params.groupset_id);
  }

});

