import { Component, Input } from '@angular/core';
import { Todo } from './todo';
import { TodoFactory } from './todos-factory';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls:['./todo-list.component.css']
})

export class TodoListComponent{
    @Input()
    doneItems:Array<Todo>;

    @Input()
    undoneItems:Array<Todo>;

    @Input()
    day:number;

    constructor(private todoFactory:TodoFactory){
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
			date: todo.date,
			isCompleted : todo.isCompleted
		};
		this.todoFactory.update(_todo).subscribe((data:any) => {this.setEditState(todo, false);});
    }
    
    setEditState(todo:Todo, state:boolean){
		if (state){
			todo.isEditMode = state;
		}
		else{
			delete todo.isEditMode;
		}
    }

	updateStatus(todo:Todo, item:any){
		const _todo = {
			_id : todo._id,
			text: todo.text,
			date: todo.date,
			isCompleted : !todo.isCompleted
		};

		const [month,date,year] = todo.date.split("-");
		const dateObj = new Date(parseInt(year,10),parseInt(month,10)-1,parseInt(date,10));
		const day = dateObj.getDay();

		if (!todo.isCompleted){
			document.querySelector("#doneItems"+day).appendChild(item);
			this.doneItems.push(todo);
			this.undoneItems.splice(this.undoneItems.findIndex((item:Todo) => item._id == todo._id), 1);
		}
		else{
			document.querySelector("#undoneItems"+day).appendChild(item);
			this.undoneItems.push(todo);
			this.doneItems.splice(this.doneItems.findIndex((item:Todo) => item._id == todo._id), 1);
		}

		this.todoFactory.update(_todo).subscribe( (data:any) => {
			todo.isCompleted = !todo.isCompleted;
		});
    }
    
	deleteTodo(todo:Todo){
		const [month,date,year] = todo.date.split("-");
		const dateObj = new Date(parseInt(year,10),parseInt(month,10)-1,parseInt(date,10));
		const day = dateObj.getDay();

		this.todoFactory.delete(todo._id).subscribe((data:any)=>{
			if (data.n == 1){
				for (let i = 0; i < this.undoneItems.length; i++){
					if (this.undoneItems[i]._id == todo._id){
						this.undoneItems.splice(i, 1);
					}
				}
				for (let i = 0; i < this.doneItems.length; i++){
					if (this.doneItems[i]._id == todo._id){
						this.doneItems.splice(i, 1);
					}
				}
			}
		});
	}
}