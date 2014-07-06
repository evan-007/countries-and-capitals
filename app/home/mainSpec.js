describe('/ router', function(){
  beforeEach(module('cc-app'));

  var templateRegex = /\/home\/main\.html/;

  it('loads the main template', function(){
    inject(function($rootScope, $route, $location, $httpBackend){
      $httpBackend.expectGET(templateRegex).respond('...');

      $rootScope.$apply(function(){
        $location.path('/')
      });

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();

      expect($route.current.templateUrl).toMatch(templateRegex);
    });
  });


  it('redirects to / when route is undefined', function(){
    inject(function($rootScope, $route, $location, $httpBackend){

      $httpBackend.expectGET(templateRegex).respond('...');

      $rootScope.$apply(function(){
        $location.path('/some/definately/notused-route');
      });

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();

      expect($route.current.templateUrl).toMatch(templateRegex);
      expect($route.current.originalPath).toBe('/');
    })
  })
})
