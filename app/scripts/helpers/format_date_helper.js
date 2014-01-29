Ember.Handlebars.helper('format-date', function(date, pattern) {
    if (typeof pattern === "undefined") {
        return moment(date).fromNow();
    } else {
        return moment(date).format(pattern);
    }
});