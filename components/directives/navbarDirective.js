'use strict';

angular
  .module('simhood')
  .directive('navBar', navBar);

navBar.$inject = ['queryService'];

function navBar(queryService) {

  var directive = {
    link: link,
    restrict: 'EA',
    scope: {
      menus: '=',
      brand: '='
    },
    controller: control,
    templateUrl: 'components/directives/tpl/navbar-tpl.html'
  };

  return directive;

  function link(scope, element, attrs, $location, $timeout) {
    var querySearch = function(query) {
      var results = query ? self.repos.filter(queryService.createFilterFor(query)) : self.repos;
      var deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    var searchTextChange = function($log, text) {
      console.log('Text changed to ' + text);
    }

    var selectedItemChange = function(item) {
      console.log('Item changed to ' + JSON.stringify(item));
    }

    var loadAll = function() {
      return repos.map(function(repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
    }

    scope.repos = loadAll();
    scope.querySearch = querySearch;
    scope.selectedItemChange = selectedItemChange;
    scope.searchTextChange = searchTextChange;

    // write your code here
    scope = {
      brand: '',
      menus: [],
      search: {
        show: false
      }
    }; // end defaults
  }

  function control($scope, $location) {

    $scope.isActive = function(path) {
      var currentPath = $location.path().split('/')[1];
      if (currentPath.indexOf('?') !== -1) {
        currentPath = currentPath.split('?')[0];
      }
      return currentPath === path.split('/')[1];
    };
  }

}
