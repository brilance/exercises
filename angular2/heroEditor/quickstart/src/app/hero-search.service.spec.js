"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var hero_search_service_1 = require("./hero-search.service");
var heroes = {
    data: [
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 19, name: 'Magma' }
    ]
};
beforeEach(function () {
    testing_1.TestBed.configureTestingModule({
        imports: [http_1.HttpModule],
        providers: [hero_search_service_1.HeroSearchService, { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }]
    });
});
describe('HeroSearchService', function () {
    describe('search', function () {
        it('should search and return results', testing_1.inject([hero_search_service_1.HeroSearchService, http_1.XHRBackend], function (HeroSearchService, mockBackend) {
            mockBackend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(http_1.RequestMethod.Get);
                expect(connection.request.url).toEqual('api/heroes/?name=ma');
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify(heroes)
                })));
            });
            HeroSearchService.search('ma').subscribe(function (results) {
                expect(results.length).toEqual(4);
                expect(results[0].id).toEqual(15);
                expect(results[1].id).toEqual(16);
                expect(results[2].id).toEqual(17);
                expect(results[3].id).toEqual(19);
                expect(results[0].name).toEqual('Magneta');
                expect(results[1].name).toEqual('RubberMan');
                expect(results[2].name).toEqual('Dynama');
                expect(results[3].name).toEqual('Magma');
            });
        }));
    });
});
//# sourceMappingURL=hero-search.service.spec.js.map