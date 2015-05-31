import Ember from 'ember';

/* global moment */

export function formatDate(parameter) {
  var date = parameter[0];
  var pattern = parameter[1];

  if (typeof pattern === "string") {
        return moment(date).format(pattern);
    } else {
        return moment(date).fromNow();
    }
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);
