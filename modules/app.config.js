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

configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'usSpinnerConfigProvider', '$logProvider'];

function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, usSpinnerConfigProvider, $logProvider) {
  $locationProvider.html5Mode(true);
  // This is required for Browser Sync to work poperly
  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  $urlRouterProvider.otherwise('/');


  usSpinnerConfigProvider.setDefaults({color: 'pink'});
  $logProvider.debugEnabled(false)
}

runBlock.$inject = ['$rootScope', '$FB'];

function runBlock($rootScope, $FB) {
  // $FB.init('934554036670641');
  console.log('AngularJS run() function...');
}
