angular.module('cc-app')
.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/countries/:id', {
      templateUrl: 'country/country.html',
      controller: 'countryCtrl',
      resolve: {
        ActiveCountry: ['CountryData', '$route', function(CountryData, $route) {
          return CountryData($route.current.params.id);
        }]
      }
    }).when('/countries/:id/:city', {
      templateUrl: 'country/city.html',
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
]).controller('countryCtrl', [
  'CountryData',
  '$routeParams',
  '$scope',
  function (ActiveCountry, $routeParams, $scope) {
    var countryId = $routeParams.id;
    console.log(ActiveCountry);
    $scope.mapId = $routeParams.id.toLowerCase();
    $scope.country = ActiveCountry;
  }
]);