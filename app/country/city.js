angular.module('cc-app')
.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/countries/:id/:city', {
      templateUrl: './country/city.html',
      controller: 'cityCtrl',
      resolve: {
        activeCountry : ['CountryData', '$route', function(CountryData, $route) {
          return CountryData($route.current.params.id);
        }],
        activeCapital : ['CapitalData', '$route', function(CapitalData, $route) {
          return CapitalData($route.current.params.id, $route.current.params.city);
        }],
        activeNeighbors : ['Neighbors', '$route', function(Neighbors, $route) {
          return Neighbors($route.current.params.id);
        }]
      }
    }).otherwise({ redirectTo: '/' });
  }
]).controller('cityCtrl', [
  'activeCapital',
  'activeCountry',
  'activeNeighbors',
  '$routeParams',
  '$scope',
  function (activeCapital, activeCountry, activeNeighbors, $routeParams, $scope) {
    $scope.neighbors = activeNeighbors;
    $scope.capital = activeCapital;
    $scope.country = activeCountry;
  }
])