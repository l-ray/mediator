import Ember from 'ember';

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function startsWith(str, suffix) {
  return str.indexOf(suffix) === 0;
}

const VALID_URI_REGEX = /^https?:/;

var _InvalidUriException = { name: 'InvalidUriException', message: 'The given URI is not valid.'};

export default function(dependentKey, urlKey) {

  // TODO: Figure out how to test a Ember.computed return. And replace tests in model/picture accordingly.
  return Ember.computed(urlKey,dependentKey,function handler() {
    let currentValue = this.get(dependentKey);
    if (!currentValue) {return undefined;}
    if (currentValue.toLowerCase().match(VALID_URI_REGEX)) {
      return currentValue;
    } else {
      let urlKeyValue = this.get(urlKey);

      if (!urlKeyValue.toLowerCase().match(VALID_URI_REGEX)) {
        throw _InvalidUriException;
      }

      if (!endsWith(urlKeyValue,'/') && !startsWith(currentValue,"/")) {
        return urlKeyValue.concat("/").concat(currentValue);
      } else {
        // if both strings provide slash, remove one
        if (endsWith(urlKeyValue,'/') && startsWith(currentValue,"/")) {
          currentValue = currentValue.substring(1);
        }
        return urlKeyValue.concat(currentValue);

      }
    }
  });

}
