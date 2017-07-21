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
	todayDate:string;
	dateInfo:Array<DateInfo>;
	monthLookup:Array<string> = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	constructor(private todoFactory:TodoFactory){
		this.dateInfo = [];
		this.getDailyItems();
	}

	getDailyItems(){
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
			this.todoFactory.getAllForDate(dateString).subscribe( (data:Array<Todo>) => {
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
		const _todo:Todo = {
			text : todoText.value,
			isCompleted : false,
			date : null
		};

		if (picker.value != ''){
			const [month,day,year] = picker.value.split("/");
			const dateObj = new Date(year, month-1, day);
			_todo.date = month+"-"+day+"-"+year;

			this.todoFactory.save(_todo).subscribe( (data:Todo) => {
				this.dateInfo[dateObj.getDay()].undoneItems.push(data);
				todoText.value = '';
			});
		}
	}
}