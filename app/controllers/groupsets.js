import Ember from 'ember';

export default  Ember.Controller.extend({

    // dates : [],

    selected : "GroupSet",

    actions: {
        select: function(date,event) {
            console.log("selected date "+date+" and event "+event);
            this.selected = date;
        }
    },

    sortedGroupsets: function(){
      return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
        sortProperties: ['date'],
        sortAscending: true,
        content: this.get('model')
      });
    }.property('model.content')
});
