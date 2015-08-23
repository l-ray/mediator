import Ember from 'ember';

export default Ember.Component.extend({

  showRecycledGroups: Boolean(false),

  actions: {
    markRestored: function (item) {
      item.set("recycled", false);
    },
    toggleShowRecycledGroups: function() {
      this.toggleProperty('showRecycledGroups');
    }
  }

});
