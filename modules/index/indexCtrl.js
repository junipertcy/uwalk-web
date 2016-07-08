'use strict';

angular.module('simhood')
	.controller('indexCtrl', Index);

Index.$inject = ['indexService'];

function Index(indexService) {
	/*jshint validthis: true */
	var iCtrl = this;
	iCtrl.title = "Hello, SimHood!";
	iCtrl.version = "0.0.1";
	iCtrl.listFeatures = indexService.getFeaturesList();
}

