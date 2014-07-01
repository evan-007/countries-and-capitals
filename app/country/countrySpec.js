describe('country.js', function(){
	beforeEach(module('cc-app'));
  
  beforeEach(function(){
    
    var countryData = {
      stuff: 'some data'
    }
    
    spyOn(countryData, stuff);
    
    module(function($provide){
      $provide.factory('Countries', function(){
        return countryData.stuff;
      });
    });
  });
  
	it('should load the correct template and controller', function(){
		inject(function($httpBackend, $location, $rootScope, $route){

      var id = 'FR';
      $httpBackend.expectGET('/country.html').respond('...');
      
      $rootScope.$apply(function(){
        $location.path('/countries/' + id);
      });
      
      $httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
      
			expect($route.current.controller).toBe('countryCtrl');
			expect($route.current.templateUrl).toBe('./country/country.html');
      expect(countryData.stuff).toHaveBeenCalled();
		});
	});
});