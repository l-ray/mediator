Mediator.GroupsController = Ember.ArrayController.extend({

    sortProperties: ['priority','title'],
    sortAscending: false,

     markRecycled: function(item) {
         item.set("recycled", true);
     },
     markRestored: function(item) {
         item.set("recycled", false);
     },
     decreaseUserPriority: function(item) {
         item.set(
             "priorityByUser",
             item.get("priorityByUser") - 1000
         )
     },
     increaseUserPriority: function(item) {
         item.set(
             "priorityByUser",
             item.get("priorityByUser") + 1000
         )
     }

});

