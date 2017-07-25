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
	dayOfWeekLookup:Array<string> = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
		dateInfo.dayOfWeek = this.dayOfWeekLookup[dayOfWeek];
		this.dateInfo[1] = dateInfo;

		this.fillForward(todayDate, theMonth, theYear, dayOfWeek, daysInMonth);
		this.fillBackward(todayDate, theMonth, theYear, dayOfWeek, daysInLastMonth);
		
		this.fetchTodos();
	}

	fillForward(todayDate:number, theMonth:number, theYear:number, dayOfWeek:number, daysInMonth:number){
		//fill forward in the week
		let daysFwd = 4;
		let counter = 1;
		let dateIter = todayDate;
		let monthIter = theMonth;
		let yearIter = theYear;
		let dayIter = dayOfWeek;
		while (counter < daysFwd){
			counter++;
			dateIter++;
			dayIter++;
			if (dayIter > 6){
				dayIter = 0;
			}
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
			dateInfo.dayOfWeek = this.dayOfWeekLookup[dayIter];
			this.dateInfo[counter] = dateInfo;
		}
	}

	fillBackward(todayDate:number, theMonth:number, theYear:number, dayOfWeek:number, daysInLastMonth:number){
		//fill backward in the week
		let daysBack = 1;
		let dateIter = todayDate;
		let monthIter = theMonth;
		let yearIter = theYear;
		let dayIter = dayOfWeek;
		while (daysBack > 0){
			daysBack--;
			dateIter--;
			dayIter--;
			if (dayIter < 0){
				dayIter = 6;
			}
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
			dateInfo.dayOfWeek = this.dayOfWeekLookup[dayIter];
			this.dateInfo[daysBack] = dateInfo;
		}
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
				//this.dateInfo[dateObj.getDay()].undoneItems.push(data);
				for (let di of this.dateInfo){
					if (di.linkText == _todo.date){
						di.undoneItems.push(data);
					}
				}
				todoText.value = '';
			});
		}
	}

	goForward($event:any){
		let [month,day,year] = this.dateInfo[4].linkText.split("-");
		const monthInt = parseInt(month, 10)-1;
		const dayInt = parseInt(day, 10);
		const yearInt = parseInt(year, 10);		
		const startDate = new Date(yearInt, monthInt, dayInt);
		const daysInMonth = new Date(yearInt, monthInt+1, 0).getDate();
		const dayOfWeek = startDate.getDay();

		let counter = -1;
		let dayIter = dayInt;
		let monthIter = monthInt;
		let yearIter = yearInt;
		let dayWeekIter = dayOfWeek;
		while (counter < 5){
			counter++;
			dayIter++;
			dayWeekIter++;
			
			if (dayWeekIter > 6){
				dayWeekIter = 0;
			}
			if (dayIter > daysInMonth){
				dayIter = 1;
				monthIter++;
			}
			if (monthIter > 11){
				monthIter = 0;
				yearIter++;
			}
		
			const dateInfo = new DateInfo();
			dateInfo.linkText = (monthIter+1) + '-' + dayIter + '-' + yearIter;
			dateInfo.labelText = this.monthLookup[monthIter]+" "+dayIter;
			dateInfo.doneItems = [];
			dateInfo.undoneItems = [];
			dateInfo.dayOfWeek = this.dayOfWeekLookup[dayWeekIter];
			this.dateInfo[counter] = dateInfo;
		}

		this.fetchTodos();
	}

	goBackward($event:any){
		let [month,day,year] = this.dateInfo[0].linkText.split("-");
		const monthInt = parseInt(month, 10)-1;
		const dayInt = parseInt(day, 10);
		const yearInt = parseInt(year, 10);		
		const startDate = new Date(yearInt, monthInt, dayInt);
		const daysInLastMonth = new Date(yearInt, monthInt, 0).getDate();
		const dayOfWeek = startDate.getDay();

		let counter = 5;
		let dayIter = dayInt;
		let monthIter = monthInt;
		let yearIter = yearInt;
		let dayWeekIter = dayOfWeek;
		while (counter > 0){
			counter--;
			dayIter--;
			dayWeekIter--;
			
			if (dayWeekIter < 0){
				dayWeekIter = 6;
			}
			if (dayIter < 0){
				dayIter = daysInLastMonth;
				monthIter--;
			}
			if (monthIter < 0){
				monthIter = 11;
				yearIter--;
			}
		
			const dateInfo = new DateInfo();
			dateInfo.linkText = (monthIter+1) + '-' + dayIter + '-' + yearIter;
			dateInfo.labelText = this.monthLookup[monthIter]+" "+dayIter;
			dateInfo.doneItems = [];
			dateInfo.undoneItems = [];
			dateInfo.dayOfWeek = this.dayOfWeekLookup[dayWeekIter];
			this.dateInfo[counter] = dateInfo;
			console.log(this.dateInfo);
		}

		this.fetchTodos();
	}
}