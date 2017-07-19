import { Component } from '@angular/core';
import { TodoFactory } from './todos-factory';
import {Todo} from './todo';

@Component({
  selector: 'todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls:['./todo-app.component.css']
})

export class AppComponent{
	doneTodos:Array<Todo>;
	undoneTodos:Array<Todo>;

	constructor(){
		this.doneTodos = [];
		this.undoneTodos = [];
		TodoFactory.getAll().then( (data:Array<Todo>) => {
			this.doneTodos = data.filter(item => item.isCompleted);
			this.undoneTodos = data.filter(item => !item.isCompleted);
		});
	}

	addTodoKey($event:any, todoText:any){
		if ($event.which === 13){
			this.addTodo(todoText);
		}
	}

	addTodoBtn(todoText:any){
		this.addTodo(todoText);
	}

	addTodo(todoText:any){
		const _todo = {
			text : todoText.value,
			isCompleted : false
		};

		TodoFactory.save(_todo).then( (data:Todo) => {
			this.undoneTodos.push(data);
			todoText.value = '';
		});
	}

	updateTodoTextKey($event:any, edittext:any, todo:Todo){
		if ($event.which === 13){
			this.updateTodoText(edittext, todo);	
		}
	}

	updateTodoTextBtn(edittext:any, todo:Todo){
		this.updateTodoText(edittext, todo);
	}

	updateTodoText(edittext:any, todo:Todo){
		todo.text = edittext.value;
		const _todo = {
			_id : todo._id,
			text: todo.text,
			isCompleted : todo.isCompleted
		};
		TodoFactory.update(_todo).then((data:any) => {this.setEditState(todo, false);});
	}

	updateStatus(todo:Todo, item:any){
		const _todo = {
			_id : todo._id,
			text: todo.text,
			isCompleted : !todo.isCompleted
		};

		if (!todo.isCompleted){
			document.querySelector("#doneItems").appendChild(item);
			this.doneTodos.push(todo);
			this.undoneTodos.splice(this.undoneTodos.findIndex(item => item._id == todo._id), 1);
		}
		else{
			document.querySelector("#todoItems").appendChild(item);
			this.undoneTodos.push(todo);
			this.doneTodos.splice(this.doneTodos.findIndex(item => item._id == todo._id), 1);
		}

		TodoFactory.update(_todo).then( (data:any) => {
			todo.isCompleted = !todo.isCompleted;
		});
	}

	deleteTodo(todo:Todo){
		const todos = [...this.undoneTodos, ...this.doneTodos];

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