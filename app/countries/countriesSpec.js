describe('countries.js', function(){
  
  var fakeData = {
    countriesDouble: function(){
      return [1,2,3]
    }
  }
  
	beforeEach(module('cc-app'));
  
  beforeEach(function(){
    
    spyOn(fakeData, 'countriesDouble');
    
    module(function($provide){
      $provide.factory('Countries', function(){
        return fakeData.countriesDouble;
      });
    });
  });

	it('should load the correct controller and template', function(){
		inject(function($httpBackend, $location, $route, $rootScope){
      
      $httpBackend.expectGET(/\.countries\/countries.html/).respond('...');
      
      $rootScope.$apply(function(){
        $location.path('/countries');
      });
      
      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingExpectations();
      
      expect($route.current.country).toBe('someCtrl');
      expect($route.current.templateUrl).toBe('someTemplate');
      expect(fakeData.countriesDouble).toHaveBeenCalled();
		});
	});
});