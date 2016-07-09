'use strict';

angular
  .module('simhood')
  .service('queryService', queryService);

// Inject your dependencies as .$inject = ['$http', '$anotherDependency'];
// function Name ($http, $anotherDependency) {...}

queryService.$inject = ['$q', '$log'];

function queryService($q, $log) {
  self.repos = [{
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

  self.simulateQuery = false;
  self.isDisabled = false;

  return {
    createFilterFor: function(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };
    }

  };

}
