(function () {
  'use strict';
  angular.module('simhood')
    .controller('searchCtrl', Index);

  Index.$inject = ['indexService'];

  /*
  * recommend
  * Using function declarations
  * and bindable members up top.
  */

  function Index(indexService) {
    /*jshint validthis: true */
    var vm = this;
    vm.title = "Hello, simhood!";
    vm.version = "1.0.0";
    vm.listFeatures = indexService.getFeaturesList();
    vm.data = [10,20,30,40,60, 80, 20, 50];
  }

})();
