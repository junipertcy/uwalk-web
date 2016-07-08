'use strict';

angular.module('simhood')
  .service('indexService', indexService);

indexService.$inject = ['$http'];

function indexService($http) {

  var list = [
    {"feature": "Search with your neighbourhoods! You obtain results with similar neighbourhoods around the world."},
    {"feature": "Share your search result on Twitter or Facebook!"},
    {"feature": "Get a feeling of how these neighbourhoods are similar."},
    {"feature": "Propose a better query result with ease. Send it back and let us know!"},
    {"feature": "Cheng-Te and Eddie are very handsome."},
    {"feature": "Our UX designer, Gao Xi is awesome!"}
  ];

  return {
    getFeaturesList: getFeaturesList
  };

  function getFeaturesList() {
    return list;
  }

}

