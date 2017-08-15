import { Component, OnInit, Input } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Artist } from '../models/artist';

@Component({
  selector: 'app-related-artists',
  templateUrl: './related-artists.component.html',
  styleUrls: ['./related-artists.component.css']
})
export class RelatedArtistsComponent implements OnInit {
  private _artist:Artist;
  relatedArtists:Array<Artist>;

  constructor(private artistService:ArtistService) { }

  ngOnInit() {
    this.relatedArtists = [];
  }

  @Input() set artist(artist: Artist) {
    this._artist = artist;
    if (artist){
      this.getRelatedArtists();
    }
 }
 
  get artist(): Artist {
    return this._artist;
  }

  getRelatedArtists():void{
    this.artistService.getRelatedArtists(this.artist).subscribe(results => {
      this.relatedArtists = results;
    });
  }

}
