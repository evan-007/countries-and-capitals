angular.module('cc-app', ['cc-data', 'ngRoute'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html',
    controller: 'countriesCtrl'
  })
  .when('/countries/:id', {
    templateUrl: 'country/country.html'
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
  
  $scope.doit = function(country){
    console.log(country);
    $location.path('/countries/'+country);
  };
})

.controller('countryCtrl', function($scope, Country){
  
});