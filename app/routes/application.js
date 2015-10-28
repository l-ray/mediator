import Ember from 'ember';
import Mediator from '../app';

function provideCalendarAttributes(selectedDate) {

  var firstDayOfCalendar = null;
  if (datesIsOutsideBoundaries(
        selectedDate,
        Mediator.constants._TODAY,
        Mediator.constants._CALENDAR_DAYS_INTO_THE_PAST,
        Mediator.constants._CALENDAR_SIZE
    )
  ) {
    firstDayOfCalendar = new Date(selectedDate.getTime());
  } else {
    firstDayOfCalendar = new Date(Mediator.constants._TODAY);
  }

  firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - Mediator.constants._CALENDAR_DAYS_INTO_THE_PAST);

  return {
    startDate: firstDayOfCalendar,
    calendarSize:  Mediator.constants._CALENDAR_SIZE
  };
}

function datesIsOutsideBoundaries(date1, date2, negativeDistanceInDays, positiveDistanceInDays) {
  return (date1.getDate() < date2.getDate() - negativeDistanceInDays) ||
          date1.getDate() > date2.getDate() + positiveDistanceInDays;
}

export default Ember.Route.extend({

  setupController: function(controller) {
    // Set the IndexController's `title`
    controller.set('groupset', this.get('store').query(
      'groupset',
      provideCalendarAttributes(new Date())
    ));
  }
});
