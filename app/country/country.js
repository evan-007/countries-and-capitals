angular.module('cc-app')
.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/countries/:id', {
      templateUrl: './country/country.html',
      controller: 'countryCtrl',
      resolve: {
        ActiveCountry: ['CountryData', '$route', function(CountryData, $route) {
          return CountryData($route.current.params.id);
        }]
      }
    })
  }]).controller('countryCtrl', [
  'ActiveCountry',
  '$routeParams',
  '$scope',
  function (ActiveCountry, $routeParams, $scope) {
    $scope.country = ActiveCountry;
  }])