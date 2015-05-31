import Ember from 'ember';

export default Ember.Component.extend({

    actions: {
        edit: function(connection) {
            connection.set('editMode', true);
        },
        doneEditing: function(connection) {
            connection.set('editMode', false);
        }
    }

});
