import { Component, OnInit, Input } from '@angular/core';
import { SeptaService } from '../septa.service';
import { Vehicle } from '../models/vehicle';
import { Stop } from '../models/stop';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import * as math from 'mathjs';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private _route:number;
  vehicles:Array<Vehicle>;
  private map:any;
  private markers:Array<any>;
  public testing:boolean = false;
  routeMessage:string = "";
  pauseUpdates:boolean = false;

  constructor(private septaService:SeptaService) { }

  ngOnInit() {
    this.vehicles = [];
    this.markers = [];

    //create google map instance, if not running tests
    if (!this.testing){
      this.map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 1,
        center: new google.maps.LatLng(0, 0)
      });
      this.map.addListener('dragstart', ()=>{
        this.pauseUpdates = true;
      });
    }
    else{
      this.map = null;
    }

    //create polling for updating map
    if (!this.testing){
      IntervalObservable.create(30000)
      .subscribe(() => {
        if (this._route && !this.pauseUpdates){
          this.getVehicles();
        }
      });
    }
  }

  @Input() set route(route: number) {
    if (route){
      this._route = route;
      this.getVehicles();
    }
  }

  get route(): number {
    return this._route;
  }

  getVehicles():void{
    this.septaService.getVehicles(this._route).subscribe(results => {
      this.vehicles = results;
      if (this.vehicles.length == 0){
        this.routeMessage = "Route not found.";
      }
      else{
        this.routeMessage = "";
      }
      if (!this.testing){
        this.updateMap();
      }
    });
  }

  updateMap():void{
    this.clearMarkers();
    let zoom = 13;
    const center = this.calcCenter();
    this.map.setCenter(new google.maps.LatLng(center["lat"], center["long"]));
    this.map.setZoom(zoom);
    let bounds = this.map.getBounds();
    
    for (const vehicle of this.vehicles){
      const marker = new google.maps.Marker({
        position: {lat:vehicle.lat, lng:vehicle.long},
        map: this.map
      });
      this.markers.push(marker);
      while (!bounds.contains(marker.position)){
        zoom--;
        this.map.setZoom(zoom);
        bounds = this.map.getBounds();
      }
      this.getClosestStop(marker, vehicle);
    }
  }

  getClosestStop(marker:any, vehicle:Vehicle):void{
    this.septaService.getClosestStop(this._route, vehicle).subscribe((results =>{
      const stop:Stop = results;
      const infoWindowContent = `
        <div class='infoWindow'>
          <p><strong>Destination:</strong>
            ${vehicle.destination}
          </p>
          <p><strong>Closest stop:</strong>
          ${stop.stopname}</p>
        </div>`;
        const infowindow = new google.maps.InfoWindow({
          content: infoWindowContent
        });
        marker.addListener('click', function() {
          infowindow.open(this.map, marker);
        });
    }));
  }

  clearMarkers():void{
    for (const marker of this.markers){
      marker.setMap(null);
    }
    this.markers = [];
  }

  calcCenter():object{
    let lat = math.bignumber(0);
    let long = math.bignumber(0);
    let count = 0;
    for (const vehicle of this.vehicles){
      count++;
      lat = math.add(lat, math.bignumber(vehicle.lat));
      long = math.add(long, math.bignumber(vehicle.long));
    }

    if (count){
      return {lat:math.divide(lat,count), long:math.divide(long,count)};
    }
    else{
      return {lat:0, long:0};
    }
  }

  resumeUpdates():void{
    this.pauseUpdates = false;
  }
}
