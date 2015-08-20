import Ember from 'ember';

export default Ember.Component.extend({

    actions: {
        edit: function(connection) {
            connection.set('editMode', true);
        },
        doneEditing: function(connection) {
            connection.set('editMode', false);
        },
      toggleResults: function(connection) {
        connection.set('showResults', !connection.get('showResults'));
      }
    }

});
