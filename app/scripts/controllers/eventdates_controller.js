Mediator.EventdatesController = Ember.ArrayController.extend({
  // Implement your controller here.

    dates : [],

    selected : "Eventdate",

    actions: {
        select: function(date,event) {
           console.log("selected date "+date+" and event "+event);
           selected = date;
        }
    }

});