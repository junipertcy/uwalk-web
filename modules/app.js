'use strict';

(function(angular, uwalk) {
  var app = angular.module('simhood', [
    'angular-loading-bar',
    'ngResource',
    'oc.lazyLoad',
    'angularPainlessTitle', //Not used currently
    'leaflet-directive',
    'ngAria',
    'ui.bootstrap',
    'ngAside',
    'ngMaterial',
    'ngCookies',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ui.router'
  ]);

  app.constant('API', uwalk.API);

})(angular, uwalk);
