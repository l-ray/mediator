Mediator.GroupsetsController = Ember.ArrayController.extend({

    dates : [],

    selected : "GroupSet",

    actions: {
        select: function(date,event) {
            console.log("selected date "+date+" and event "+event);
            selected = date;
        },
    }

});