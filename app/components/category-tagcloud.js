import Ember from 'ember';

export default Ember.Component.extend({

  tagName : "ul",
  classNames: ["tagcloud"],
  allSelected: function() {
    return !this.get('items').mapBy('selected').contains(true);
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
