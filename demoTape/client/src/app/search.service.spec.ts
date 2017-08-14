import { TestBed, inject } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {Artist} from './Artist';
import { SearchService } from './search.service';

const madonna = new Artist();
madonna.id='6tbjWDEIzxoDsBA1FuhfPW';
madonna.name='Madonna';
madonna.external_urls = { spotify: 'https://open.spotify.com/artist/6tbjWDEIzxoDsBA1FuhfPW' };
madonna.followers = { href: null, total: 1541480 };
madonna.genres = [ 'dance pop', 'europop', 'new wave pop', 'pop', 'pop rock' ];
madonna.href = 'https://api.spotify.com/v1/artists/6tbjWDEIzxoDsBA1FuhfPW';
madonna.images = [null, null, null];
madonna.popularity = 78;
madonna.type = 'artist';
madonna.uri = 'spotify:artist:6tbjWDEIzxoDsBA1FuhfPW';

const buffalo = new Artist();
buffalo.id = '77d8Yuuv6nGCJSnZHcOpVe';
buffalo.name = 'Buffalo Madonna';
buffalo.external_urls = { spotify: 'https://open.spotify.com/artist/77d8Yuuv6nGCJSnZHcOpVe' };
buffalo.followers = { href: null, total: 193 };
buffalo.genres = [];
buffalo.images = [];
buffalo.href = 'https://api.spotify.com/v1/artists/77d8Yuuv6nGCJSnZHcOpVe';
buffalo.popularity = 45;
buffalo.type = 'artist';
buffalo.uri = 'spotify:artist:77d8Yuuv6nGCJSnZHcOpVe';

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
