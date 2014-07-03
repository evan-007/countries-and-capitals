angular.module('cc-app', [
  'cc-data',
  'ngRoute',
  'ngAnimate'
]).run([
  '$rootScope',
  '$location',
  '$timeout',
  function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function () {
      $location.path('/error');
    });
    $rootScope.$on('$routeChangeStart', function () {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      $rootScope.isLoading = false;
    });
  }
])