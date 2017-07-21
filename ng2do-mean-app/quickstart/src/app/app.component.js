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
        var dateInfo = new date_info_1.DateInfo();
        dateInfo.linkText = (theMonth + 1) + '-' + todayDate + '-' + theYear;
        dateInfo.labelText = this.todayDate;
        dateInfo.doneItems = [];
        dateInfo.undoneItems = [];
        this.dateInfo[dayOfWeek] = dateInfo;
        //fill forward in the week
        var dayIter = dayOfWeek;
        var dateIter = todayDate;
        var monthIter = theMonth;
        var yearIter = theYear;
        while (dayIter <= 6) {
            dayIter++;
            dateIter++;
            if (dateIter > daysInMonth) {
                dateIter = 1;
                monthIter++;
                if (monthIter > 11) {
                    monthIter = 0;
                    yearIter++;
                }
            }
            var dateInfo_1 = new date_info_1.DateInfo();
            dateInfo_1.linkText = (monthIter + 1) + '-' + dateIter + '-' + yearIter;
            dateInfo_1.labelText = this.monthLookup[monthIter] + " " + dateIter;
            dateInfo_1.doneItems = [];
            dateInfo_1.undoneItems = [];
            this.dateInfo[dayIter] = dateInfo_1;
        }
        //fill backward in the week
        dayIter = dayOfWeek;
        dateIter = todayDate;
        monthIter = theMonth;
        yearIter = theYear;
        while (dayIter >= 0) {
            dayIter--;
            dateIter--;
            if (dateIter < 1) {
                dateIter = daysInLastMonth;
                monthIter--;
                if (monthIter < 0) {
                    monthIter = 11;
                    yearIter--;
                }
            }
            var dateInfo_2 = new date_info_1.DateInfo();
            dateInfo_2.linkText = (monthIter + 1) + '-' + dateIter + '-' + yearIter;
            dateInfo_2.labelText = this.monthLookup[monthIter] + " " + dateIter;
            dateInfo_2.doneItems = [];
            dateInfo_2.undoneItems = [];
            this.dateInfo[dayIter] = dateInfo_2;
        }
        this.fetchTodos();
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
        var _todo = {
            text: todoText.value,
            isCompleted: false,
            date: null
        };
        if (picker.value != '') {
            var _a = picker.value.split("/"), month = _a[0], day = _a[1], year = _a[2];
            var dateObj_1 = new Date(year, month - 1, day);
            _todo.date = month + "-" + day + "-" + year;
            this.todoFactory.save(_todo).subscribe(function (data) {
                _this.dateInfo[dateObj_1.getDay()].undoneItems.push(data);
                todoText.value = '';
            });
        }
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