;(function () {
    angular.module('catendar-app')
        .service('catendarService', CatendarService)
    
    CatendarService.$inject = ['$http', '$q']
    
    function CatendarService ($http, $q) {
        // Private variables
        var daysOfWeek = [{
            full: 'SUNDAY',
            abbreviate: 'S'
        },{
            full: 'MONDAY',
            abbreviate: 'M'
        },{
            full: 'TUESDAY',
            abbreviate: 'T'
        },{
            full: 'WEDNESDAY',
            abbreviate: 'W'
        },{
            full: 'THURSDAY',
            abbreviate: 'T'
        },{
            full: 'FRIDAY',
            abbreviate: 'F'
        },{
            full: 'SATURDAY',
            abbreviate: 'S'
        }]
        var monthNames = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER']
        var todaysDate = null
        
        // Bind public methods
        this.changeTodaysDate = ChangeTodaysDate
        this.getDaysOfWeek = GetDaysOfWeek
        this.getDayOfWeekWithIndex = GetDayOfWeekWithIndex
        this.getMonthNames = GetMonthNames
        this.getMonthNameWithIndex = GetMonthNameWithIndex
        this.getTodaysDate = GetTodaysDate
        
        // Hoist methods
        function ChangeTodaysDate (model) {
            todaysDate = new Date(model.year, model.month, model.day)
        }
        
        function GetDaysOfWeek () {
            return daysOfWeek
        }
        
        function GetDayOfWeekWithIndex (index) {
            return daysOfWeek[index]
        }
        
        function GetMonthNames () {
            return monthNames
        }
        
        function GetMonthNameWithIndex (index) {
            return monthNames[index]
        }
        
        function GetTodaysDate () {
            var deferred = $q.defer()
            
            $http.get('./api/getTimecode.php')
                .then(function (response) {
                    todaysDate = new Date(response.data.timecode)
                    deferred.resolve(todaysDate)
                }, function (error) {
                    deferred.reject(error)
                })
            
            return deferred.promise
        }
    }
}())