angular.module('simhood').service('Cache', Cache)

Cache.$inject = ['md5'];

function Cache(md5) {
  var cache = {};

  var _checkAndWrapKeyAsString = function (key) {
  if (!key) return key;
    if (typeof key !== 'string') {
      key = JSON.stringify(key);
    }
    return md5.createHash(key);
  };

  var _ensureTypeIsExist = function (type) {
    if (!cache[type]) {
      cache[type] = {};
    }
  };

  this.md5 = function (params) {
    return _checkAndWrapKeyAsString(params);
  };

  // set cache
  this.set = function(type, key, val) {
    if (!val) return this.del(type, key);

    type = _checkAndWrapKeyAsString(type);
    key = _checkAndWrapKeyAsString(key);
    _ensureTypeIsExist(type);

    cache[type][key] = val;
  };

  // get cache
  this.get = function(type, key) {
    type = _checkAndWrapKeyAsString(type);
    if (!key) return cache[type];
    key = _checkAndWrapKeyAsString(key);
    return cache[type] && cache[type][key];
  };

  // delete cache
  this.del = function(type, key) {
    type = _checkAndWrapKeyAsString(type);
    if (!key) {
      return delete cache[type];
    }
    key = _checkAndWrapKeyAsString(key);
    if (cache[type]) {
      delete cache[type][key];
    }
  };

  // delete all cache
  this.clearAll = function() {
    cache = {};
  };
}

