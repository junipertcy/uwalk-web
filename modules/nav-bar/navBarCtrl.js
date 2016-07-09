'use strict';

angular.module('simhood')
	.controller('NavBarCtrl', NavBar);

NavBar.$inject = ['indexService', 'menuService', 'queryService'];

function NavBar(indexService, menuService, queryService) {
	/*jshint validthis: true */
	var self = this;
	self.title = "simhood!!";
	self.menu = menuService.listMenu();

}