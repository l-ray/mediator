// Mediator.GroupsetAdapter = DS.FixtureAdapter.extend({ });

 Mediator.GroupsetAdapter = DS.FixtureAdapter.extend({

     // generate the complete groupset for the given ID including
     // connections
     find: function(store, type, id) {
         var fixtures = this.fixturesForType(type),
             fixture;

         console.log("groupSet find");

         var startDate = id;

        console.log(store.find('connection',{ "startDate": startDate }));

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

     // generate Groupsets for the next x days in advance
     findAll: function(store, type) {

         //store.find('connection')

         var fixtures = this.fixturesForType(type);

        fixtures.forEach(function(item) {
         //   console.log(store.find('connection',{ "startDate": item.id }));
        })

         Ember.assert("Unable to find fixtures for model type "+type.toString(), fixtures);

         console.log("Grouzpset all-find");

         return this.simulateRemoteCall(function() {
             return fixtures;
         }, this);
     }

});