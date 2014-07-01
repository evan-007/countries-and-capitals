describe('cc-app', function(){
	beforeEach(module('cc-app'));
  
	it('should load the correct controller and template', function(){
		inject(function($route){
			expect($route.routes['/countries/:id/:city'].controller).toBe('cityCtrl');
			expect($route.routes['/countries/:id/:city'].templateUrl).toBe('./country/city.html');
		});
	});
});