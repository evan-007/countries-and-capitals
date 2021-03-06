describe('country.js', function(){
  
  var fakeData = {
    countryDataDouble: function(arg){
      return arg;
    }
  }

	beforeEach(module('cc-app'));
  
  beforeEach(function(){
    
    spyOn(fakeData, 'countryDataDouble');
    
    module(function($provide){
      $provide.factory('CountryData', function(){
        return fakeData.countryDataDouble;
      });
    });
  });
  
	it('should load the correct template and controller', function(){
		inject(function($httpBackend, $location, $rootScope, $route){

      var id = 'FR';
      $httpBackend.expectGET('./country/country.html').respond('...');
      
      $rootScope.$apply(function(){
        $location.path('/countries/' + id);
      });
      
      $httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
      
			expect($route.current.controller).toBe('countryCtrl');
			expect($route.current.templateUrl).toBe('./country/country.html');
      expect(fakeData.countryDataDouble).toHaveBeenCalledWith(id);
		});
	});
});