describe('countries.js', function(){
	beforeEach(module('cc-app'));

	it('should load the correct controller and template', function(){
		inject(function($route){
			expect($route.routes['/countries'].controller).toBe('countriesCtrl');
			expect($route.routes['/countries'].templateUrl).toBe('./countries/countries.html');
		});
	});
});