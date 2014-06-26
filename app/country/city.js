angular.module('cc-app')
.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/countries/:id/:city', {
      templateUrl: './country/city.html',
      controller: 'cityCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]).controller('cityCtrl', [
  'CapitalData',
  'CountryData',
  'Neighbors',
  'NeighborData',
  '$routeParams',
  '$scope',
  function (CapitalData, CountryData, Neighbors, NeighborData, $routeParams, $scope) {
    var id = $routeParams.id;
    var capital = $routeParams.city;
    $scope.city = $routeParams.city;
    $scope.id = $routeParams.id;
    $scope.mapId = $routeParams.id.toLowerCase();
    Neighbors(id).then(function (data) {
      NeighborData(data).then(function (neighbors) {
        $scope.neighbors = neighbors;
      });
    });
    CapitalData(id, capital).then(function (data) {
      $scope.capital = data;
    });
    CountryData(id).then(function (data) {
      $scope.country = data;
    });
  }
])