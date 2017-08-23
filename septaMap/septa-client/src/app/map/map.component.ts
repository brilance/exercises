import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SeptaService } from '../septa.service';
import { Vehicle } from '../models/vehicle';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private _route:number;
  vehicles:Array<Vehicle>;

  constructor(private septaService:SeptaService) { }

  ngOnInit() {
    this.vehicles = [];
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
      this.updateMap();
    });
  }

  updateMap():void{
    const center = this.calcCenter();
    const map = new google.maps.Map(document.getElementById('googleMap'), {
      zoom: 12,
      center: new google.maps.LatLng(center["lat"], center["long"])
    });

    for (const vehicle of this.vehicles){
      var marker = new google.maps.Marker({
        position: {lat:vehicle.lat, lng:vehicle.long},
        map: map
      });
    }
  }

  calcCenter():object{
    let lat = 0;
    let long = 0;
    let count = 0;
    for (const vehicle of this.vehicles){
      count++;
      lat += vehicle.lat;
      long += vehicle.long;
    }
    return {lat:lat/count, long:long/count};
  }

}
