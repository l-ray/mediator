Mediator.ConnectionAdapter = DS.FixtureAdapter.extend({

    find: function(store, type, id) {

        console.log("Asking for connection with ID"+id);

        var fixtures = this.fixturesForType(type),
            fixture;

        Ember.assert("Unable to find fixtures for model type "+type.toString(), fixtures);

        if (fixtures) {
            fixture = Ember.A(fixtures).findProperty('id', id);
        }

        if (fixture) {
            return this.simulateRemoteCall(function() {
                return fixture;
            }, this);
        }
    },

    findAll: function(store, type) {
        var fixtures = this.fixturesForType(type);

        console.log("Asking for all connections");

        Ember.assert("Unable to find fixtures for model type "+type.toString(), fixtures);

        return this.simulateRemoteCall(function() {
            return fixtures;
        }, this);
    },

    findQuery: function(store, type, query, array) {
        var fixtures = this.fixturesForType(type);

        console.log("Asking for connections with query"+query+" and array " + array);

        Ember.assert("Unable to find fixtures for model type "+type.toString(), fixtures);

        fixtures = this.queryFixtures(fixtures, query, type);

        if (fixtures) {
            return this.simulateRemoteCall(function() {
                return fixtures;
            }, this);
        }
    }

});