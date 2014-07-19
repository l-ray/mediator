Mediator.GroupController = Ember.ObjectController.extend({

     markRecycled: function() {
         this.set("recycled", true);
     },
     markRestored: function() {
         this.set("recycled", false);
     },
     decreaseUserPriority: function() {
         this.set(
            "priorityByUser",
                 this.get("priorityByUser") - 1000
        )
     },
     increaseUserPriority: function() {
         this.set(
            "priorityByUser",
            this.get("priorityByUser") + 1000
        )
     }

});