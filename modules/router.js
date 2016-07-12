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
  $locationProvider.html5Mode(true).hashPrefix('!');


}).run(function($rootScope, $location, $state){
  $rootScope.$on();
});



// angular.module("simhood")
//   .config(function($stateProvider, $ocLazyLoadProvider, $urlRouterProvider) {

//     $urlRouterProvider.rule(function($injector, $location){
//       path = $location.path()
//       normalized = path.toLowerCase()
//       if (path !== normalized) {
//         return normalized;
//       }
//       hashTrailingSlash = path[path.length - 1] === '/'
//       if (hashTrailingSlash) {
//         return path.slice(0, path.length - 1);
//       }
//     });

//     $ocLazyLoadProvider.config({
//       modules: [{
//         name: 'index',
//         files: [


//         ],
//         serie: true
//       },{
//         name: 'about',
//         files: [


//         ],
//         serie: true
//       },{
//         name: 'behind',
//         files: [


//         ],
//         serie: true
//       },{
//         name: 'research',
//         files: [


//         ],
//         serie: true
//       },{
//         name: 'search',
//         files: [


//         ],
//         serie: true
//       }]
//     });

//     $stateProvider
//       .state('root',{
//         url: "/",
//         templateUrl: "",
//         abstract: true,
//         controller:
//         resolve: {
//           lazy: ["$ozLazyLoad", function ($ocLazyLoad) {
//             ''
//           }]
//         }
//       })

//       .state('root',{
//         url: "/",
//         templateUrl: "",
//         abstract: true,
//         controller:
//         resolve: {
//           lazy: ["$ozLazyLoad", function ($ocLazyLoad) {
//             ''
//           }]
//         }
//       })

//       .state('root',{
//         url: "/",
//         templateUrl: "",
//         abstract: true,
//         controller:
//         resolve: {
//           lazy: ["$ozLazyLoad", function ($ocLazyLoad) {
//             ''
//           }]
//         }
//       })



//   })