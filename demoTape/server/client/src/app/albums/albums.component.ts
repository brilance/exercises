import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
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
  searched:boolean;

  @Output()
  albumSelection:EventEmitter<Album> = new EventEmitter();

  constructor(private artistService:ArtistService) { }

  ngOnInit() {
    this.albums = [];
    this.searched = false;
  }

  @Input() set artist(artist: Artist) {
      this.searched = true;
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

  selectAlbum(album:Album):void{
    this.albumSelection.emit(album);
  }

}
