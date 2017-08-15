import { fakeAsync, tick, async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { SearchService } from "../search.service";
import { Observable }     from 'rxjs/Observable';
import {Artist} from '../Artist';
import { madonna } from '../testing/madonna';
import { buffalo } from '../testing/buffalo';
import 'rxjs/add/observable/of';

const SearchServiceStub = {
  search(term:string):Observable<Artist[]>{
    return Observable.of([madonna, buffalo]);
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchSpy:any;
  beforeEach(async(() => {
    searchSpy = spyOn(SearchServiceStub, 'search').and.callThrough();

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [{provide: SearchService, useValue: SearchServiceStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('search', () =>{
    it('should call SearchService.search and update the artists observable', fakeAsync(() => {
      
      component.artists.subscribe((artists)=>{
        expect(artists.length).toEqual(2);
        expect(artists[0]).toBe(madonna);
        expect(artists[1]).toBe(buffalo);
      });

      searchSpy.calls.reset();
      expect(searchSpy).toHaveBeenCalledTimes(0);
      component.search('madonna');
      tick(300);
      expect(searchSpy).toHaveBeenCalledTimes(2);
    }));
  });
});
