import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';
import { Vehicle }     from './models/vehicle';
import 'rxjs/add/operator/map';

@Injectable()
export class SeptaService {

  constructor(private http: HttpClient) { }

  getVehicles(route:number):Observable<Vehicle[]>{
    return this.http.get(`/api/v1/route/${route}`)
    .map(response => {
      let vehicles = [];
      for (let item of response as Array<object>){
        const bus = new Vehicle();
        bus.blockID = item["BlockID"];
        bus.destination = item["destination"];
        bus.direction = item["Direction"];
        bus.label = item["label"];
        bus.vehicleID = item["VehicleID"];
        bus.lat = parseFloat(item["lat"]);
        bus.long = parseFloat(item["lng"]);
        bus.offset = parseInt(item["Offset"], 10);
        bus.offsetSec = parseInt(item["Offset_sec"], 10);
        vehicles.push(bus);
      }
      return vehicles;
    });
  }
}
