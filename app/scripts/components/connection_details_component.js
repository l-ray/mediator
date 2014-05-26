Mediator.ConnectionDetailsComponent = Ember.Component.extend({

    actions: {
        edit: function(connection) {
            console.log("edit connection"+connection.get('source'));
            connection.set('editMode', true);
        },
        doneEditing: function(connection) {
            console.log("doneEdit connection"+connection.get('source'));
            connection.set('editMode', false);
        }
    }

});