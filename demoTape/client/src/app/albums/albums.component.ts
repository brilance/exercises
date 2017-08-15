import { Component, OnInit, Input } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  private _artist:Artist;
  albums:Array<Album>;

  constructor(private artistService:ArtistService) { }

  ngOnInit() {
    this.albums = [];
  }

  @Input() set artist(artist: Artist) {
       this._artist = artist;
       if (artist){
        this.getAlbums();
       }
    }
    
  get artist(): Artist {
      return this._artist;
  }

  getAlbums():void{
    this.artistService.getAlbums(this.artist).subscribe(results => {
      this.albums = results;
    });
  }

}
