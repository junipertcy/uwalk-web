'use strict';

  /**
  * @ngdoc function
  * @name app.route:HomeRoute
  * @description
  * # HomeRoute
  * Route of the app
  */

angular.module('simhood')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider

      .state('home', {
        url: '/',
        templateUrl: 'modules/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      });

  }]);
