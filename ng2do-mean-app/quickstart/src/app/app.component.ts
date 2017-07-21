import { Component } from '@angular/core';
import { TodoFactory } from './todos-factory';
import {Todo} from './todo';
import {DateInfo} from './date-info';

@Component({
  selector: 'todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls:['./todo-app.component.css']
})

export class AppComponent{
	//doneTodos:Array<Todo>;
	//undoneTodos:Array<Todo>;

	todayDate:string;
	dateInfo:Array<DateInfo>;
	monthLookup:Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	
	constructor(){
		//this.doneTodos = [];
		//this.undoneTodos = [];
		this.dateInfo = [];
		this.getTodayItems();
	}

	getTodayItems(){
		const now = new Date();
		const dayOfWeek = now.getDay();
		const todayDate = now.getDate();
		const theYear = now.getFullYear();
		const theMonth = now.getMonth();
		const daysInMonth = new Date(now.getFullYear(), theMonth+1, 0).getDate();
		const daysInLastMonth = new Date(now.getFullYear(), theMonth, 0).getDate();

		//fill in today's date
		this.todayDate = this.monthLookup[theMonth]+" "+todayDate;
		const dateInfo = new DateInfo();
		dateInfo.linkText = (theMonth+1) + '-' + todayDate + '-' + theYear;
		dateInfo.labelText = this.todayDate;
		dateInfo.doneItems = [];
		dateInfo.undoneItems = [];
		this.dateInfo[dayOfWeek] = dateInfo;

		//fill forward in the week
		let dayIter = dayOfWeek;
		let dateIter = todayDate;
		let monthIter = theMonth;
		let yearIter = theYear;
		while (dayIter <= 6){
			dayIter++;
			dateIter++;
			if (dateIter > daysInMonth){
				dateIter = 1;
				monthIter++;
				if (monthIter > 11){
					monthIter = 0;
					yearIter++;
				}
			}
			const dateInfo = new DateInfo();
			dateInfo.linkText = (monthIter+1) + '-' + dateIter + '-' + yearIter;
			dateInfo.labelText = this.monthLookup[monthIter]+" "+dateIter;
			dateInfo.doneItems = [];
			dateInfo.undoneItems = [];
			this.dateInfo[dayIter] = dateInfo;
		}

		//fill backward in the week
		dayIter = dayOfWeek;
		dateIter = todayDate;
		monthIter = theMonth;
		yearIter = theYear;
		while (dayIter >= 0){
			dayIter--;
			dateIter--;
			if (dateIter < 1){
				dateIter = daysInLastMonth;
				monthIter--;
				if (monthIter < 0){
					monthIter = 11;
					yearIter--;
				}
			}
			const dateInfo = new DateInfo();
			dateInfo.linkText = (monthIter+1) + '-' + dateIter + '-' + yearIter;
			dateInfo.labelText = this.monthLookup[monthIter]+" "+dateIter;
			dateInfo.doneItems = [];
			dateInfo.undoneItems = [];
			this.dateInfo[dayIter] = dateInfo;
		}

		this.fetchTodos();
	}

	fetchTodos(){
		for (let di of this.dateInfo){
			let dateString = di.linkText;
			TodoFactory.getAllForDate(dateString).then( (data:Array<Todo>) => {
				di.doneItems = data.filter(item => item.isCompleted);
				di.undoneItems = data.filter(item => !item.isCompleted);
			});
		}
	}

	addTodoKey($event:any, todoText:any, picker:any){
		if ($event.which === 13){
			this.addTodo(todoText, picker);
		}
	}

	addTodoBtn(todoText:any, picker:any){
		this.addTodo(todoText, picker);
	}

	addTodo(todoText:any, picker:any){
		let dateString:string = '';
		let labelString:string = '';

		const _todo:Todo = {
			text : todoText.value,
			isCompleted : false,
			date : null
		};

		if (picker.value != ''){
			const [month,day,year] = picker.value.split("/");
			const dateObj = new Date(year, month-1, day);
			_todo.date = month+"-"+day+"-"+year;

			TodoFactory.save(_todo).then( (data:Todo) => {
				this.dateInfo[dateObj.getDay()].undoneItems.push(data);
				todoText.value = '';
			});
		}
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
		TodoFactory.update(_todo).then((data:any) => {this.setEditState(todo, false);});
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
			this.dateInfo[day].doneItems.push(todo);
			this.dateInfo[day].undoneItems.splice(this.dateInfo[day].undoneItems.findIndex((item:Todo) => item._id == todo._id), 1);
		}
		else{
			document.querySelector("#undoneItems"+day).appendChild(item);
			this.dateInfo[day].undoneItems.push(todo);
			this.dateInfo[day].doneItems.splice(this.dateInfo[day].doneItems.findIndex((item:Todo) => item._id == todo._id), 1);
		}

		TodoFactory.update(_todo).then( (data:any) => {
			todo.isCompleted = !todo.isCompleted;
		});
	}

	deleteTodo(todo:Todo){
		const [month,date,year] = todo.date.split("-");
		const dateObj = new Date(parseInt(year,10),parseInt(month,10)-1,parseInt(date,10));
		const day = dateObj.getDay();

		TodoFactory.delete(todo._id).then((data:any)=>{
			if (data.n == 1){
				for (let i = 0; i < this.dateInfo[day].undoneItems.length; i++){
					if (this.dateInfo[day].undoneItems[i]._id == todo._id){
						this.dateInfo[day].undoneItems.splice(i, 1);
					}
				}
				for (let i = 0; i < this.dateInfo[day].doneItems.length; i++){
					if (this.dateInfo[day].doneItems[i]._id == todo._id){
						this.dateInfo[day].doneItems.splice(i, 1);
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