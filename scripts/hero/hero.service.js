;(function () {
    angular.module('catendar-app')
        .service('heroService', HeroService)
    
    HeroService.$inject = ['$http', '$q']
    
    function HeroService ($http, $q) {
        return {
            getHeroWithDate: GetHeroWithDate
        }
        
        function GetHeroWithDate (date) {
            var deferred = $q.defer()
            
            $http.get('./api/getHeroWithDate.php')
            .then(function (response) {
                deferred.resolve(response.data)
            }, function (error) {
                deferred.reject(error)
            })
            
            return deferred.promise
        }
    }
}())