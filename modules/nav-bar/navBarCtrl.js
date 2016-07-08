'use strict';

angular.module('simhood')
	.controller('NavBarCtrl', NavBar);

NavBar.$inject = ['indexService', 'MenuService'];

function NavBar(indexService, MenuService) {
	/*jshint validthis: true */
	var vm = this;
	vm.title = "simhood!!";
	vm.menu = MenuService.listMenu();

}

