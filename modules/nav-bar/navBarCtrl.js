(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:NavBarCtrl
	* @description
	* # NavBarCtrl
	* Controller of the app
	*/

	angular
		.module('simhood')
		.controller('NavBarCtrl', NavBar);

	NavBar.$inject = ['indexService', 'MenuService'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function NavBar(indexService, MenuService) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = "simhood!!";
		vm.menu = MenuService.listMenu();

	}

})();
