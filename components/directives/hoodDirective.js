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
    }
  };

  function control($scope) {
    return;
  }



}