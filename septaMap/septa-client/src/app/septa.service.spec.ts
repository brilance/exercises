import { TestBed, inject } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SeptaService } from './septa.service';
import { Vehicle }     from './models/vehicle';
import { busInput }   from './testing/101busInput';
import { bus1, bus2 } from './testing/101busses';

const vehicleResult = [bus1, bus2];

describe('SeptaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [SeptaService]
    });
  });

  it('should be created', inject([SeptaService], (service: SeptaService) => {
    expect(service).toBeTruthy();
  }));

  describe('getVehicles', () =>{
    it('should call http backend and return vehicles for the route', inject([SeptaService, HttpClient, HttpTestingController], (service: SeptaService, http: HttpClient, httpMock:HttpTestingController) => {
      service.getVehicles(101).subscribe((results)=>{
        const veh1 = results[0];
        expect(veh1.lat).toEqual(bus1.lat);
        expect(veh1.long).toEqual(bus1.long);
        expect(veh1.label).toEqual(bus1.label);
        expect(veh1.direction).toEqual(bus1.direction);
        expect(veh1.destination).toEqual(bus1.destination);
        expect(veh1.vehicleID).toEqual(bus1.vehicleID);
        expect(veh1.blockID).toEqual(bus1.blockID);
        expect(veh1.offset).toEqual(bus1.offset);
        expect(veh1.offsetSec).toEqual(bus1.offsetSec);
      });

      const req = httpMock.expectOne('/api/v1/route/101');
      expect(req.request.method).toEqual('GET');
      req.flush(busInput);
      httpMock.verify();
    }));
  });
});
