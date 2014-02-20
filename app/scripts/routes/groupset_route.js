Mediator.GroupsetRoute = Ember.Route.extend({
  model: function(model) {

      var tmpGroupSet = this.get('store').createRecord('groupset', {});
      console.log("createRecord item "+tmpGroupSet);
      var group1 = this.get('store').createRecord('group',{});
      var picture1 = this.get('store').createRecord('picture', {'url': 'http://ruthe.de/cartoons/strip_1705.jpg', 'thumbnailUrl':'http://ruthe.de/cartoons/tn_strip_1705.jpg'});
      var picture2 = this.get('store').createRecord('picture', {'url': 'http://ruthe.de/cartoons/strip_1704.jpg', 'thumbnailUrl':'http://ruthe.de/cartoons/tn_strip_1704.jpg'});
      var source1 = this.get('store').createRecord('source', {'name':'testSource'});
      var connection1 = this.get('store').createRecord('connection', {'source':source1});
      var result1 = this.get('store').createRecord('result',{
                            'title':'test1-groupset',
                            'subtitle':'mySubTitle',
                            'startDate':'20:00',
                            'location':'Feuerwache',
                            'price':'20€',
                            'connection':connection1});
      result1.get('pictures').pushObjects([picture1, picture2]);

      var link1 = this.get('store').createRecord('link', {'url':'testURLSingular','result':result1});
      result1.get('links').pushObject(link1);
      result1.set('categories',"lila,laune,lullen");

      group1.pushObjects([result1]);

      var group2 = this.get('store').createRecord('group',{});
      group2.pushObjects([this.get('store').createRecord('result',{'title':'anotherTest2'})]);

      console.log("number of entries before:"+tmpGroupSet.get('length'));
      tmpGroupSet.get('groups').pushObjects([group1,group2]);
      tmpGroupSet.enumerableContentDidChange();
      console.log("number of entries after:"+tmpGroupSet.get('length'));

      return tmpGroupSet;
  }
});

