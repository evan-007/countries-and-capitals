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
				console.log(data[0]);
				expect(data[0].name).toBe('france');
			});
			$rootScope.$digest()
			$httpBackend.flush();
			done();
			$httpBackend.verifyNoOutstandingRequest();
		});
	});
});