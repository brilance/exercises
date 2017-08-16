import { Component } from '@angular/core';
import { Artist } from './models/Artist';
import { Album } from './models/Album';

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
    this.setSearchBoxVal(this.artist.name);
    this.iframeURI = `https://open.spotify.com/embed?uri=${this.artist.uri}`;
  }

  playAlbum($event:Album):void{
    const album = $event;
    this.iframeURI = `https://open.spotify.com/embed?uri=${album.uri}`;
  }

  setSearchBoxVal(name:string):void{
    const searchBox:HTMLInputElement = document.getElementById("search-box") as HTMLInputElement;
    if (searchBox){
      searchBox.value = name;
    }
  }
}
