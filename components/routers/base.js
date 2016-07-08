'use strict';
  /**
  * Route of the app
  */

angular.module('simhood').constant('RouteManifest', {
  'index': {
    url: '/',
    templateUrl: 'modules/index/index.html',
    controller: 'indexCtrl',
    controllerAs: 'iCtrl',
    resolve: {
      deps: ['$ocLazyLoad',
        function ($ocLazyLoad) {
          return $ocLazyLoad.load([
            'modules/index/indexCtrl.js'
          ]);
        }
      ]
    }
  },
  'about': {
    url: '/about',
    templateUrl: 'modules/about/about.html',
    controller: 'aboutCtrl',
    controllerAs: 'aCtrl',
    resolve: {
      deps: ['$ocLazyLoad',
        function ($ocLazyLoad) {
          return $ocLazyLoad.load(['modules/about/aboutCtrl.js']);
        }
      ]
    }
  },
  'behind': {
    url: '/behind',
    templateUrl: 'modules/behind/behind.html',
    controller: 'behindCtrl',
    controllerAs: 'bCtrl',
    resolve: {
      deps: ['$ocLazyLoad',
        function ($ocLazyLoad) {
          return $ocLazyLoad.load(['modules/behind/behindCtrl.js']);
        }
      ]
    }
  },
  'research': {
    url: '/research',
    templateUrl: 'modules/research/research.html',
    controller: 'researchCtrl',
    controllerAs: 'rCtrl',
    resolve: {
      deps: ['$ocLazyLoad',
        function ($ocLazyLoad) {
          return $ocLazyLoad.load(['modules/research/researchCtrl.js']);
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
