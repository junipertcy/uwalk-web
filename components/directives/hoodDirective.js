'use strict';

angular.module('simhood')
  .directive('hoodSearch', hoodSearch);

function hoodSearch() {
  var directive = {
    link: link,
    restrict: 'EA',
    scope: {
      temp: '='
    },
    controller: control,
    templateUrl: 'components/directive/tpl/hood-tpl.html'
  };
  return directive;

  function link(scope, element, attrs, $location) {
    scope.defaults = {
      temp: ''
    };
  }

  function control($scope) {
    return;
  }


//https://www.npmjs.com/package/angular-aside

// angular.module('myApp')
//   .controller('MyController', function($scope, $aside) {
//     var asideInstance = $aside.open({
//       templateUrl: 'aside.html',
//       controller: 'AsideCtrl',
//       placement: 'left',
//       size: 'lg'
//     });
//   });






}