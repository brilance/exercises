import {Todo} from './todo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable()
export class TodoFactory{
	private urlBase = "http://localhost:3000";

	constructor(private http: HttpClient) {}

	getAll(){
		return this.http.get(this.urlBase+'/api/v1/todos');
	}

	getAllForDate(dateStr:string){
		//dateStr format: m-d-yyyy
		return this.http.get(this.urlBase+'/api/v1/todos?date='+dateStr);
	}

	get(id:string){
		return this.http.get(this.urlBase+'/api/v1/todo/'+id);
	}

	save(todo:Todo){
		return this.http.post(this.urlBase+'/api/v1/todo', todo);
	}

	update(todo:Todo){
		return this.http.put(this.urlBase+'/api/v1/todo/'+todo._id, todo);
	}

	delete(id:string){
		return this.http.delete(this.urlBase+'/api/v1/todo/'+id);
	}
	
};