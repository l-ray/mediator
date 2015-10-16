import Ember from 'ember';

export default function(dependentKey, urlKey) {

  // TODO: Figure out how to test a Ember.computed return. And replace testsin model/picture accordingly.
  return Ember.computed(urlKey,dependentKey,function handler() {
    let currentValue = this.get(dependentKey);
    if (!currentValue) {return undefined;}
    if (currentValue.toLowerCase().match(/^https?:/)) {
      return currentValue;
    } else {
      return this.get(urlKey).concat(currentValue);
    }
  });

}
