'use strict';
  /**
  * Route of the app
  */

angular.module('simhood').constant('RouteManifest', {
  'index': {
    url: '/',
    templateUrl: 'modules/index/index.html',
    controller: 'indexCtrl',
    controllerAs: 'vm',
    resolve: {
      deps: ['$ocLazyLoad',
        function ($ocLazyLoad) {
          return $ocLazyLoad.load(['modules/index/indexCtrl.js']);
        }
      ]
    }
  },
  'search': {
    url: '/search',
    templateUrl: 'modules/search/search.html',
    controller: 'searchCtrl',
    resolve: {
      deps: ['$ocLazyLoad',
        function ($ocLazyLoad) {
          return $ocLazyLoad.load(['modules/search/searchCtrl.js']);
        }
      ]
    }
  }
});
