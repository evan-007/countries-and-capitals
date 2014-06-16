angular.module('cc-data', [])

.constant('COUNTRIES_PATH', 'http://api.geonames.org/countryInfoJSON?formatted=true&style=full')
.constant('API_AUTH', '&username=evan007')
.constant('NEIGHBORS_PATH', 'http://api.geonames.org/neighbours?geonameId=2658434')

.factory('Countries', function($http, COUNTRIES_PATH, API_AUTH, $q){
  return function(){
    var defer = $q.defer();
    $http.get(COUNTRIES_PATH+API_AUTH)
    .success(function(data){
      console.log(data)
      defer.resolve(data);
    });
    return defer.promise;
  };
});