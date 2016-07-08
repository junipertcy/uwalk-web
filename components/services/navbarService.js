'use strict';

angular
  .module('simhood')
  .factory('MenuService', Menu);

// Inject your dependencies as .$inject = ['$http', '$anotherDependency'];
// function Name ($http, $anotherDependency) {...}

Menu.$inject = ['$http'];

function Menu($http) {
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

