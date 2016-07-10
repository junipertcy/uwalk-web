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
      zoomControl: true,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
      minZoom: 11,
      maxZoom: 15,
      attributionControl: false,
      zoomsliderControl: true,
      zoomControlPosition: 'bottomleft'
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

    $scope.queryResults = [{
      hoodId: '',
      similarity: '9.23',
      parentCity: 'London',
      pic: 'assets/img/searchResult/piccadilly_circus.jpg',
      desc: 'Piccadilly Circus is a road junction and public space of London\'s West End in the City of Westminster, built in 1819 to connect Regent Street with Piccadilly.',
      data: {
        beer: 23,
        cutlery: 34,
        coffee: 84,
        bed: 23,
        car: 10
      }
    }, {
      hoodId: '',
      similarity: '8.74',
      parentCity: 'Paris',
      pic: 'assets/img/searchResult/AdCE.jpg',
      desc: 'The Avenue des Champs-Élysées is a boulevard in the 8th arrondissement of Paris, 1.9 kilometres long and 70 metres wide, which runs between the Place de la Concorde and the Place Charles de Gaulle, where the Arc de Triomphe is located.',
      data: {
        beer: 19,
        cutlery: 38,
        coffee: 35,
        bed: 93,
        car: 12
      }
    }, {
      hoodId: '',
      similarity: '8.48',
      parentCity: 'Beijing',
      pic: 'assets/img/searchResult/sanlitun.jpg',
      desc: 'Sanlitun is an area of the Chaoyang District, Beijing containing many popular bar streets and international stores. The area has been under almost constant regeneration since the late 20th century as part of a city-wide project of economic regrowth.',
      data: {
        beer: 92,
        cutlery: 12,
        coffee: 32,
        bed: 53,
        car: 25
      }
    }, {
      hoodId: '',
      similarity: '6.91',
      parentCity: 'New York',
      pic: 'assets/img/searchResult/time_s.jpg',
      desc: 'Times Square is a major commercial intersection and neighborhood in Midtown Manhattan, New York City, at the junction of Broadway and Seventh Avenue, and stretching from West 42nd to West 47th Streets.',
      data: {
        beer: 45,
        cutlery: 34,
        coffee: 13,
        bed: 44,
        car: 16
      }
    }, {
      hoodId: '',
      similarity: '5.41',
      parentCity: 'Berlin',
      pic: 'assets/img/searchResult/Unter_den_Linden.jpg',
      desc: 'Unter den Linden is a boulevard in the Mitte district of Berlin, the capital of Germany. It is named after its linden trees that line the grassed pedestrian mall between two carriageways.',
      data: {
        beer: 23,
        cutlery: 34,
        coffee: 84,
        bed: 23,
        car: 10
      }
    }];


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