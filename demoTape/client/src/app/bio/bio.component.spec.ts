import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ArtistService} from '../artist.service';
import { BioComponent } from './bio.component';
import { madonnaBio } from '../testing/madonnaBio';
import { madonna } from '../testing/madonna';
import { Observable }     from 'rxjs/Observable';

const ArtistServiceStub = {
  getBio(){
    return Observable.of(madonnaBio);
  }
}
describe('BioComponent', () => {
  let component: BioComponent;
  let fixture: ComponentFixture<BioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BioComponent ],
      providers: [{provide: ArtistService, useValue: ArtistServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('getBio', ()=>{
    it('should set this.bio to a Bio', ()=>{
      expect(component.bio).toBeNull();
      component.artist = madonna;
      component.getBio();
      expect(component.bio.content).toBe(madonnaBio.content);
      expect(component.bio.summary).toBe(madonnaBio.summary);
    });
  });
});
