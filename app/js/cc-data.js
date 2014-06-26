angular.module('cc-data', [])
.constant('COUNTRIES_PATH','http://api.geonames.org/countryInfoJSON?formatted=true&style=full')
.constant('API_AUTH', '&username=evan007')
.constant('NEIGHBORS_PATH', 'http://api.geonames.org/neighboursJSON?country=')
.constant('SEARCH_PATH', 'http://api.geonames.org/searchJSON?')
.factory('Countries', [
  'API_AUTH',
  'COUNTRIES_PATH',
  '$http',
  '$q',
  function (API_AUTH, COUNTRIES_PATH, $http, $q) {
    return function () {
      var defer = $q.defer();
      $http.get(COUNTRIES_PATH + API_AUTH, { cache: true }).success(function (data) {
        defer.resolve(data.geonames);
      });
      return defer.promise;
    };
  }
]).factory('Neighbors', [
  'API_AUTH',
  '$http',
  'NeighborData',
  'NEIGHBORS_PATH',
  '$q',
  function (API_AUTH, $http, NeighborData, NEIGHBORS_PATH, $q) {
    return function (countryId) {
      var defer = $q.defer();
      $http.get(NEIGHBORS_PATH + countryId + API_AUTH, { cache: true }).success(function (data) {
        if (data.totalResultsCount > 0) {
          var countryIds = [];
          for (var n = 0; n < data.geonames.length; n++) {
            countryIds.push(data.geonames[n].countryCode);
          }
          defer.resolve(NeighborData(countryIds));
        }
      });
      return defer.promise;
    };
  }
]).factory('NeighborData', [
  'API_AUTH',
  'COUNTRIES_PATH',
  '$http',
  '$q',
  function (API_AUTH, COUNTRIES_PATH, $http, $q) {
    return function (countryArray) {
      var countryIds = countryArray.join('&country=');
      var defer = $q.defer();
      $http.get(COUNTRIES_PATH + '&country=' + countryIds + API_AUTH, { cache: true }).success(function (data) {
        defer.resolve(data.geonames);
      });
      return defer.promise;
    };
  }
]).factory('CapitalData', [
  'API_AUTH',
  '$http',
  '$q',
  'SEARCH_PATH',
  function (API_AUTH, $http, $q, SEARCH_PATH) {
    return function (countryId, capital) {
      var defer = $q.defer();
      $http.get(SEARCH_PATH + '&name_equals=' + capital + '&country=' + countryId + API_AUTH, { cache: true }).success(function (data) {
        defer.resolve(data.geonames[0]);
      });
      return defer.promise;
    };
  }
]).factory('CountryData', [
  'API_AUTH',
  '$http',
  '$q',
  'COUNTRIES_PATH',
  function (API_AUTH, $http, $q, COUNTRIES_PATH) {
    return function (countryId) {
      var defer = $q.defer();
      $http.get(COUNTRIES_PATH + '&country=' + countryId + API_AUTH, { cache: true }).success(function (data) {
        defer.resolve(data.geonames[0]);
      });
      return defer.promise;
    };
  }
]);