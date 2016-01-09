import Ember from 'ember';

export default Ember.Controller.extend({

  isDetail: Boolean(false),

  actions:{
    'selectDetail': function() {
      this.set('isDetail',true);
    },
    'unselectDetail': function() {
      this.set('isDetail',false);
    }
  },

  selectedComponent:Ember.computed('isDetail', function() {
    return this.get('isDetail')?'groups-detail-list':'groups-overview-list';
  }),

  enabled: Ember.computed('model.@each.recycled', 'model.@each.enabled', function() {
    let groups = this.get('model');
    return groups.filter(item => item.get('enabled')&&!item.get('recycled'));
  }),

  recycled:  Ember.computed('model.@each.recycled', 'model.@each.enabled', function() {
    let groups = this.get('model');
    return groups.filter(item => item.get('enabled')&&item.get('recycled'));
  })
});

