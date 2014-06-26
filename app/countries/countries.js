angular.module('cc-app')
.config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/countries', {
      templateUrl: './countries/countries.html',
      controller: 'countriesCtrl',
      resolve: {
        CountriesData: ['Countries', function (Countries) {
          return Countries();
        }]
      }
    })
  }]).controller('countriesCtrl', [
  'CountriesData',
  '$location',
  '$scope',
  function (CountriesData, $location, $scope) {
    $scope.countries = CountriesData;
    $scope.goTo = function (country, capital) {
      if (capital === undefined) {
        $location.path('/countries' + country);
      } else {
        $location.path('/countries/' + country + '/' + capital);
      }
    };
  }
])