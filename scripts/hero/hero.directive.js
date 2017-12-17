;(function () {
  angular.module('catendar-app')
    .directive('hero', Hero)

  function Hero () {
    HeroController.$inject = ['catendarService']

    return {
      controller: HeroController,
      controllerAs: 'heroCtrl',
      scope: {},
      templateUrl: './scripts/hero/hero.template.html'
    }

    function HeroController (catendarService) {
      var ctrl = this
      ctrl.heroStyle = {
        'background-image': 'none'
      }
      ctrl.quote = ''
      ctrl.quoteAuthor = ''

      catendarService.getHeroWithDate()
        .then(function (response) {
          ctrl.heroStyle['background-image'] = 'url(' + response.heroURL + ')'
          ctrl.quote = response.quote
          ctrl.quoteAuthor = response.quoteAuthor
        }, function (error) {
          console.log('Error: unable to retrieve the hero')
          console.log(error)
        })
    }
  }
}())