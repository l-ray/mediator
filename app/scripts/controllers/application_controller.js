Mediator.ApplicationController = Ember.ArrayController.extend({

    availableConnections : function() { return this.store.findAll('connection');}.property()

});

