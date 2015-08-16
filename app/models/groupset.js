import DS from 'ember-data';
import Ember from 'ember';

var GroupSetModel =  DS.Model.extend(Ember.Enumerable,{

    date: DS.attr('date'),

    groups: DS.hasMany('group', { async: false }),

    // as connections rely on sources, that has to be loaded asynchronous, this might have to async
    connections: DS.hasMany('connection', { async: true }),

    length: function(){return this.get('groups.length');}.property('groups'),

    nextObject: function(index) {
        return this.get('groups').nextObject(index);
    },

    sortingStrategy: function(a) {return (a.get("priority") instanceof Function)?-a.get("priority"):0;},

    setElementsWithCategoryToRecycled: function(item) {
        this.groups
            .findAll(function(s){
                    return s.get("categories").collect(
                        function(s) {return s.toLowerCase();}
                    ).indexOf(item.toLowerCase()) !== -1;
            }).each(function(n) {n.set("recycled",true);});
    },

    sort: function() {
        this.elements = this.get("groups").sortingStrategy(this.sortingStrategy);
    },

    isSaturday: function() {
        var day = this.get('date').getDay();
        return day === 6;
    }.property('date'),

    isSunday: function() {
        var day = this.get('date').getDay();
        return day === 0;
    }.property('date')

});

export default GroupSetModel;
