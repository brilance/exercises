import { Component, OnInit, Input } from '@angular/core';
import { Artist } from '../models/artist';

@Component({
  selector: 'app-webplayer',
  templateUrl: './webplayer.component.html',
  styleUrls: ['./webplayer.component.css']
})
export class WebplayerComponent{
  @Input() iframeURI:string;
}
