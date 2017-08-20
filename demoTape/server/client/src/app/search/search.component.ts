import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable }     from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { Artist } from '../models/artist';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: []
})

export class SearchComponent implements OnInit {
  artists:Observable<Artist[]>;
  private searchTerms = new Subject<string>();
  private selectedArtist = -1;
  private selectedItem;

  @Output()
  selection:EventEmitter<Artist> = new EventEmitter();

  constructor(private searchService:SearchService) { }

  ngOnInit() {
    this.artists = this.searchTerms.asObservable()
    .debounceTime(800)        // wait 300ms after each keystroke before considering the term
    .distinctUntilChanged()   // ignore if next search term is same as previous
    .switchMap( term => {
      this.selectedArtist = -1;
      this.selectedItem = null;
      return term   // switch to new observable each time the term changes
      // return the http search observable
      ? this.searchService.search(term)
      // or the observable of empty artists if there was no search term
      : Observable.of<Artist[]>([]); }
    )
    .catch( error => {
      // TODO: add real error handling
      console.log(error);
      return Observable.of<Artist[]>([]);
    });
  }

  search($event:KeyboardEvent, value:string):void{   
    if ($event && $event.keyCode == 13 && this.selectedItem){
      this.selectedItem.click();
    }
    else if ($event && ($event.keyCode == 38 || $event.keyCode == 40)){
      if ($event.keyCode == 40){
        this.selectedArtist++;
      }
      else if ($event.keyCode == 38 && this.selectedArtist > 0){
        this.selectedArtist--;
      }

      const item = document.getElementById(`artistSuggest${this.selectedArtist}`);
      if (this.selectedItem){
        this.selectedItem.classList.remove('selected');
      }
      if (item){
        this.selectedItem = item;
        this.selectedItem.classList.add('selected');
      }
    }
    else{
      this.searchTerms.next(value);
    }
  }

  selectArtist(artist:Artist):void{
    this.search(null, "");
    this.selection.emit(artist);
  }

  clearSearch():void{
    const searchBox:HTMLInputElement = document.getElementById("search-box") as HTMLInputElement;
    if (searchBox){
      searchBox.value = '';
    }
  }
}
