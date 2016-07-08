'use strict';

/**
* @ngdoc function
* @name app.controller:HomeCtrl
* @description
* # HomeCtrl
* Controller of the app
*/
angular.module('simhood')
	.controller('indexCtrl', Index);

Index.$inject = ['indexService'];

/*
* recommend
* Using function declarations
* and bindable members up top.
*/

function Index(indexService) {
	/*jshint validthis: true */
	var iCtrl = this;
	iCtrl.title = "Hello, SimHood!";
	iCtrl.version = "0.0.1";
	iCtrl.listFeatures = indexService.getFeaturesList();
}

