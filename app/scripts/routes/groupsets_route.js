Mediator.GroupsetsRoute = Ember.Route.extend({

    model: function() {

        var daysToShow = 19;
        var myActDate = new Date();

        for (var i= -2 ; i < daysToShow; i++) {
            var tmpDate = new Date(myActDate.getTime());
            tmpDate.setDate(myActDate.getDate()+i);

            var tmpGroupSet = this.get('store').createRecord('groupset',{date:tmpDate, id: moment(tmpDate).format("YYYY-MM-DD") });

            var group1 = this.get('store').createRecord('group',{});

            var result1 = this.get('store').createRecord('result',{'title':'test1-groupsets', 'subtitle':'testSubtitle'});
            var picture1 = this.get('store').createRecord('picture', {});
            var picture2 = this.get('store').createRecord('picture', {});
            result1.get('pictures').pushObjects([picture1, picture2]);

            var link1 = this.get('store').createRecord('link', {'url':'testURLPlural'});
            result1.get('links').pushObject(link1);

            group1.pushObjects([result1]);

            var group2 = this.get('store').createRecord('group',{});
            group2.pushObjects([this.get('store').createRecord('result',{'title':'anotherTest2'})]);

            console.log("number of entries before:"+tmpGroupSet.get('length'));
            tmpGroupSet.get('groups').pushObjects([group1,group2]);
            tmpGroupSet.enumerableContentDidChange();
            console.log("number of entries after:"+tmpGroupSet.get('length'));

            this.get('store').push('groupset',tmpGroupSet);
        }
        console.log("leaving groupset router");
        return this.get('store').find('groupset');
    }
});

