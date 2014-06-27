describe('Countries', function(){
	beforeEach(module('cc-data'));

	it('should return an array of countries', function(done){
		inject(function(Countries, $rootScope, $httpBackend){
			$httpBackend.expectGET(/http:\/\/api.geonames.org\/countryInfoJSON/)
				.respond( 
				{geonames: 
					[{name: 'france'}, 
						{name: 'spain'}
					]
				}
			)
			var status = false
			Countries().then(function(data){
				expect(data.length).toBe(2);
			});
			$rootScope.$digest()
			$httpBackend.flush();
			done();
			$httpBackend.verifyNoOutstandingRequest();
		});
	});
});