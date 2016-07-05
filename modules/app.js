(function() {
  'use strict';

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
    'ui.router',
    'index',
  ]);
})();
