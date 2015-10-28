import Ember from 'ember';

export default  Ember.Controller.extend({

    sortedGroupsets: function(){
      return Ember.ArrayProxy.extend(Ember.SortableMixin).create({
        sortProperties: ['date'],
        sortAscending: true,
        content: this.get('model')
      });
    }.property('model.content')
});
