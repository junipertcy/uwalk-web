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
      .state('index', {
        url: '/',
        views: {
          'index': {
            templateUrl: 'modules/index/index.html',
            controller: 'indexCtrl',
            controllerAs: 'vm'
          }
        }
      });

  }]);
