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

.controller('countriesCtrl', function(Countries, $location, $scope){
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

.controller('countryCtrl', function(CapitalData, Neighbors, NeighborData, $routeParams, $scope ){
  var id = $routeParams.id
  var capital = $routeParams.city
  $scope.city = $routeParams.city;
  $scope.id = $routeParams.id;
  $scope.mapId = $routeParams.id.toLowerCase();
  Neighbors(id).then(function(data){
    NeighborData(data).then(function(neighbors){
      $scope.neighbors = neighbors;
    })
    // $scope.neighbors = data.geonames;
  });
  CapitalData(id, capital).then(function(data){
    $scope.capital = data;
  });
});