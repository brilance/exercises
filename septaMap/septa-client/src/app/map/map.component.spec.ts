import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeptaService } from '../septa.service';
import { MapComponent } from './map.component';
import { bus1, bus2 } from '../testing/101busses';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const SeptaServiceStub = {
  getVehicles(){
    return Observable.of([bus1, bus2]);
  }
}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers: [{provide: SeptaService, useValue: SeptaServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('getVehicles', ()=>{
    it('should set this.vehicles to an array of vehicles', ()=>{
      expect(component.vehicles.length).toBe(0);
      component.route = 101;
      component.getVehicles();
      expect(component.vehicles.length).toBe(2);
    });
  });

  describe('calcCenter', ()=>{
    it('should return the average of an array of coordinates', ()=>{
      component.route = 101;
      component.getVehicles();
      expect(component.vehicles.length).toBe(2);
      const coords = component.calcCenter();
      expect(coords["lat"]).toEqual(39.9344575);
      expect(coords["long"]).toEqual(-75.269245);
    });
  });
});
