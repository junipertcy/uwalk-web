(function () {
  'use strict';

  /**
  * @ngdoc configuration file
  * @name app.config:config
  * @description
  * # Config and run block
  * Configutation of the app
  */
  angular
    .module('simhood')
    .config(configure)
    .run(runBlock);

  configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

  function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $locationProvider.html5Mode(true);

    // This is required for Browser Sync to work poperly
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
        $urlRouterProvider
        .otherwise('/');
      }

      runBlock.$inject = ['$rootScope'];

      function runBlock($rootScope) {
        console.log('AngularJS run() function...');
      }


    })();
