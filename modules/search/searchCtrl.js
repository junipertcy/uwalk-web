'use strict';
angular.module('simhood')
  .controller('searchCtrl', Index);

Index.$inject = ['indexService', '$scope'];

/*
* recommend
* Using function declarations
* and bindable members up top.
*/

function Index(indexService, $scope) {
  /*jshint validthis: true */
  var vm = this;
  vm.title = "Hello, simhood!";
  vm.version = "1.0.0";
  vm.listFeatures = indexService.getFeaturesList();
  angular.extend($scope, {
    newyork: {
      lat: 40.748817,
      lng: -73.985428,
      zoom: 11
    },
    defaults: {
      zoomControl: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
      minZoom: 11,
      maxZoom: 11
    }
  });

  $scope.data = {
    cb1: false
  };

  // $scope.message = 'false';

  // $scope.onChange = function(cbState) {
  //   $scope.message = cbState;
  // };
  // angular.extend($scope, {
  //   defaults: {
  //     scrollWheelZoom: false
  //   }
  // })

}