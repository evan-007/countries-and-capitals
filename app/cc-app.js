angular.module('cc-app', ['cc-data', 'ngRoute'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html',
    controller: 'countriesCtrl'
  })
  .when('/countries/:id', {
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
  
  $scope.goTo = function(country){
    console.log(country);
    $location.path('/countries/'+country);
  };
})

.controller('countryCtrl', function($scope, Neighbors, $routeParams){
  var id = $routeParams.id
  console.log(id);
  Neighbors(id).then(function(data){
    $scope.neighbors = data;
  });
});