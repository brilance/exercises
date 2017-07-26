"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var todos_factory_1 = require("./todos-factory");
var date_info_1 = require("./date-info");
var AppComponent = (function () {
    function AppComponent(todoFactory) {
        this.todoFactory = todoFactory;
        this.monthLookup = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.dayOfWeekLookup = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.dateInfo = [];
        this.getDailyItems();
    }
    AppComponent.prototype.getDailyItems = function () {
        var now = new Date();
        var dayOfWeek = now.getDay();
        var todayDate = now.getDate();
        var theYear = now.getFullYear();
        var theMonth = now.getMonth();
        var daysInMonth = new Date(now.getFullYear(), theMonth + 1, 0).getDate();
        var daysInLastMonth = new Date(now.getFullYear(), theMonth, 0).getDate();
        //fill in today's date
        this.todayDate = this.monthLookup[theMonth] + " " + todayDate;
        this.createDateInfo(theMonth, todayDate, theYear, dayOfWeek, 1);
        this.fillForward(1, 4, todayDate, theMonth, theYear, dayOfWeek, daysInMonth);
        this.fillBackward(1, todayDate, theMonth, theYear, dayOfWeek, daysInLastMonth);
        this.fetchTodos();
    };
    AppComponent.prototype.fillForward = function (counter, daysFwd, todayDate, theMonth, theYear, dayOfWeek, daysInMonth) {
        //fill forward in the week
        var dateIter = todayDate;
        var monthIter = theMonth;
        var yearIter = theYear;
        var dayIter = dayOfWeek;
        while (counter < daysFwd) {
            counter++;
            dateIter++;
            dayIter++;
            if (dayIter > 6) {
                dayIter = 0;
            }
            if (dateIter > daysInMonth) {
                dateIter = 1;
                monthIter++;
                if (monthIter > 11) {
                    monthIter = 0;
                    yearIter++;
                }
            }
            this.createDateInfo(monthIter, dateIter, yearIter, dayIter, counter);
        }
    };
    AppComponent.prototype.fillBackward = function (daysBack, todayDate, theMonth, theYear, dayOfWeek, daysInLastMonth) {
        //fill backward in the week
        var dateIter = todayDate;
        var monthIter = theMonth;
        var yearIter = theYear;
        var dayIter = dayOfWeek;
        while (daysBack > 0) {
            daysBack--;
            dateIter--;
            dayIter--;
            if (dayIter < 0) {
                dayIter = 6;
            }
            if (dateIter < 1) {
                dateIter = daysInLastMonth;
                monthIter--;
                if (monthIter < 0) {
                    monthIter = 11;
                    yearIter--;
                }
            }
            this.createDateInfo(monthIter, dateIter, yearIter, dayIter, daysBack);
        }
    };
    AppComponent.prototype.fetchTodos = function () {
        var _loop_1 = function (di) {
            var dateString = di.linkText;
            this_1.todoFactory.getAllForDate(dateString).subscribe(function (data) {
                di.doneItems = data.filter(function (item) { return item.isCompleted; });
                di.undoneItems = data.filter(function (item) { return !item.isCompleted; });
            });
        };
        var this_1 = this;
        for (var _i = 0, _a = this.dateInfo; _i < _a.length; _i++) {
            var di = _a[_i];
            _loop_1(di);
        }
    };
    AppComponent.prototype.addTodoKey = function ($event, todoText, picker) {
        if ($event.which === 13) {
            this.addTodo(todoText, picker);
        }
    };
    AppComponent.prototype.addTodoBtn = function (todoText, picker) {
        this.addTodo(todoText, picker);
    };
    AppComponent.prototype.addTodo = function (todoText, picker) {
        var _this = this;
        if (picker.value != '' && todoText.value != '') {
            var _todo_1 = {
                text: todoText.value,
                isCompleted: false,
                date: null
            };
            var _a = picker.value.split("/"), month = _a[0], day = _a[1], year = _a[2];
            var dateObj = new Date(year, month - 1, day);
            _todo_1.date = month + "-" + day + "-" + year;
            this.todoFactory.save(_todo_1).subscribe(function (data) {
                //this.dateInfo[dateObj.getDay()].undoneItems.push(data);
                for (var _i = 0, _a = _this.dateInfo; _i < _a.length; _i++) {
                    var di = _a[_i];
                    if (di.linkText == _todo_1.date) {
                        di.undoneItems.push(data);
                    }
                }
                todoText.value = '';
            });
        }
    };
    AppComponent.prototype.goForward = function ($event) {
        var _a = this.dateInfo[4].linkText.split("-"), month = _a[0], day = _a[1], year = _a[2];
        var monthInt = parseInt(month, 10) - 1;
        var dayInt = parseInt(day, 10);
        var yearInt = parseInt(year, 10);
        var startDate = new Date(yearInt, monthInt, dayInt);
        var daysInMonth = new Date(yearInt, monthInt + 1, 0).getDate();
        var dayOfWeek = startDate.getDay();
        this.fillForward(-1, 5, dayInt, monthInt, yearInt, dayOfWeek, daysInMonth);
        this.fetchTodos();
    };
    AppComponent.prototype.goBackward = function ($event) {
        var _a = this.dateInfo[0].linkText.split("-"), month = _a[0], day = _a[1], year = _a[2];
        var monthInt = parseInt(month, 10) - 1;
        var dayInt = parseInt(day, 10);
        var yearInt = parseInt(year, 10);
        var startDate = new Date(yearInt, monthInt, dayInt);
        var daysInLastMonth = new Date(yearInt, monthInt, 0).getDate();
        var dayOfWeek = startDate.getDay();
        var counter = 5;
        this.fillBackward(counter, dayInt, monthInt, yearInt, dayOfWeek, daysInLastMonth);
        this.fetchTodos();
    };
    AppComponent.prototype.createDateInfo = function (month, day, year, dayOfWeek, counter) {
        var dateInfo = new date_info_1.DateInfo();
        dateInfo.linkText = (month + 1) + '-' + day + '-' + year;
        dateInfo.labelText = this.monthLookup[month] + " " + day;
        dateInfo.doneItems = [];
        dateInfo.undoneItems = [];
        dateInfo.dayOfWeek = this.dayOfWeekLookup[dayOfWeek];
        this.dateInfo[counter] = dateInfo;
    };
    AppComponent.prototype.addToDay = function ($event, day) {
        var _this = this;
        var todo = $event.dragData;
        //remove from the old date
        var oldDate = todo.date;
        for (var _i = 0, _a = this.dateInfo; _i < _a.length; _i++) {
            var di = _a[_i];
            if (di.linkText == oldDate) {
                var theArray = void 0;
                if (todo.isCompleted) {
                    theArray = di.doneItems;
                }
                else {
                    theArray = di.undoneItems;
                }
                for (var i = 0; i < theArray.length; i++) {
                    if (theArray[i]._id == todo._id) {
                        theArray.splice(i, 1);
                    }
                }
            }
        }
        //assign to the new date
        var whichDay = this.dateInfo[day];
        todo.date = whichDay.linkText;
        this.todoFactory.update(todo).subscribe(function (data) {
            if (todo.isCompleted) {
                _this.dateInfo[day].doneItems.push(todo);
            }
            else {
                _this.dateInfo[day].undoneItems.push(todo);
            }
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'todo-app',
            templateUrl: './todo-app.component.html',
            styleUrls: ['./todo-app.component.css']
        }),
        __metadata("design:paramtypes", [todos_factory_1.TodoFactory])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map