import { Component } from '@angular/core';
import { TodoFactory } from './todos-factory';
import {Todo} from './todo';

@Component({
  selector: 'todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls:['./todo-app.component.css']
})

export class AppComponent{
	todos:Array<Todo>;

	constructor(){
		this.todos = [];
		TodoFactory.getAll().then( (data:Array<Todo>) => {this.todos = data;});
	}

	addTodo($event:any, todoText:any){
		if ($event.which === 13){
			const _todo = {
				text : todoText.value,
				isCompleted : false
			};

			TodoFactory.save(_todo).then( (data:Todo) => {
				this.todos.push(data);
				todoText.value = '';
			});
		}
	}

	updateTodoText($event:any, todo:Todo){
		if ($event.which === 13){
			todo.text = $event.target.value;
			const _todo = {
				_id : todo._id,
				text: todo.text,
				isCompleted : todo.isCompleted
			};
			TodoFactory.update(_todo).then((data:any) => {this.setEditState(todo, false);});
		}
	}

	updateStatus(todo:Todo){
		const _todo = {
			_id : todo._id,
			text: todo.text,
			isCompleted : !todo.isCompleted
		};

		TodoFactory.update(_todo).then( (data:any) => {todo.isCompleted = !todo.isCompleted;});
	}

	deleteTodo(todo:Todo){
		const todos = this.todos;

		TodoFactory.delete(todo._id).then((data:any)=>{
			if (data.n == 1){
				for (let i = 0; i < todos.length; i++){
					if (todos[i]._id == todo._id){
						todos.splice(i, 1);
					}
				}
			}
		});
	}

	setEditState(todo:Todo, state:boolean){
		if (state){
			todo.isEditMode = state;
		}
		else{
			delete todo.isEditMode;
		}
	}
}