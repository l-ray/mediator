import DS from 'ember-data';

export default  DS.Adapter.extend({

  findRecord: function(store, type, id) {
    console.log("in find group with type |"+type+"| and id |"+id);
    var cacheResult = store.findRecord(type, id);
    console.log("cacheResult "+cacheResult);
    if ( cacheResult !== undefined) {
      console.log("found "+type+" id "+id+" in the cache");
      return cacheResult;
    }

    return store.createRecord(type,{ 'id': id });
  }
});
