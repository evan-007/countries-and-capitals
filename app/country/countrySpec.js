describe('country.js', function(){
	beforeEach(module('cc-app'));

	it('should load the correct template and controller', function(){
		inject(function($route){
			expect($route.routes['/countries/:id'].controller).toBe('countryCtrl');
			expect($route.routes['/countries/:id'].templateUrl).toBe('./country/country.html');
		});
	});
});