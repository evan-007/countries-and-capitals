angular.module('cc-app', [
  'cc-data',
  'ngRoute',
  'ngAnimate'
]).run([
  '$rootScope',
  '$location',
  '$timeout',
  function ($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function () {
      $location.path('/error');
    });
    $rootScope.$on('$routeChangeStart', function () {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      $timeout(function () {
        $rootScope.isLoading = false;
      }, 1000);
    });
  }
]).config([
  '$routeProvider',
  function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'home/main.html' }).when('/countries', {
      templateUrl: 'countries/countries.html',
      controller: 'countriesCtrl',
      resolve: {
        CountriesData: ['Countries', '$q', function (Countries, $q) {
          var defer = $q.defer();
          Countries().then(function(data){
            defer.resolve(data);
          });
          return defer.promise;
        }]
      }
    }).when('/countries/:id', {
      templateUrl: 'country/country.html',
      controller: 'countryCtrl',
      resolve: {
        activeCountry: ['CountryData', '$q', '$route', function(CountryData, $q, $route) {
          var defer = $q.defer();
          CountryData($route.current.params.id).then(function(data){
            defer.resolve(data);
            console.log(data);
          });
          return defer.promise;
        }]
      }
    }).when('/countries/:id/:city', {
      templateUrl: 'country/city.html',
      controller: 'cityCtrl'
    }).otherwise({ redirectTo: '/' });
  }
]).controller('countriesCtrl', [
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
  function (activeCountry, $routeParams, $scope) {
    var countryId = $routeParams.id;
    $scope.mapId = $routeParams.id.toLowerCase();
    $scope.country = activeCountry;
  }
]);