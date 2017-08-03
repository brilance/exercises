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

		this.createDateInfo(theMonth, todayDate, theYear, dayOfWeek, 1);

		this.fillForward(1, 4, todayDate, theMonth, theYear, dayOfWeek, daysInMonth);
		this.fillBackward(1, todayDate, theMonth, theYear, dayOfWeek, daysInLastMonth);
		
		this.fetchTodos();
	}

	fillForward(counter:number, daysFwd:number, todayDate:number, theMonth:number, theYear:number, dayOfWeek:number, daysInMonth:number){
		//fill forward in the week
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

			this.createDateInfo(monthIter, dateIter, yearIter, dayIter, counter);
		}
	}

	fillBackward(daysBack:number, todayDate:number, theMonth:number, theYear:number, dayOfWeek:number, daysInLastMonth:number){
		//fill backward in the week
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

			this.createDateInfo(monthIter, dateIter, yearIter, dayIter, daysBack);
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
		if (picker.value != '' && todoText.value != ''){
			const _todo:Todo = {
				text : todoText.value,
				isCompleted : false,
				date : null
			};
		
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

		this.fillForward(-1, 5, dayInt, monthInt, yearInt, dayOfWeek, daysInMonth);

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
		this.fillBackward(counter, dayInt, monthInt, yearInt, dayOfWeek, daysInLastMonth);

		this.fetchTodos();
	}

	createDateInfo(month:number, day:number, year:number, dayOfWeek:number, counter:number){
		const dateInfo = new DateInfo();
		dateInfo.linkText = (month+1) + '-' + day + '-' + year;
		dateInfo.labelText = this.monthLookup[month]+" "+day;
		dateInfo.doneItems = [];
		dateInfo.undoneItems = [];
		dateInfo.dayOfWeek = this.dayOfWeekLookup[dayOfWeek];
		this.dateInfo[counter] = dateInfo;
	}

	addToDay($event:any, day:number){
		const todo = $event.dragData;

		//remove from the old date
		const oldDate = todo.date;
		for (let di of this.dateInfo){
			if (di.linkText == oldDate){
				let theArray;
				if (todo.isCompleted){
					theArray = di.doneItems;
				}
				else{
					theArray = di.undoneItems;
				}

				for (let i = 0; i < theArray.length; i++){
					if (theArray[i]._id == todo._id){
						theArray.splice(i, 1);
					}
				}
			}
		}

		//assign to the new date
		const whichDay = this.dateInfo[day];
		todo.date = whichDay.linkText;

		this.todoFactory.update(todo).subscribe( (data:any) => {
			if (todo.isCompleted){
				this.dateInfo[day].doneItems.push(todo);
			}
			else{
				this.dateInfo[day].undoneItems.push(todo);
			}
		});
	}
}