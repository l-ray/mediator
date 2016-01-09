import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    markRecycled: function (item) {
      item.set("recycled", true);
    },
    markRestored: function (item) {
      item.set("recycled", false);
    },
    decreaseUserPriority: function (item) {
      item.set(
        "priorityByUser",
        item.get("priorityByUser") - 1000
      );
    },
    increaseUserPriority: function (item) {
      item.set(
        "priorityByUser",
        item.get("priorityByUser") + 1000
      );
    }
  }

});
