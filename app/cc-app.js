angular.module('cc-app', [
  'cc-data',
  'ngRoute',
  'ngAnimate'
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'home/main.html' }).when('/countries', {
      templateUrl: 'countries/countries.html',
      controller: 'countriesCtrl'
    }).when('/countries/:id', {
      templateUrl: 'country/country.html',
      controller: 'countryCtrl'
    }).when('/countries/:id/:city', {
      templateUrl: 'country/city.html',
      controller: 'cityCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]).controller('countriesCtrl', [
  'Countries',
  '$location',
  '$scope',
  function (Countries, $location, $scope) {
    $scope.loading = true;
    Countries().then(function (data) {
      $scope.countries = data.geonames;
      $scope.loading = false;
    });
    $scope.goTo = function (country, capital) {
      if (capital === undefined) {
        $location.path('/countries' + country);
      } else {
        $location.path('/countries/' + country + '/' + capital);
      }
    };
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
    $scope.loading = true;
    CapitalData(id, capital).then(function (data) {
      $scope.capital = data;
      $scope.loading = false;
    });
    CountryData(id).then(function (data) {
      $scope.country = data;
      console.log(data);
    });
  }
]).controller('countryCtrl', [
  'CountryData',
  '$routeParams',
  '$scope',
  function (CountryData, $routeParams, $scope) {
    var countryId = $routeParams.id;
    $scope.mapId = $routeParams.id.toLowerCase();
    $scope.loading = true;
    CountryData(countryId).then(function (data) {
      $scope.country = data;
      $scope.loading = false;
      console.log(data);
    });
  }
]);