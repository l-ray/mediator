import Ember from 'ember';

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, suffix) {
  return str.indexOf(suffix) === 0;
}

export default function(dependentKey, urlKey) {

  // TODO: Figure out how to test a Ember.computed return. And replace testsin model/picture accordingly.
  return Ember.computed(urlKey,dependentKey,function handler() {
    let currentValue = this.get(dependentKey);
    if (!currentValue) {return undefined;}
    if (currentValue.toLowerCase().match(/^https?:/)) {
      return currentValue;
    } else {
      let urlKeyValue = this.get(urlKey);
      if (!endsWith(urlKeyValue,'/') && !startsWith(currentValue,"/")) {
        return urlKeyValue.concat("/").concat(currentValue);
      } else {
        if (endsWith(urlKeyValue,'/') && startsWith(currentValue,"/")) {
          return urlKeyValue.concat(currentValue.substring(1));
        } else {
          return urlKeyValue.concat(currentValue);
        }
      }
    }
  });

}
