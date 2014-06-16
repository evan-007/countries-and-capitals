angular.module('cc-app', ['cc-data', 'ngRoute'])

.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html',
    controller: 'countriesCtrl'
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