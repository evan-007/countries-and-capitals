angular.module('cc-app', ['cc-data', 'ngRoute'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateURL: 'home.html',
    controller: 'countriesCtrl'
  })
  .when('/country', {
    templateUrl: 'home.html'
  })
  .otherwise( {redirectTo: '/'});
})

.controller('countriesCtrl', function($scope, Countries){
  console.log('loading');
  $scope.loading = true;
  Countries().then(function(data){
    $scope.countries = data.geonames;
    console.log(data.geonames);
    $scope.loading = false;
    console.log('done!');
  });
})