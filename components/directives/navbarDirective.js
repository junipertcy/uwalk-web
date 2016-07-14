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
      menus: '='
    },
    controller: control,
    templateUrl: 'components/directives/tpl/navbar-tpl.html'
  };

  return directive;

  function link(scope, element, attrs, $timeout, $q) {
    var querySearch = function(query) {
      console.log('scope.repos',scope.repos);
      var results = query ? scope.repos.filter(queryService.createFilterFor(query)) : scope.repos;
      var deferred;

      if (queryService.getSimulateQuery()) {
        deferred = $q.defer();
        $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    };

    var searchTextChange = function($log, text) {
      console.log('Text changed to ' + text);
    };

    var selectedItemChange = function(item) {
      console.log('Item changed to ' + JSON.stringify(item));
    };

    var loadAll = function() {
      var promise = queryService.getCities();
      promise.then(function(data){
        data.data.map(function(o) {
          o.value = o.city_name.toLowerCase();
        });
        scope.repos = data.data;
      }, function(err) {
        console.error('[navBar] No cities data obtained, its $http.get error says ', err);
      });
    };

    loadAll();
    scope.querySearch = querySearch;
    scope.selectedItemChange = selectedItemChange;
    scope.searchTextChange = searchTextChange;

    scope = {
      menus: [],
      search: {
        show: false
      }
    };
  }

  function control($scope, $location, $state) {
    $scope.isActive = function(path) {
      var currentPath = $location.path().split('/')[1];
      if (currentPath.indexOf('?') !== -1) {
        currentPath = currentPath.split('?')[0];
      }
      return currentPath === path.split('/')[1];
    };
    $scope.toSearch = function (params) {
      $state.go('search', {
        lat: params.lat,
        lng: params.lng,
        value: params.value
      });
    };
  }
}
