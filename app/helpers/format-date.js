import Ember from 'ember';

/* global moment */

export function formatDate(parameter, options) {
  var date = parameter[0]; //= Ember.getPath(this, parameter);
  var pattern = parameter[1];//= Ember.getPath(this, parameter);

  if (typeof pattern === "string") {
        return moment(date).format(pattern);
    } else {
        return moment(date).fromNow();
    }
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);
