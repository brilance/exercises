import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpModule, XHRBackend, Http, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';

const heroes = {
    data: [
      { id: 0,  name: 'Zero' },
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

const singleHero = {
    data: 
        { id: 0, name:'Zero'}
};

const newHero = {
    data: 
        { id: 21, name:'Orb the Horse'}
}

describe('HeroService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [HttpModule],
        providers: [HeroService, { provide: XHRBackend, useClass: MockBackend }]
        });
    });


    describe('getHeroes', () => {
        it('should call http get and return a list of results', 
        fakeAsync(inject([HeroService, XHRBackend], (HeroService:HeroService, mockBackend:MockBackend) => {
           
            mockBackend.connections.subscribe((connection:MockConnection) => {
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.url).toEqual('api/heroes');
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(heroes)
                })));
            });

            HeroService.getHeroes().then((results)=>{
                expect(results.length).toEqual(11);
                expect(results[0].id).toEqual(0);
                expect(results[0].name).toEqual("Zero");
                expect(results[10].id).toEqual(20);
                expect(results[10].name).toEqual("Tornado");
            });
        })))
    });

    describe('getHero', () => {
        it('should call http get and return a single result', 
        fakeAsync(inject([HeroService, XHRBackend], (HeroService:HeroService, mockBackend:MockBackend) => {
           
            mockBackend.connections.subscribe((connection:MockConnection) => {
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.url).toEqual('api/heroes/0');
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(singleHero)
                })));
            });

            HeroService.getHero(0).then((result)=>{
                expect(result.id).toEqual(0);
                expect(result.name).toEqual("Zero");
            });
        })))
    });

    describe('update', () => {
        it('should call http put and return a single result', 
        fakeAsync(inject([HeroService, XHRBackend], (HeroService:HeroService, mockBackend:MockBackend) => {
           
            mockBackend.connections.subscribe((connection:MockConnection) => {
                expect(connection.request.method).toEqual(RequestMethod.Put);
                expect(connection.request.url).toEqual('api/heroes/0');
                connection.mockRespond(new Response(new ResponseOptions({
                    body: ''
                })));
            });

            const hero = new Hero();
            hero.id = 0;
            hero.name = 'Zamboni';

            HeroService.update(hero).then((result)=>{
                expect(result.id).toEqual(0);
                expect(result.name).toEqual("Zamboni");
            });
        })))
    });

    describe('create', () => {
        it('should call http post and return a single result', 
        fakeAsync(inject([HeroService, XHRBackend], (HeroService:HeroService, mockBackend:MockBackend) => {
           
            mockBackend.connections.subscribe((connection:MockConnection) => {
                expect(connection.request.method).toEqual(RequestMethod.Post);
                expect(connection.request.url).toEqual('api/heroes');
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(newHero)
                })));
            });

            HeroService.create("Orb the Horse").then((result)=>{
                expect(result.id).toEqual(21);
                expect(result.name).toEqual("Orb the Horse");
            });
        })))
    });

    describe('create', () => {
        it('should call http delete and return null', 
        fakeAsync(inject([HeroService, XHRBackend], (HeroService:HeroService, mockBackend:MockBackend) => {
           
            mockBackend.connections.subscribe((connection:MockConnection) => {
                expect(connection.request.method).toEqual(RequestMethod.Delete);
                expect(connection.request.url).toEqual('api/heroes/0');
                connection.mockRespond(new Response(new ResponseOptions({
                    body: ''
                })));
            });

            HeroService.delete(0).then((result)=>{
                expect(result).toBeNull();
            });
        })))
    });
});