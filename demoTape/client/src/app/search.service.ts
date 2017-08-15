import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable }     from 'rxjs/Observable';
import {Artist} from './models/Artist';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  private urlBase = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  search(term: string):Observable<Artist[]>{
    return this.http.get(this.urlBase+'/api/v1/artist?searchTerm='+term)
          .map(response => {
            return response as Artist[];
          });
  }

}
