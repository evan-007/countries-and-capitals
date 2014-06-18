angular.module('cc-app', ['cc-data', 'ngRoute', 'ngAnimate'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/main.html'
  })
  .when('/countries', {
    templateUrl: 'home/home.html',
    controller: 'countriesCtrl'
  })
  .when('/countries/:id/:city', {
    templateUrl: 'country/country.html',
    controller: 'countryCtrl'
  })
  .otherwise( {redirectTo: '/'});
})

.controller('countriesCtrl', function(Countries, $location, $scope){
  $scope.loading = true;
  Countries().then(function(data){
    $scope.countries = data.geonames;
    $scope.loading = false;
  });
  
  $scope.goTo = function(country, capital){
    console.log(country);
    $location.path('/countries/'+country+'/'+capital);
  };
})

.controller('countryCtrl', function(CapitalData, Neighbors, NeighborData, $routeParams, $scope ){
  var id = $routeParams.id
  var capital = $routeParams.city
  $scope.city = $routeParams.city;
  $scope.id = $routeParams.id;
  $scope.mapId = $routeParams.id.toLowerCase();
  Neighbors(id).then(function(data){
    NeighborData(data).then(function(neighbors){
      $scope.neighbors = neighbors;
      // oh shit all countries are neighbors if no neighbors!
    })
  });
  $scope.loading = true;
  CapitalData(id, capital).then(function(data){
    $scope.capital = data;
    $scope.loading = false;
  });
});