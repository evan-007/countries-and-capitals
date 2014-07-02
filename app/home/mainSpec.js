describe('/ router', function(){
  beforeEach(module('cc-app'));
  
  //will this work?
  beforeEach(function($httpBackend){
    $httpBackend.expectGet(/home\/main\.html/).respond('...');
  })
  
  it('loads the main template', function){
    inject(function($rootScope, $route, $location, $httpBackend){
      $rootScope.$apply(function(){
        $location.path('/')
      });
    
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectations();
    
      expect($route.current.templateUrl).toBe('something')
    });
  });
  
  
  it('redirects to / when route is undefined', function(){
    inject(function($rootScope, $route, $location, $httpBackend){
      
      $rootScope.$apply(function(){
        $location.path('/some/definately/notused-route');
      });
      
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectations();
      
      expect($route.current.templateUrl).toBe('something');
      console.log($route.current);
      //expect($route.current.url).toBe('/');
    })
  })
})