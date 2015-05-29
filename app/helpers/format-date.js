import Ember from 'ember';

/* global moment */

export function formatDate(date, pattern) {
    if (typeof pattern === "string") {
        return moment(date).format(pattern);
    } else {
        return moment(date).fromNow();
    }
}

export default Ember.HTMLBars.makeBoundHelper(formatDate);
