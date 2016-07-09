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

  iCtrl.images = [{
    url: "assets/img/index-fig1.png",
    caption: "Help people and people help you."
  },{
    url: "assets/img/index-fig2.png",
    caption: "Love people and people love you."
  },{
    url: "assets/img/index-fig3.png",
    caption: "Meet people and people meet you."
  }];

}


