import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';
import { Vehicle }     from './models/vehicle';
import { Stop }     from './models/stop';
import { Alert }     from './models/alert';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { bus1, bus2 } from './testing/101busses';

@Injectable()
export class SeptaService {
  private test = false;
  constructor(private http: HttpClient) { }

  getVehicles(route:number):Observable<Vehicle[]>{
    if (this.test){
      return Observable.of([bus1, bus2]);
    }
    else{
      return this.http.get(`/api/v1/route/${route}`)
      .map(response => {
        if (response["error"]){
          let vehicles = [];
          return vehicles;
        }
        else{
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
        }
      });
    }
  }

  getClosestStop(route:number, vehicle:Vehicle):Observable<Stop>{
    return this.http.get(`/api/v1/route/${route}/stop?lat=${vehicle.lat}&long=${vehicle.long}`)
      .map(response => {
        return response as Stop;
      });
  }

  getAlerts(route:number):Observable<Alert[]>{
    return this.http.get(`/api/v1/route/${route}/alert`)
    .map(response => {
      return response as Alert[];
    });
  }
}
