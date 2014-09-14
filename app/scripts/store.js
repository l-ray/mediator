Mediator.ApplicationStore = DS.Store.extend();
// Mediator.ApplicationAdapter = DS.FixtureAdapter;
Mediator.ApplicationAdapter = DS.RESTAdapter;
DS.RESTAdapter.reopen({
    namespace: 'api'
})
