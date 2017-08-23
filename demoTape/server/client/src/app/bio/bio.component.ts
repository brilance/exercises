import { Component, OnInit, Input } from '@angular/core';
import { ArtistService } from '../artist.service';
import { Artist } from '../models/artist';
import { Bio } from '../models/bio';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  private _artist:Artist;
  bio:Bio;
  searched:boolean;
  showFull:boolean;

  constructor(private artistService:ArtistService) { }

  ngOnInit() {
    this.bio = null;
    this.searched = false;
    this.showFull = false;
  }

  @Input() set artist(artist: Artist) {
    this.searched = true;
    this._artist = artist;
    this.bio = null;
    if (artist){
      this.getBio();
    }
  }
  
  get artist(): Artist {
      return this._artist;
  }

  getBio():void{
    this.artistService.getBio(this.artist).subscribe(results => {
      this.bio = results;
    });
  }

  showFullBio():void{
    this.showFull = true;
  }

  showSummaryBio():void{
    this.showFull = false;
  }

}
