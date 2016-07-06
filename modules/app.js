'use strict';

(function(angular, uwalk) {

  /**
  * @ngdoc index
  * @name app
  * @description
  * # app
  *
  * Main module of the application.
  */

  var app = angular.module('simhood', [
    'ngResource',
    'oc.lazyLoad',
    'ngAria',
    'ui.bootstrap',
    'ngCookies',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router'
  ]);

  app.constant('API', uwalk.API);

})(angular, uwalk);
