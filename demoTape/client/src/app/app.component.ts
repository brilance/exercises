import { Component } from '@angular/core';
import { Artist } from './models/Artist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Demo Tape';
  artist:Artist;
  iframeURI:string;

  setArtist($event:Artist):void{
    this.artist = $event;
    this.iframeURI = `https://open.spotify.com/embed?uri=${this.artist.uri}`;
  }
}
