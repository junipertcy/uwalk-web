'use strict';

angular
  .module('simhood')
  .service('menuService', menuService);

// Inject your dependencies as .$inject = ['$http', '$anotherDependency'];
// function Name ($http, $anotherDependency) {...}

menuService.$inject = ['$http'];

function menuService($http) {
  var menu = [{
      link: 'about',
      name: 'About'
    },{
      link: 'research',
      name: 'Research'
    },{
      link: 'behind',
      name: 'Behind'
    },{
      link: 'search',
      name: 'Search the Hoods'
    }];

  return {
    listMenu: function () {
      return menu;
    }
  };

}

