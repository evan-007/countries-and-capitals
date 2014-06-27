describe('Countries', function(){
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
});