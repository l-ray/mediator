Mediator.EventdateEditController = Ember.ObjectController.extend({
  needs: 'eventdate',
  actions: {
    /*save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.eventdate.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('eventdate',this.get('model'));
    }*/
  }
});

