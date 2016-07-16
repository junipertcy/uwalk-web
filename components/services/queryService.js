'use strict';

angular
  .module('simhood')
  .service('queryService', queryService);

// Inject your dependencies as .$inject = ['$http', '$anotherDependency'];
// function Name ($http, $anotherDependency) {...}

queryService.$inject = ['$q', 'API', '$http', 'Cache'];

function queryService($q, API, $http, Cache) {
  let CACHE_TYPE = "repo_cities";

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
    },
    getHoods: function() {
      let queryResults = [{
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
      },{
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
      },];

      return queryResults;
    }
  };
}
