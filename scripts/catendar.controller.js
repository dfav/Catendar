;(function () {
  angular.module('catendar-app')
    .controller('catendarCtrl', CatendarController)
  
  CatendarController.$inject = ['$scope']
  
  function CatendarController ($scope) {
    var now = new Date()
    
    // Bind Properties
    $scope.settings = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate()
    }
    $scope.showConfig = false

    // Bind Methods
    $scope.toggleConfig = ToggleConfig
    $scope.updateSettings = UpdateSettings

    function ToggleConfig () {
      $scope.showConfig = !$scope.showConfig
    }

    function UpdateSettings () {
      $scope.monthInfoCtrl.changeTodaysDate($scope.settings)
      $scope.heroCtrl.updateHero()
      ToggleConfig()
    }
  }
}())