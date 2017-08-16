import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';
import { Album } from './models/Album';
import { Artist } from './models/Artist';
import { ArtistEvent } from './models/Event';
import { Bio } from './models/Bio';

@Injectable()
export class ArtistService {
  private urlBase = "http://localhost:3000";
  
  constructor(private http: HttpClient) { }

  getAlbums(artist:Artist):Observable<Album[]>{
    return this.http.get(this.urlBase+`/api/v1/artist/${artist.id}/album`)
    .map(response => {
      return response as Album[];
    });
  }

  getRelatedArtists(artist:Artist):Observable<Artist[]>{
    return this.http.get(this.urlBase+`/api/v1/artist/${artist.id}/related`)
    .map(response => {
      return response as Artist[];
    });
  }

  getEvents(artist:Artist):Observable<ArtistEvent[]>{
    return this.http.get(this.urlBase+`/api/v1/artist/${artist.id}/event`)
    .map(response => {
      let events = [];
      for (let item of response as Array<object>){
        const event = new ArtistEvent();
        event.name = item["name"];
        event.id = item["id"];
        event.url = item["url"];
        event.date = item["dates"]["start"]["localDate"];
        event.venue = item["_embedded"]["venues"][0]["name"];
        event.city = item["_embedded"]["venues"][0]["city"]["name"];
        if (item["_embedded"]["venues"][0]["state"]){
          event.state = item["_embedded"]["venues"][0]["state"]["stateCode"];
        }
        event.country = item["_embedded"]["venues"][0]["country"]["countryCode"];
        events.push(event);
      }
      return events;
    });
  }

  getBio(artist:Artist):Observable<Bio>{
    return this.http.get(this.urlBase+`/api/v1/artist/${artist.id}/bio`)
    .map(response => {
      const bio = new Bio();
      bio.content = response["content"].replace(/\<a.*\/a\>/g, '');
      bio.summary = response["summary"].replace(/\<a.*\/a\>/g, '');
      return bio;
    });
  }
}
