import DS from 'ember-data';


var waitingForAjaxResponse;

var waitingForAjaxResponseActive = false;

export default DS.RESTAdapter.extend({
  namespace: 'api',

  shouldReloadAll: function(store, snapshotRecordArray){
    return snapshotRecordArray.length === 0;
  },

  shouldBackgroundReloadAll: function(store, snapshotRecordArray) {
    console.log("Should backgroundReloadAll with snapshot "+snapshotRecordArray.length+" waiting "+waitingForAjaxResponse);
    return snapshotRecordArray.length === 0;
  },

  findAll: function(store,type) {
    if (!waitingForAjaxResponseActive) {

      waitingForAjaxResponseActive = true;

      waitingForAjaxResponse = this._super(store,type)
        .then(function(result){
          waitingForAjaxResponseActive = false;
          return result;
        });
    }
    return waitingForAjaxResponse;
  }
});
