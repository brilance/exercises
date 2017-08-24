import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SeptaService } from '../septa.service';
import { AlertsComponent } from './alerts.component';
import { Observable }     from 'rxjs/Observable';
import { bus1Alert } from '../testing/bus1Alert';

const SeptaServiceStub = {
  getAlerts(){
    return Observable.of([bus1Alert]);
  }
}

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsComponent ],
      providers: [{provide: SeptaService, useValue: SeptaServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('getAlerts', ()=>{
    it('should set this.alerts to an array of alerts', ()=>{
      expect(component.alerts.length).toBe(0);
      component.route = 101;
      component.getAlerts();
      expect(component.alerts.length).toBe(1);
    });
  });
});
