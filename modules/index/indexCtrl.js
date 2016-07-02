(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('simhood')
		.controller('indexCtrl', Index);

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

	}

})();
