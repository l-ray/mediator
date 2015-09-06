import Ember from 'ember';

export default Ember.Controller.extend({

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
    },

    enabled: Ember.computed('model.@each.recycled', 'model.@each.enabled', function() {
      let groups = this.get('model');
      return groups.filter(item => item.get('enabled')&&!item.get('recycled'));
    }),

    recycled:  Ember.computed('model.@each.recycled', 'model.@each.enabled', function() {
      let groups = this.get('model');
      return groups.filter(item => item.get('enabled')&&item.get('recycled'));
    })
});

