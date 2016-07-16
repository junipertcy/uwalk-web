'use strict';
angular.module('simhood')
  .controller('searchCtrl', Index);

Index.$inject = ['indexService', '$scope', '$timeout', '$mdSidenav', '$log', '$location', '$stateParams', 'leafletData', 'geojsonArea'];

function Index(indexService, $scope, $timeout, $mdSidenav, $log, $location, $stateParams, leafletData, geojsonArea) {
  /*jshint validthis: true */
  var vm = this;
  vm.title = "Hello, simhood!";
  vm.version = "1.0.0";
  vm.listFeatures = indexService.getFeaturesList();
  $scope.savedItems = [];
  $scope.city_name = $stateParams.value || "New York";

  $location.search({
    city: $stateParams.value ? $stateParams.value.split(' ').join('-') : 'default'
  });

  angular.extend($scope, {
    center: {
      lat: $stateParams.lat || 40.7078,
      lng: $stateParams.lng || -73.905,
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
      maxZoom: 16,
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
      $scope.savedItems.push({
        geoJSON: e.target.feature
      });
      layer.setStyle({
        fillColor: 'grey'
      });
    } else if (e.target.isHighlighted === true) {
      e.target.isHighlighted = !e.target.isHighlighted;
      $scope.savedItems.pop(); //wrong! for test only!
      layer.setStyle({
        fillColor: 'Salmon'
      });
    }
    if (!L.Browser.ie && !L.Browser.opera) {
      layer.bringToFront();
    }
  }



  $scope.$watch("savedItems", function(newArray) {
      if (newArray.length !== 0) {
        console.log(newArray);
        var area = geojsonArea.geometry(newArray[0].geoJSON.geometry);
        $scope.selectedArea = area;
      }
  }, true);

  $scope.isUnconstrained = {
    status: false
  };

  $scope.$watch("isUnconstrained.status", function(newValue) {
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
        var drawOptions = {
          draw: {
            polyline: false,
            marker: false,
            polygon: {
              shapeOptions: {
                color: 'purple'
              }
            },
            circle: {
              shapeOptions: {
                stroke: true,
                weight: 4,
                color: 'blue',
                opacity: 0.5,
                fill: true,
                fillColor: null, //same as color by default
                fillOpacity: 0.2,
                clickable: true
              }
            }
          },
          showRadius: true,
          edit: {
            featureGroup: drawnItems
          }
        };

        var drawControl = new L.Control.Draw(drawOptions);
        angular.extend($scope, {
          controls: {
            custom: [drawControl]
          }
        });

        leafletData.getMap().then(function(map) {
          var drawnItems = $scope.controls.custom[0].options.edit.featureGroup;
          drawnItems.addTo(map);

          map.on('draw:created', function(e) {
            var layer = e.layer;
            drawnItems.addLayer(layer);

            $scope.savedItems.push({
              id: layer._leaflet_id,
              geoJSON: layer.toGeoJSON()
            });
            console.log('$scope.savedItems pushed: ', $scope.savedItems);
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

  $scope.showSpinner = true;
  setTimeout(function() {
    $scope.showSpinner = false;
  }, 3000);








}


angular.module('simhood')
  .controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$location', '$anchorScroll', 'queryService', 'PagerService', function($scope, $timeout, $mdSidenav, $log, $location, $anchorScroll, queryService, PagerService) {
    $scope.close = function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function() {
          $log.debug("close RIGHT is done");
        });
    };


    $scope.isShowSurveyBox = false;
    $scope.showSurveyBox = function($location, $anchorScroll) {
      $scope.isShowSurveyBox = !$scope.isShowSurveyBox;

      $location.hash("here");
      $anchorScroll();

      //window.alert('（本功能仍未完成，應該讓下面那個問卷選單滑上來）德德好厲害！');
    }

    $scope.userCity = '';

    $scope.cities = ('Taipei Beijing').split(' ').map(function(state) {
      return { name: state };
    });

    //pagination
    $scope.queryResults = queryService.getHoods(); // dummy array of items to be paged
    $scope.pager = {};
    $scope.setPage = setPage;

    $scope.setPage(1);

    function setPage(page, queryResults) {
      if (page < 1 || page > $scope.pager.totalPages) {
        return;
      }

      // get pager object from service
      $scope.pager = PagerService.GetPager($scope.queryResults.length, page, 6);

      // get current page of items
      $scope.items = $scope.queryResults.slice($scope.pager.startIndex, $scope.pager.endIndex);
    }
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
