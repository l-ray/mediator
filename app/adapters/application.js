import DS from 'ember-data';

DS.RESTAdapter.reopen({
  namespace: 'api',
  shouldReloadAll() { return true; }
});

export default DS.RESTAdapter;
