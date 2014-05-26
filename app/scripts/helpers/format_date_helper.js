Ember.Handlebars.helper('format-date', function(date, pattern) {
    if (typeof pattern === "string") {
        return moment(date).format(pattern);
    } else {
        return moment(date).fromNow();
    }
});