Mediator.GroupDetailsComponent = Ember.Component.extend({

    actions: {
        markRecycled: function(item) {
            item.set("recycled", true);
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
    }

});