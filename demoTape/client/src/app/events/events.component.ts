import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ArtistService } from '../artist.service';
import { Artist } from '../models/artist';
import { ArtistEvent } from '../models/event';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  private _artist:Artist;
  events:Array<ArtistEvent>;

  constructor(private artistService:ArtistService) { }

  ngOnInit() {
    this.events = [];
  }

  @Input() set artist(artist: Artist) {
    this._artist = artist;
    if (artist){
      this.getEvents();
    }
 }
 
  get artist(): Artist {
    return this._artist;
  }

  getEvents():void{
    this.artistService.getEvents(this.artist).subscribe(results => {
      this.events = results;
    });
  }

}
