Mediator.GroupsetsRoute = Ember.Route.extend({

    model: function() {

        var daysToShow = 19;
        var myActDate = new Date();

        for (var i= -2 ; i < daysToShow; i++) {
            var tmpDate = new Date(myActDate.getTime());
            tmpDate.setDate(myActDate.getDate()+i);
            var tmpGroupSet = this.get('store').createRecord('groupset',{date:tmpDate, id: moment(tmpDate).format("YYYY-MM-DD") });

            console.log("createRecord item "+tmpGroupSet);
            var group1 = this.get('store').createRecord('group',{});
            group1.pushObjects([this.get('store').createRecord('result',{'title':'test1'})]);

            var group2 = this.get('store').createRecord('group',{});
            group2.pushObjects([this.get('store').createRecord('result',{'title':'test2'})]);

            console.log("number of entries before:"+tmpGroupSet.get('length'));
            tmpGroupSet.get('groups').pushObjects(group1,group2);
            console.log("number of entries after:"+tmpGroupSet.get('length'));

            this.get('store').push('groupset',tmpGroupSet);
        }

        return this.get('store').find('groupset');
    },
});

