'use strict';

angular
  .module('simhood')
  .factory('MenuService', Menu);

// Inject your dependencies as .$inject = ['$http', '$anotherDependency'];
// function Name ($http, $anotherDependency) {...}

Menu.$inject = ['$http'];

function Menu($http) {
  var menu = [{
      link: 'search',
      name: 'Search!!'
    },{
      link: './about',
      name: 'About'
    },{
      link: './about',
      name: 'Research'
    },{
      link: './about',
      name: 'Press'
    },{
      link: './about',
      name: 'Contact'
    }];

  return {
    listMenu: function () {
      return menu;
    }
  };

}

