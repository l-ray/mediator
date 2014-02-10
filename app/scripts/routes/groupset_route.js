Mediator.GroupsetRoute = Ember.Route.extend({
  model: function(model) {

      var tmpGroupSet = this.get('store').createRecord('groupset', {});
      console.log("createRecord item "+tmpGroupSet);
      var group1 = this.get('store').createRecord('group',{});
      var picture1 = this.get('store').createRecord('picture', {});
      var picture2 = this.get('store').createRecord('picture', {});
      var result1 = this.get('store').createRecord('result',{'title':'test1'});
      result1.get('pictures').pushObjects([picture1, picture2]);

      var link1 = this.get('store').createRecord('link', {'url':'testURLSingular'});
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

