;(function () {
  angular.module('catendar-app')
    .directive('hero', Hero)

  function Hero () {
    HeroController.$inject = ['catendarService']

    return {
      controller: HeroController,
      controllerAs: 'heroCtrl',
      link: Link,
      templateUrl: './scripts/hero/hero.template.html'
    }
    
    function Link (scope, ele, attr, ctrl) {
      scope.hasAuthor = HasAuthor
      scope.hasQuote = HasQuote

      function HasAuthor () {
        return ctrl.author.length > 0
      }
      
      function HasQuote () {
        return ctrl.quote.length > 0
      }
    }
    
    function HeroController (catendarService) {
      var ctrl = this
      ctrl.heroStyle = {
        'background-image': 'none'
      }
      ctrl.quote = ''
      ctrl.author = ''
      
      ctrl.updateHero = UpdateHero
      
      catendarService.getTodaysDate()
        .then(function () {
          UpdateHero()
        })
      
      function UpdateHero () {
        catendarService.getHero()
            .then(function (response) {
              ctrl.heroStyle['background-image'] = 'url(' + response.heroURL + ')'
              ctrl.quote = response.quote
              ctrl.author = response.author
            }, function (error) {
              console.log('Error: unable to retrieve the hero')
              console.log(error)
            })
      }
    }
  }
}())