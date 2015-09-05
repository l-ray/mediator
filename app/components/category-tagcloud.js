import Ember from 'ember';

export default Ember.Component.extend({

  tagName : "ul",
  classNames: ["tagcloud"],
  allSelected: function() {
    var items = this.get('items');
    return Ember.isArray(items) ? !items.mapBy('selected').contains(true):false;
  }.property('items'),

  actions: {
    toggleCategory(category) {
      if (category.selected) {
        this.sendAction('remove', category.key);
      } else {
        this.sendAction('addCategory', category.key);
      }
    }
  }
});
