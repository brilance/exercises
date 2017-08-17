import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArtistService } from './artist.service';
import { ArtistEvent } from './models/Event';
import { Bio } from './models/Bio';
import { madonna } from './testing/madonna';
import { buffalo } from './testing/buffalo';
import { madonnaAlbum } from './testing/madonnaAlbum';
import { madonnaEventRaw } from './testing/madonnaEventRaw';
import { madonnaEvent } from './testing/madonnaEvent';
import { madonnaBio } from './testing/madonnaBio';

const resultsForMadonna = [madonnaAlbum];
const relatedArtists = [buffalo];
const events = [madonnaEventRaw];
const madonnaEventResults = [madonnaEvent];

describe('ArtistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ArtistService]
    });
  });

  it('should be created', inject([ArtistService], (service: ArtistService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAlbums', () =>{
    it('should call http backend and return albums for the artist', inject([ArtistService, HttpClient, HttpTestingController], (service: ArtistService, http: HttpClient, httpMock:HttpTestingController) => {
      service.getAlbums(madonna).subscribe((results)=>{
        expect(results).toBe(resultsForMadonna);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/v1/artist/6tbjWDEIzxoDsBA1FuhfPW/album');
      expect(req.request.method).toEqual('GET');
      req.flush(resultsForMadonna);
      httpMock.verify();
    }));
  });

  describe('getRelatedArtists', () =>{
    it('should call http backend and return related artists', inject([ArtistService, HttpClient, HttpTestingController], (service: ArtistService, http: HttpClient, httpMock:HttpTestingController) => {
      service.getRelatedArtists(madonna).subscribe((results)=>{
        expect(results).toBe(relatedArtists);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/v1/artist/6tbjWDEIzxoDsBA1FuhfPW/related');
      expect(req.request.method).toEqual('GET');
      req.flush(relatedArtists);
      httpMock.verify();
    }));
  });

  describe('getEvents', () =>{
    it('should call http backend and return events', inject([ArtistService, HttpClient, HttpTestingController], (service: ArtistService, http: HttpClient, httpMock:HttpTestingController) => {
      service.getEvents(madonna).subscribe((results)=>{
        const event = results[0] as ArtistEvent;
        expect(event.id).toEqual(madonnaEvent.id);
        expect(event.name).toEqual(madonnaEvent.name);
        expect(event.date).toEqual(madonnaEvent.date);
        expect(event.venue).toEqual(madonnaEvent.venue);
        expect(event.city).toEqual(madonnaEvent.city);
        expect(event.state).toEqual(madonnaEvent.state);
        expect(event.country).toEqual(madonnaEvent.country);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/v1/artist/6tbjWDEIzxoDsBA1FuhfPW/event');
      expect(req.request.method).toEqual('GET');
      req.flush(madonnaEventRaw);
      httpMock.verify();
    }));
  });

  describe('getBio', () =>{
    it('should call http backend and return artist bio', inject([ArtistService, HttpClient, HttpTestingController], (service: ArtistService, http: HttpClient, httpMock:HttpTestingController) => {
      service.getBio(madonna).subscribe((results)=>{
        expect(results.summary).toBe(madonnaBio.summary);
        expect(results.content).toBe(madonnaBio.content);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/v1/artist/6tbjWDEIzxoDsBA1FuhfPW/bio');
      expect(req.request.method).toEqual('GET');
      req.flush(madonnaBio);
      httpMock.verify();
    }));
  });
});
