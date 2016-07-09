'use strict';
angular.module('simhood')
  .controller('searchCtrl', Index)



Index.$inject = ['indexService', '$scope', '$timeout', '$mdSidenav', '$log'];

/*
* recommend
* Using function declarations
* and bindable members up top.
*/

function Index(indexService, $scope, $timeout, $mdSidenav, $log) {
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

  $scope.sizes = [
    "small (12-inch)",
    "medium (14-inch)",
    "large (16-inch)",
    "insane (42-inch)"
  ]



  $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }


    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }


    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      $log.log('Page changed to: ' + $scope.currentPage);
    };
    }


angular.module('simhood').controller('LeftCtrl', ['$scope', '$timeout','$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  }])
  .controller('RightCtrl', ['$scope', '$timeout','$mdSidenav', '$log', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  }]);


  // $scope.message = 'false';

  // $scope.onChange = function(cbState) {
  //   $scope.message = cbState;
  // };
  // angular.extend($scope, {
  //   defaults: {
  //     scrollWheelZoom: false
  //   }
  // })