describe('Countries', function(){
	beforeEach(module('cc-data'));

	it('should return an array of countries', inject(function(Countries, $rootScope, $httpBackend){
		$httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?formatted=true&style=full&username=evan007')
		.respond({data: 
			{geonames: 
				[
				{name: 'france'}, 
				{name: 'spain'}
				]
			}
		});
		var data = Countries();
		console.log(Countries());
		$httpBackend.flush;
		expect(data).toContain('france');
		$httpBackend.verifyNoOutstandingRequest();
	}));
});