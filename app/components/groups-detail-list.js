import AbstractGroupsList from 'mediator/components/abstract-groups-list';

export default AbstractGroupsList.extend({

  position: Number(0),

  group: function() {
    return this.get("groups").get(this.get("position"));
  }.property("groups.[]", "position"),

  isNotLast: function() {
    return this.get("position") < this.get("groups.length")
  }.property("groups.[]","position"),

  isNotFirst: function() {
    return this.get("position") > 0
  }.property("position"),

  actions: {
    nextPosition: function () {
      var selectedPosition = this.get("position");
      if (this.get("isNotLast")) {
        this.set("position", selectedPosition + 1);
      }
    },

    lastPosition: function () {
      var selectedPosition = this.get("position");
      if (this.get("isNotFirst")) {
        this.set("position", selectedPosition - 1);
      }
    }
  }

});
