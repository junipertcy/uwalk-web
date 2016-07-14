'use strict';
angular.module('simhood')
  .controller('searchCtrl', Index);

Index.$inject = ['indexService', '$scope', '$timeout', '$mdSidenav', '$log', '$location', '$stateParams', 'leafletData'];

function Index(indexService, $scope, $timeout, $mdSidenav, $log, $location, $stateParams, leafletData) {
  /*jshint validthis: true */
  var vm = this;
  vm.title = "Hello, simhood!";
  vm.version = "1.0.0";
  vm.listFeatures = indexService.getFeaturesList();

  $location.search({
    city: $stateParams.value.split(' ').join('-')
  });

  angular.extend($scope, {
    center: {
      lat: $stateParams.lat,
      lng: $stateParams.lng,
      zoom: 11
    },
    defaults: {
      zoomControl: true,
      zoomControlPosition: 'bottomleft',
      doubleClickZoom: false,
      scrollWheelZoom: false,
      tap: false,
      touchZoom: false,
      minZoom: 11,
      maxZoom: 15,
      attributionControl: false,
      zoomsliderControl: true,
      controls: {
        layers: {
          visible: false
        }
      }
    },
    layers: {
      baselayers: {
        osm: {
          name: 'OpenStreetMap',
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          type: 'xyz'
        },
      },
      overlays: {}
    }

  });

  d3.json('assets/geojson/newyork.geojson', function(err, data) {
    angular.extend($scope.layers.overlays, {
      neighborhoods: {
        name: "cityRegions",
        type: "geoJSONShape",
        data: data,
        visible: true,
        layerOptions: {
          style: {
            color: "GhostWhite",
            fillColor: "Salmon",
            weight: 2.0,
            opacity: 0.6,
            fillOpacity: 0.4
          },
          onEachFeature: onEachFeature
        }
      }
    });

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: encircleFeature,
        mouseout: resetEncircle,
        click: highlightFeature
      });
    }
  });

  var encircleFeature = function(e) {
    var layer = e.target;
    layer.setStyle({
      color: 'grey'
    });
    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  }

  var resetEncircle = function(e) {
    var layer = e.target;
    layer.setStyle({
      color: 'GhostWhite'
    });
    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  }

  var highlightFeature = function(e) {
    console.log(e.target);
    var layer = e.target;
    if (typeof e.target.isHighlighted === "undefined" || e.target.isHighlighted === false) {
      e.target.isHighlighted = true;
      layer.setStyle({
        fillColor: 'grey'
      });
    } else if (e.target.isHighlighted === true) {
      e.target.isHighlighted = !e.target.isHighlighted;
      layer.setStyle({
        fillColor: 'Salmon'
      });
    }
    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  }




  $scope.savedItems = [];
  $scope.isUnconstrained = {
    status: false
  };

  $scope.$watch(
    "isUnconstrained.status",
    function(newValue) {
      angular.extend($scope.layers.overlays, {
        neighborhoods: {
          visible: !newValue
        }
      });
      if (newValue === true) {
        var drawnItems = new L.FeatureGroup();
        for (var i = 0; i < $scope.savedItems.length; i++) {
          L.geoJson($scope.savedItems[i].geoJSON, {
            style: function(feature) {
              return {
                color: '#bada55'
              };
            },
            onEachFeature: function(feature, layer) {
              drawnItems.addLayer(layer);
            }
          });
        }

        angular.extend($scope, {
          controls: {
            draw: {},
            edit: {
              featureGroup: drawnItems
            }
          }
        });

        leafletData.getMap().then(function(map) {
          var drawnItems = $scope.controls.edit.featureGroup;
          drawnItems.addTo(map);


          map.on('draw:created', function(e) {
            var layer = e.layer;
            drawnItems.addLayer(layer);

            $scope.savedItems.push({
              id: layer._leaflet_id,
              geoJSON: layer.toGeoJSON()
            });
          });

          map.on('draw:edited', function(e) {
            var layers = e.layers;
            layers.eachLayer(function(layer) {
              for (var i = 0; i < $scope.savedItems.length; i++) {
                if ($scope.savedItems[i].id == layer._leaflet_id) {
                  $scope.savedItems[i].geoJSON = layer.toGeoJSON();
                }
              }
            });
          });

          map.on('draw:deleted', function(e) {
            var layers = e.layers;
            layers.eachLayer(function(layer) {
              for (var i = 0; i < $scope.savedItems.length; i++) {
                if ($scope.savedItems[i].id == layer._leaflet_id) {
                  $scope.savedItems.splice(i, 1);
                }
              }
            });
          });
        });
      } else {
        angular.extend($scope, {
          controls: {}
        });
      }
    }
  );


  $scope.sizes = [
    "small (12-inch)",
    "medium (14-inch)",
    "large (16-inch)",
    "insane (42-inch)"
  ];



  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.isOpenRight = function() {
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
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }


  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function() {
          $log.debug("toggle " + navID + " is done");
        });
    };
  }


  $scope.totalItems = 64;
  $scope.currentPage = 4;

  $scope.setPage = function(pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };
}


angular.module('simhood').controller('LeftCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function() {
          $log.debug("close LEFT is done");
        });

    };
  }])
  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function() {
          $log.debug("close RIGHT is done");
        });
    };

    $scope.isShowSurveyBox = false;
    $scope.showSurveyBox = function() {
      $scope.isShowSurveyBox = !$scope.isShowSurveyBox;

      //window.alert('（本功能仍未完成，應該讓下面那個問卷選單滑上來）德德好厲害！');
    }

    $scope.userCity = '';

    $scope.cities = ('Taipei Beijing').split(' ').map(function(state) {
      return { name: state };
    });

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
  }])
  .animation('.fade', function() {
    //not finished yet....
    return {
      enter: function(element, done) {
        element.css('display', 'none');
        $(element).fadeIn(1000, function() {
          done();
        })
      },
      leave: function(element, done) {
        element.css('display', 'none');
        $(element).slideDown(500, function() {
          done();
        });
      }
    }
  })


// $scope.message = 'false';

// $scope.onChange = function(cbState) {
//   $scope.message = cbState;
// };
// angular.extend($scope, {
//   defaults: {
//     scrollWheelZoom: false
//   }
// })
