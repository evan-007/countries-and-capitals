angular.module('cc-app', ['cc-data', 'ngRoute'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html',
    controller: 'countriesCtrl'
  })
  .when('/countries/:id/:city', {
    templateUrl: 'country/country.html',
    controller: 'countryCtrl'
  })
  .otherwise( {redirectTo: '/'});
})

.controller('countriesCtrl', function($scope, Countries, $location){
  console.log('loading');
  $scope.loading = true;
  Countries().then(function(data){
    $scope.countries = data.geonames;
    console.log(data.geonames);
    $scope.loading = false;
    console.log('done!');
  });
  
  $scope.goTo = function(country, capital){
    console.log(country);
    $location.path('/countries/'+country+'/'+capital);
  };
})

.controller('countryCtrl', function($scope, Neighbors, $routeParams, CountryData){
  var id = $routeParams.id
  var capital = $routeParams.city
  $scope.city = $routeParams.city;
  $scope.id = $routeParams.id;
  $scope.mapId = $routeParams.id.toLowerCase();
  console.log(id);
  Neighbors(id).then(function(data){
    $scope.neighbors = data;
  });
  CountryData(id, capital).then(function(data){
    console.log(data);
    $scope.capital = data;
  });
});