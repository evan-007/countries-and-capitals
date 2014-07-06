describe('cc-dataSpec', function(){

	var responseData = {geonames: [{name: 'france'}, {name: 'spain'}]};

	beforeEach(module('cc-data'));

	it('should have constants', function(){
		inject(function(COUNTRIES_PATH, API_AUTH, NEIGHBORS_PATH, SEARCH_PATH){
			//if any of the constants change, so do these tests
			expect(COUNTRIES_PATH).toMatch(/http:\/\/api\.geonames\.org/);
			expect(API_AUTH).toBeDefined();
			expect(NEIGHBORS_PATH).toMatch(/http:\/\/api\.geonames\.org/);
			expect(SEARCH_PATH).toMatch(/http:\/\/api\.geonames\.org/);
		});
	});

  describe('Countries service', function(){
		it('should return an array of countries', function(done){
			inject(function(Countries, $rootScope, $httpBackend){

				//change to when GET
				$httpBackend.expectGET(/http:\/\/api.geonames\.org\/countryInfoJSON/)
					.respond( responseData);

				Countries().then(function(data){
					expect(data).toEqual(responseData.geonames);
					done();
				});
				$httpBackend.flush();
				$httpBackend.verifyNoOutstandingRequest();
			});
		});
  });

	describe('CapitalData factory', function(){
		it('should return data about the capital', function(done){
			inject(function(CapitalData, $rootScope, $httpBackend){

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

	describe('CountryData factory', function(){
		it('should return country data', function(done){
			//identical to CapitalData test, refactor
			//only difference in 3 services is URL it hits?
			inject(function(CountryData, $httpBackend){

				$httpBackend.expectGET(/http:\/\/api.geonames.org\/countryInfoJSON/)
				.respond(responseData);

				CountryData('adsf').then(function(data){
					expect(data).toEqual(responseData.geonames[0]);
					done();
				});

				$httpBackend.flush();
				$httpBackend.verifyNoOutstandingRequest();
			});
		});
	});

	describe('NeighborData', function(){
		it('returns an array of country data', function(done){
			inject(function(NeighborData, $httpBackend){

				$httpBackend.expectGET(/http:\/\/api.geonames.org\/countryInfoJSON/)
				.respond(responseData);

				NeighborData(['cat', 'fish']).then(function(data){
					expect(data).toEqual(responseData.geonames);
					done();
				});
				$httpBackend.flush();
				$httpBackend.verifyNoOutstandingRequest();
			});
		});
	});

	//this factory depends on NeighborData
	// it gets neighbor ids then passes them to NeighborData
	// to get the capital names
  // stub NeighborData to test better?
  // issues in expect block because Neighbors returns another promise that isn't finished.
	describe('Neighbors', function(){
		it('returns an array of NeighborData', function(done){
			inject(function(Neighbors, NeighborData, $httpBackend){

				var responseIds = {geonames: [{countryCode: 'cat'}, {countryCode: 'dog'}]};
				var responseFinal = {geonames: [{name: 'france'}, {name: 'spain'}]};

				$httpBackend.expectGET(/http:\/\/api.geonames.org\/neighboursJSON/)
				.respond(responseIds);

				$httpBackend.expectGET(/http:\/\/api.geonames.org\/countryInfoJSON/)
				.respond(responseData);

				Neighbors('id').then(function(data){
					expect(data).toEqual(responseFinal.geonames);
					done();
				});

				$httpBackend.flush();
				$httpBackend.verifyNoOutstandingRequest();
				$httpBackend.verifyNoOutstandingExpectation();
			});
		});
	})
});
