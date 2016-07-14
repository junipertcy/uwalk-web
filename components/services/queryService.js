'use strict';

angular
  .module('simhood')
  .service('queryService', queryService);

// Inject your dependencies as .$inject = ['$http', '$anotherDependency'];
// function Name ($http, $anotherDependency) {...}

queryService.$inject = ['$q', 'API', '$http', 'Cache'];

function queryService($q, API, $http, Cache) {
  let CACHE_TYPE = "repo_cities";
  console.log('here problem?');

  let repos = [{
    'name': 'New York City',
    'url': 'https://github.com/angular/angular.js',
    'area': '305 mi²',
    'population': '8.4 million',
  }, {
    'name': 'London',
    'url': 'https://github.com/angular/angular',
    'area': '607 mi²',
    'population': '8.7 million',
  }, {
    'name': 'San Francisco',
    'url': 'https://github.com/angular/material',
    'area': '232 mi²',
    'population': '0.83 million',
  }, {
    'name': 'Paris',
    'url': 'https://github.com/angular/bower-material',
    'area': '40.7 mi²',
    'population': '2.2 million',
  }];

  let simulateQuery = false;
  let isDisabled = false;

  return {
    createFilterFor: function(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };
    },
    getRepos: function() {
      return repos;
    },
    getSimulateQuery: function() {
      return simulateQuery;
    },
    getIsDisabled: function() {
      return isDisabled;
    },
    getCities: function(params) {
      var deferred = $q.defer();
      var key = params || 'repo_cities'
      var result = Cache.get(CACHE_TYPE, key);
      if (result) {
        deferred.resolve(result);
      } else {
        $http.get(API + '/foursquares/raw/getCities', {
          params: params
        }).success(function(ret) {
          Cache.set(CACHE_TYPE, key, ret);
          deferred.resolve(ret);
        }).error(function(err){
          deferred.reject(err);
        });
      }
      return deferred.promise;
    }
  };
}
