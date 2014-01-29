Mediator.EventdatesRoute = Ember.Route.extend({

  model: function() {

      var daysToShow = 19;
      var myActDate = new Date();

      for (var i= -2 ; i < daysToShow; i++) {
          var tmpDate = new Date(myActDate.getTime());
          tmpDate.setDate(myActDate.getDate()+i);
          this.get('store').push('eventdate',{date:tmpDate, id: moment(tmpDate).format("YYYY-MM-DD") });
      }

      return this.get('store').find('eventdate');
  },

});

