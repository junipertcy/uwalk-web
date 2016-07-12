'use strict';

angular.module('simhood')
  .controller('behindCtrl', Behind);

Behind.$inject = ['indexService'];

function Behind(indexService) {
  /*jshint validthis: true */
  var bCtrl = this;

  bCtrl.behindData = [{
    name: "LI, Cheng-Te",
    picUrl: "assets/img/authorPhoto/ctli.png",
    title: "Principle Investigator",
    desc: "TeTe is very handsome. Everyone knows it.",
    urls: {
      site: "http://www.citi.sinica.edu.tw/pages/ctli/index_en.html",
      mail: "",
      fb: "",
      twitter: "",
      pinterest: "",
      gplus: ""
    }
  },{
    name: "LIN, Tzu-Yun (Eddie)",
    picUrl: "assets/img/authorPhoto/eddie.png",
    title: "Data Scientist",
    desc: "Eddie is handsome too. No need to say again.",
    urls: {
      site: "http://tweddielin.com/",
      mail: "",
      fb: "",
      twitter: "",
      pinterest: "",
      gplus: ""
    }
  },{
    name: "YEN, Tzu-Chi",
    picUrl: "assets/img/authorPhoto/tzuchi.png",
    title: "Web Developer",
    desc: "Tzu-Chi is a pure developer...",
    urls: {
      site: "http://junipertcy.info",
      mail: "",
      fb: "",
      twitter: "",
      pinterest: "",
      gplus: ""
    }
  },{
    name: "GAO, Xi (Zoe)",
    picUrl: "assets/img/authorPhoto/gaoxi.png",
    title: "Designer",
    desc: "Zoe is a good designer! This is her debut work!",
    urls: {
      site: "",
      mail: "",
      fb: "",
      twitter: "",
      pinterest: "",
      gplus: ""
    }
  }];


}

