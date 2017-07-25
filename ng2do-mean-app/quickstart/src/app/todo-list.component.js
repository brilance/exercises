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
var TodoListComponent = (function () {
    function TodoListComponent(todoFactory) {
        this.todoFactory = todoFactory;
    }
    TodoListComponent.prototype.updateTodoTextKey = function ($event, edittext, todo) {
        if ($event.which === 13) {
            this.updateTodoText(edittext, todo);
        }
    };
    TodoListComponent.prototype.updateTodoTextBtn = function (edittext, todo) {
        this.updateTodoText(edittext, todo);
    };
    TodoListComponent.prototype.updateTodoText = function (edittext, todo) {
        var _this = this;
        todo.text = edittext.value;
        var _todo = {
            _id: todo._id,
            text: todo.text,
            date: todo.date,
            isCompleted: todo.isCompleted
        };
        this.todoFactory.update(_todo).subscribe(function (data) { _this.setEditState(todo, false); });
    };
    TodoListComponent.prototype.setEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    TodoListComponent.prototype.updateStatus = function (todo, item) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            date: todo.date,
            isCompleted: !todo.isCompleted
        };
        var _a = todo.date.split("-"), month = _a[0], date = _a[1], year = _a[2];
        var dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(date, 10));
        var day = dateObj.getDay();
        if (!todo.isCompleted) {
            document.querySelector("#doneItems" + day).appendChild(item);
            this.doneItems.push(todo);
            this.undoneItems.splice(this.undoneItems.findIndex(function (item) { return item._id == todo._id; }), 1);
        }
        else {
            document.querySelector("#undoneItems" + day).appendChild(item);
            this.undoneItems.push(todo);
            this.doneItems.splice(this.doneItems.findIndex(function (item) { return item._id == todo._id; }), 1);
        }
        this.todoFactory.update(_todo).subscribe(function (data) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    TodoListComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        var _a = todo.date.split("-"), month = _a[0], date = _a[1], year = _a[2];
        var dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(date, 10));
        var day = dateObj.getDay();
        this.todoFactory.delete(todo._id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < _this.undoneItems.length; i++) {
                    if (_this.undoneItems[i]._id == todo._id) {
                        _this.undoneItems.splice(i, 1);
                    }
                }
                for (var i = 0; i < _this.doneItems.length; i++) {
                    if (_this.doneItems[i]._id == todo._id) {
                        _this.doneItems.splice(i, 1);
                    }
                }
            }
        });
    };
    TodoListComponent.prototype.showButtons = function ($event) {
        $event.currentTarget.querySelector(".col3").classList.remove("invisible");
    };
    TodoListComponent.prototype.hideButtons = function ($event) {
        $event.currentTarget.querySelector(".col3").classList.add("invisible");
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TodoListComponent.prototype, "doneItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], TodoListComponent.prototype, "undoneItems", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], TodoListComponent.prototype, "day", void 0);
    TodoListComponent = __decorate([
        core_1.Component({
            selector: 'todo-list',
            templateUrl: './todo-list.component.html',
            styleUrls: ['./todo-list.component.css']
        }),
        __metadata("design:paramtypes", [todos_factory_1.TodoFactory])
    ], TodoListComponent);
    return TodoListComponent;
}());
exports.TodoListComponent = TodoListComponent;
//# sourceMappingURL=todo-list.component.js.map