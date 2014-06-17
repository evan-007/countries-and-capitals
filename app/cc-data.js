angular.module('cc-data', [])

.constant('COUNTRIES_PATH', 'http://api.geonames.org/countryInfoJSON?formatted=true&style=full')
.constant('API_AUTH', '&username=evan007')
.constant('NEIGHBORS_PATH', 'http://api.geonames.org/neighboursJSON?country=')

.factory('Countries', function($http, COUNTRIES_PATH, API_AUTH, $q){
  return function(){
    var defer = $q.defer();
    $http.get(COUNTRIES_PATH+API_AUTH, {cache: true})
    .success(function(data){
      console.log(data)
      defer.resolve(data);
    });
    return defer.promise;
  };
})

.factory('Neighbors', function($http, API_AUTH, $q, NEIGHBORS_PATH){
  return function(countryId){
    var defer = $q.defer();
    $http.get(NEIGHBORS_PATH+countryId+API_AUTH, {cache: true})
    .success(function(data){
      console.log(data);
      defer.resolve(data.geonames);
    });
    return defer.promise;
  };
});