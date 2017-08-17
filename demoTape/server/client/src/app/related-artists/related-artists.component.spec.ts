import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ArtistService} from '../artist.service';
import { RelatedArtistsComponent } from './related-artists.component';
import { Observable }     from 'rxjs/Observable';
import {SafePipe} from '../safe.pipe';
import { madonna } from '../testing/madonna';
import { buffalo } from '../testing/buffalo';

const ArtistServiceStub = {
  getRelatedArtists(){
    return Observable.of([buffalo]);
  }
}

describe('RelatedArtistsComponent', () => {
  let component: RelatedArtistsComponent;
  let fixture: ComponentFixture<RelatedArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedArtistsComponent,SafePipe ],
      providers: [{provide: ArtistService, useValue: ArtistServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('getRelatedArtists', ()=>{
    it('should set this.relatedArtists to an array of artists', ()=>{
      expect(component.relatedArtists.length).toBe(0);
      component.artist = madonna;
      component.getRelatedArtists();
      expect(component.relatedArtists.length).toBe(1);
      expect(component.relatedArtists[0]).toBe(buffalo);
    });
  });

  describe('selectArtist', ()=>{
    it('should emit an event with the selected artist', ()=>{
      component.artistSelection.subscribe((artist)=>{
        expect(artist).toEqual(madonna);
      });
      component.selectArtist(madonna);
    });
  });
});
