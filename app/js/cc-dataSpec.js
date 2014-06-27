describe('cc-dataSpec', function(){
	beforeEach(module('cc-data'));

	it('should return an array of countries', function(done){
		inject(function(Countries, $rootScope, $httpBackend){
			var responseData = {geonames: [{name: 'france'}, {name: 'spain'}]}
			$httpBackend.expectGET(/http:\/\/api.geonames.org\/countryInfoJSON/)
				.respond( responseData)
			Countries().then(function(data){
				expect(data).toEqual(responseData.geonames);
				done();
			});
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
		});
	});

	it('should have constants', function(){
		inject(function(COUNTRIES_PATH, API_AUTH, NEIGHBORS_PATH, SEARCH_PATH){
			//if any of the constants change, so do these tests
			expect(COUNTRIES_PATH).toMatch(/http:\/\/api.geonames.org\/countryInfoJSON/);
			expect(API_AUTH).toMatch(/evan/);
			expect(NEIGHBORS_PATH).toMatch(/http:\/\/api.geonames.org\/neighboursJSON/);
			expect(SEARCH_PATH).toMatch(/http:\/\/api.geonames.org\/searchJSON/)
		});
	});

	describe('CapitalData factory', function(){
		it('should return data about the capital', function(done){
			inject(function(CapitalData, $rootScope, $httpBackend){
				var responseData = {geonames:[{name: 'blah', countryCode: 'asdf'},
				{name: 'blahblah', countryCode: '1324'}]}
				$httpBackend.expectGET(/http:\/\/api.geonames.org\/searchJSON/)
				.respond(responseData);
				CapitalData('asdf').then(function(data){
					expect(data).toEqual(responseData.geonames[0]);
					done();
				});
			$httpBackend.flush();
			$httpBackend.verifyNoOutstandingRequest();
			});
		});
	});
});