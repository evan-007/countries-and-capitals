angular.module('cc-data', [])

.constant('COUNTRIES_PATH', 'http://api.geonames.org/countryInfoJSON?formatted=true&style=full')
.constant('API_AUTH', '&username=evan007')
.constant('NEIGHBORS_PATH', 'http://api.geonames.org/neighboursJSON?country=')
.constant('SEARCH_PATH', 'http://api.geonames.org/searchJSON?')
//refactor into one factory?
.factory('Countries', function(API_AUTH, COUNTRIES_PATH, $http, $q){
  return function(){
    var defer = $q.defer();
    $http.get(COUNTRIES_PATH+API_AUTH, {cache: true})
    .success(function(data){
      defer.resolve(data);
    });
    return defer.promise;
  };
})

.factory('Neighbors', function(API_AUTH, $http, NeighborData, NEIGHBORS_PATH, $q){
  return function(countryId){
    var defer = $q.defer();
    $http.get(NEIGHBORS_PATH+countryId+API_AUTH, {cache: true})
    .success(function(data){
      if (data.geonames.length >= 0) {
      var countryIds = [];
      for(var n = 0; n < data.geonames.length; n++) {
        countryIds.push(data.geonames[n].countryCode);
      };
      console.log(countryIds);
    };
      defer.resolve(data.geonames);
    });
    return defer.promise;
  };
})

.factory('NeighborData', function(API_AUTH, COUNTRIES_PATH, $http, $q) {
  return function(countryArray) {
    var countryIds = countryArray.join('&country=');
    var defer = $q.defer();
    $http.get(COUNTRIES_PATH+'&country='+countryIds+API_AUTH, { cache: true})
    .success(function(data){
      defer.resolve(data);
      console.log(data);
    });
  };
})

//should this factory return data.geonames[0] or should receiver know about data structure?
.factory('CapitalData', function(API_AUTH, $http, $q, SEARCH_PATH){
  return function(countryId, capital){
    var defer = $q.defer();
    $http.get(SEARCH_PATH+'&name_equals='+capital+'&country='+countryId+API_AUTH, {cache: true})
    .success(function(data){
      defer.resolve(data.geonames[0]);
    });
    return defer.promise;
  };
});