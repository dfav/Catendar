;(function () {
    angular.module('catendar-app')
        .directive('hero', Hero)
    
    function Hero () {
        HeroController.$inject = ['heroService']
        
        return {
            controller: HeroController,
            controllerAs: 'heroCtrl',
            scope: {},
            template: `
                <div id="hero-bg" ng-style="heroCtrl.heroStyle"></div>
                <div class="hero-quote">
                    <span class="hero-quote-msg">"{{heroCtrl.quote}}"</span>
                    <span class="hero-quote-author">~ {{heroCtrl.quoteAuthor}}</span>
                </div>`
        }

        function HeroController (heroService) {
            var ctrl = this
            ctrl.heroStyle = {
                'background-image': 'none'
            }
            ctrl.quote = ''
            ctrl.quoteAuthor = ''
            
            heroService.getHeroWithDate()
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