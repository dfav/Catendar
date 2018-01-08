;(function () {
  angular.module('catendar-app')
    .directive('monthInfo', MonthInfo)

  function MonthInfo () {
    MonthInfoController.$inject = ['catendarService']

    return {
      controller: MonthInfoController,
      controllerAs: 'monthInfoCtrl',
      templateUrl: './scripts/month-info/month-info.template.html'
    }

    function MonthInfoController (catendarService) {
      // Bind Properties
      var ctrl = this

      // Public Properties
      ctrl.calendarDays = []
      ctrl.dayNumber = 0
      ctrl.daysOfWeek = catendarService.getDaysOfWeek()
      ctrl.month = ''
      ctrl.monthNames = catendarService.getMonthNames()
      ctrl.today = null
      ctrl.weekday = ''

      // Public Methods
      ctrl.changeTodaysDate = ChangeTodaysDate

      // INIT
      Load()

      // Constructor
      function CalendarDay (number = 0, isThisMonth = false, isToday = false) {
        this.number = number
        this.isThisMonth = isThisMonth
        this.isToday = isToday
      }

      // Methods
      function Load () {
        catendarService.getTodaysDate()
          .then(function (response) {
            var lastDayPreviousMonth = 0
            var lastDayThisMonth = 0
            var monthStart = 0

            // Reset
            ctrl.calendarDays = []
            ctrl.today = response

            // Update all the values
            ctrl.dayNumber = ctrl.today.getDate()
            ctrl.month = catendarService.getMonthNameWithIndex(ctrl.today.getMonth())
            ctrl.weekday = catendarService.getDayOfWeekWithIndex(ctrl.today.getDay())
            lastDayPreviousMonth = new Date(ctrl.today.getFullYear(), ctrl.today.getMonth(), 0).getDate()
            lastDayThisMonth = new Date(ctrl.today.getFullYear(), ctrl.today.getMonth() + 1, 0).getDate()
            monthStart = new Date(ctrl.today.getFullYear(), ctrl.today.getMonth(), 1).getDay()
          
            // We need to pre fill the calender with the last days of the previous month.
            // To do that we need to take what day of the week this month started on and add 1 because JavaScript returns the day beginning with zero.
            // Subtract that number from the last day of the previous month to determine 
            for (let i = lastDayPreviousMonth - monthStart + 1; i <= lastDayPreviousMonth; i++) {
              ctrl.calendarDays.push(new CalendarDay(i))
            }

            // Next we add all of the days in this month
            for (let i = 1; i <= lastDayThisMonth; i++) {
              ctrl.calendarDays.push(new CalendarDay(i, true, ctrl.today.getDate() === i))
            }

            // Finally, we want to add the days of the week for next month to complete the row
            // To find out how many days that is, we do modulo to find out how far into the week the last day of the month is. E.g. if the last day is a Tuesday, then the modulo is 3. Then we subtract the modulo from the number of days in the week to find out how many days we need to add.
            // Alternatively, we could create a new Date object of the last day of the month and use the getDay() method. Both approaches are equally efficient. I personally just like a reason to use modulo.
            for (let i = 1, l = ctrl.daysOfWeek.length - (ctrl.calendarDays.length % ctrl.daysOfWeek.length); i <= l; i++) {
              ctrl.calendarDays.push(new CalendarDay(i))
            }
          }, function (error) {
            console.log('Error: Unable to retrieve today\'s date')
            console.log(error)
          })
      }

      function ChangeTodaysDate (model) {
        catendarService.changeTodaysDate(model)
        catendarService.getHero()
        Load()
      }
    }
  }
}())