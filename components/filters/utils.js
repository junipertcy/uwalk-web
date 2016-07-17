'use strict';

angular.module('simhood')
  .filter('areaToNormal', function () {
  //Association football (soccer) field, a rectangular field, usually 105 m × 68 m or 7140 m2
  return function (input) {
    if (!input) return input;
    if (typeof input !== 'number') {
      return "0 square meters."
    } else if (input > 7140 && input < 1000000) {
      input = input.toPrecision(3);
      let estimate = (input/7140).toPrecision(3);
      return input.toString() + ' square meters. (about ' + estimate.toString() + ' soccer fields)';
    } else if (input >= 1000000) {
      input = input/1000000;
      let estimate = (input / 0.8).toPrecision(3);
      return input.toPrecision(3).toString() + ' square kilometers. ( about ' + estimate.toString() + ' golf courses)';
    }
  };
}).filter('capitalizeEveryFirstLetter', function () {
  return function (input) {
    if (!input) return input;
    if (typeof input !== 'string') {
      return input;
    }
    let _output = [];
    input.split(' ').forEach(function (o) {
      _output.push(o.charAt(0).toUpperCase() + o.slice(1));
    });
    return _output.join(' ');
  };
});