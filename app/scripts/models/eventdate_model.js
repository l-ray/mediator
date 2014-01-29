/*global Ember*/
Mediator.Eventdate = DS.Model.extend({
    date: DS.attr('date'),
    isSaturday: function() {
        var day = this.get('date').getDay();
        return day == 6;
    }.property('date'),
    isSunday: function() {
        var day = this.get('date').getDay();
        return day == 0;
    }.property('date'),
});

// delete below here if you do not want fixtures
Mediator.Eventdate.FIXTURES = [ ];
