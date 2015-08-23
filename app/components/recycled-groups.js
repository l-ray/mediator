import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    markRestored: function (item) {
      item.set("recycled", false);
    }
  }

});
