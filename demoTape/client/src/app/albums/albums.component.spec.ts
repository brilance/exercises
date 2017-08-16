import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ArtistService} from '../artist.service';
import { Observable }     from 'rxjs/Observable';
import {SafePipe} from '../safe.pipe';
import { AlbumsComponent } from './albums.component';
import { madonnaAlbum } from '../testing/madonnaAlbum';
import { madonna } from '../testing/madonna';

const ArtistServiceStub = {
  getAlbums(){
    return Observable.of([madonnaAlbum]);
  }
}

describe('AlbumsComponent', () => {
  let component: AlbumsComponent;
  let fixture: ComponentFixture<AlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumsComponent,SafePipe ],
      providers: [{provide: ArtistService, useValue: ArtistServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('getAlbums', ()=>{
    it('should set this.albums to an array of albums', ()=>{
      expect(component.albums.length).toBe(0);
      component.artist = madonna;
      component.getAlbums();
      expect(component.albums.length).toBe(1);
      expect(component.albums[0]).toBe(madonnaAlbum);
    });
  });

  describe('selectAlbum', ()=>{
    it('should emit an event with the selected album', ()=>{
      component.albumSelection.subscribe((album)=>{
        expect(album).toEqual(madonnaAlbum);
      });
      component.selectAlbum(madonnaAlbum);
    });
  });
});
