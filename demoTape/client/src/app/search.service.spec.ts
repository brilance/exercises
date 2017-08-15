import { TestBed, inject } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Artist} from './Artist';
import { SearchService } from './search.service';

import { madonna } from './testing/madonna';
import { buffalo } from './testing/buffalo';
const resultsForMadonna = [ madonna, buffalo ];

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [SearchService]
    });
  });

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should call API with search term', inject([SearchService, HttpClient, HttpTestingController], (service: SearchService, http: HttpClient, httpMock:HttpTestingController) => {
    service.search("madonna").subscribe((results)=>{
      expect(results).toBe(resultsForMadonna);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/v1/artist?searchTerm=madonna');
    expect(req.request.method).toEqual('GET');
    req.flush(resultsForMadonna);
    httpMock.verify();
  }));
});
