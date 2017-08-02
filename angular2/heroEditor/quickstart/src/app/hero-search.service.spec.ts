import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, Http, Response, ResponseOptions, RequestMethod }       from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { HeroSearchService } from './hero-search.service';

const heroes = {
    data : [
        { id: 15, name: 'Magneta' },
        { id: 16, name: 'RubberMan' },
        { id: 17, name: 'Dynama' },
        { id: 19, name: 'Magma' }
    ]
};

beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HeroSearchService, { provide: XHRBackend, useClass: MockBackend }]
    });
});

describe('HeroSearchService', () => {
    describe('search', () => {
        it('should search and return results', 
        inject([HeroSearchService, XHRBackend], (HeroSearchService:HeroSearchService, mockBackend:MockBackend) => {
            
            mockBackend.connections.subscribe((connection:MockConnection) => {
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.url).toEqual('api/heroes/?name=ma');
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(heroes)
                })));
            });
            
            HeroSearchService.search('ma').subscribe((results)=>{
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