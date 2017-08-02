"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var hero_service_1 = require("./hero.service");
var hero_1 = require("./hero");
var heroes = {
    data: [
        { id: 0, name: 'Zero' },
        { id: 11, name: 'Mr. Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' },
        { id: 14, name: 'Celeritas' },
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 18, name: 'Dr IQ' },
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ]
};
var singleHero = {
    data: { id: 0, name: 'Zero' }
};
var newHero = {
    data: { id: 21, name: 'Orb the Horse' }
};
describe('HeroService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [hero_service_1.HeroService, { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }]
        });
    });
    describe('getHeroes', function () {
        it('should call http get and return a list of results', testing_1.fakeAsync(testing_1.inject([hero_service_1.HeroService, http_1.XHRBackend], function (HeroService, mockBackend) {
            mockBackend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(http_1.RequestMethod.Get);
                expect(connection.request.url).toEqual('api/heroes');
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify(heroes)
                })));
            });
            HeroService.getHeroes().then(function (results) {
                expect(results.length).toEqual(11);
                expect(results[0].id).toEqual(0);
                expect(results[0].name).toEqual("Zero");
                expect(results[10].id).toEqual(20);
                expect(results[10].name).toEqual("Tornado");
            });
        })));
    });
    describe('getHero', function () {
        it('should call http get and return a single result', testing_1.fakeAsync(testing_1.inject([hero_service_1.HeroService, http_1.XHRBackend], function (HeroService, mockBackend) {
            mockBackend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(http_1.RequestMethod.Get);
                expect(connection.request.url).toEqual('api/heroes/0');
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify(singleHero)
                })));
            });
            HeroService.getHero(0).then(function (result) {
                expect(result.id).toEqual(0);
                expect(result.name).toEqual("Zero");
            });
        })));
    });
    describe('update', function () {
        it('should call http put and return a single result', testing_1.fakeAsync(testing_1.inject([hero_service_1.HeroService, http_1.XHRBackend], function (HeroService, mockBackend) {
            mockBackend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(http_1.RequestMethod.Put);
                expect(connection.request.url).toEqual('api/heroes/0');
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: ''
                })));
            });
            var hero = new hero_1.Hero();
            hero.id = 0;
            hero.name = 'Zamboni';
            HeroService.update(hero).then(function (result) {
                expect(result.id).toEqual(0);
                expect(result.name).toEqual("Zamboni");
            });
        })));
    });
    describe('create', function () {
        it('should call http post and return a single result', testing_1.fakeAsync(testing_1.inject([hero_service_1.HeroService, http_1.XHRBackend], function (HeroService, mockBackend) {
            mockBackend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(http_1.RequestMethod.Post);
                expect(connection.request.url).toEqual('api/heroes');
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: JSON.stringify(newHero)
                })));
            });
            HeroService.create("Orb the Horse").then(function (result) {
                expect(result.id).toEqual(21);
                expect(result.name).toEqual("Orb the Horse");
            });
        })));
    });
    describe('create', function () {
        it('should call http delete and return null', testing_1.fakeAsync(testing_1.inject([hero_service_1.HeroService, http_1.XHRBackend], function (HeroService, mockBackend) {
            mockBackend.connections.subscribe(function (connection) {
                expect(connection.request.method).toEqual(http_1.RequestMethod.Delete);
                expect(connection.request.url).toEqual('api/heroes/0');
                connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                    body: ''
                })));
            });
            HeroService.delete(0).then(function (result) {
                expect(result).toBeNull();
            });
        })));
    });
});
//# sourceMappingURL=hero.service.spec.js.map