import Ember from 'ember';

export default Ember.Component.extend({

  tagName : "ul",
  classNames: ["tagcloud"],
  actions: {
    toggleCategory(category) {
      console.log("toggle category,",category);
      if (category.selected) {
        this.sendAction('remove', category.key);
      } else {
        this.sendAction('addCategory', category.key);
      }
    }
  }
});
