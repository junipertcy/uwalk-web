'use strict';

(function(angular, uwalk) {
  var app = angular.module('simhood', [
    'angular-md5',
    'djds4rce.angular-socialshare',
    'angular-loading-bar',
    'ngResource',
    'oc.lazyLoad',
    'angularPainlessTitle', //Not used currently
    'leaflet-directive',
    'angular-flexslider',
    'ngAria',
    'ui.bootstrap',
    'ngAside',
    'ngMaterial',
    'ngCookies',
    'ngAnimate',
    'ngSanitize',
    'ui.router'
  ]);

  app.constant('API', uwalk.API);

})(angular, uwalk);
