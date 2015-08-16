import DS from 'ember-data';

DS.RESTAdapter.reopen({
  namespace: 'api',
  shouldReloadAll: function(){return true;}
});

export default DS.RESTAdapter;
