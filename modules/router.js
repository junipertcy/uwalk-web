'use strict';

/*
** router setup
 */

angular.module('simhood').config(function ($stateProvider, $urlRouterProvider, $locationProvider, RouteManifest){
  $urlRouterProvider.otherwise('/');

  var _routers = _.sortBy(_.toPairs(RouteManifest), function(val){ return val[0].length; });

  _routers.forEach(function(o){
    var path = o[0];
    var config = o[1];
    console.log('path', path);
    console.log('config', config);

    $stateProvider.state(path, config);

  });
  $locationProvider.html5Mode(true);


}).run(function($rootScope, $location, $state){
  $rootScope.$on();
});