import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ArtistService} from '../artist.service';
import { Observable }     from 'rxjs/Observable';
import { EventsComponent } from './events.component';
import { madonna } from '../testing/madonna';
import { madonnaEvent } from '../testing/madonnaEvent';

const ArtistServiceStub = {
  getEvents(){
    return Observable.of([madonnaEvent]);
  }
}

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ],
      providers: [{provide: ArtistService, useValue: ArtistServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('getEvents', () => {
    it('should set this.events to an array of events', ()=>{
      expect(component.events.length).toBe(0);
      component.artist = madonna;
      component.getEvents();
      expect(component.events.length).toBe(1);
      expect(component.events[0]).toBe(madonnaEvent);
    });
  });
});
