describe('/ router', function(){
  beforeEach(module('cc-app'));
  
  //will this work?
  
  it('loads the main template', function(){
    inject(function($rootScope, $route, $location, $httpBackend){
      $httpBackend.expectGET('./home/main.html').respond('...');

      $rootScope.$apply(function(){
        $location.path('/')
      });
    
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
    
      expect($route.current.templateUrl).toBe('./home/main.html')
    });
  });
  
  
  it('redirects to / when route is undefined', function(){
    inject(function($rootScope, $route, $location, $httpBackend){
      
      $httpBackend.expectGET('./home/main.html').respond('...');  
      
      $rootScope.$apply(function(){
        $location.path('/some/definately/notused-route');
      });
      
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectation();
      
      expect($route.current.templateUrl).toBe('./home/main.html');
      expect($route.current.originalPath).toBe('/');
    })
  })
})