'use strict';

angular.module('simhood')
  .controller('FooterCtrl', Footer);

function Footer($scope, $cookieStore) {
  //one can use $cookieStore.get('domainType'); to change the domain type
  //Combining the html correspond to the controller, one can design responsive footers
  $scope.domainType = 'simhood';
}