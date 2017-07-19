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
var core_1 = require("@angular/core");
var todos_factory_1 = require("./todos-factory");
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.doneTodos = [];
        this.undoneTodos = [];
        todos_factory_1.TodoFactory.getAll().then(function (data) {
            _this.doneTodos = data.filter(function (item) { return item.isCompleted; });
            _this.undoneTodos = data.filter(function (item) { return !item.isCompleted; });
        });
    }
    AppComponent.prototype.addTodoKey = function ($event, todoText) {
        if ($event.which === 13) {
            this.addTodo(todoText);
        }
    };
    AppComponent.prototype.addTodoBtn = function (todoText) {
        this.addTodo(todoText);
    };
    AppComponent.prototype.addTodo = function (todoText) {
        var _this = this;
        var _todo = {
            text: todoText.value,
            isCompleted: false
        };
        todos_factory_1.TodoFactory.save(_todo).then(function (data) {
            _this.undoneTodos.push(data);
            todoText.value = '';
        });
    };
    AppComponent.prototype.updateTodoTextKey = function ($event, edittext, todo) {
        if ($event.which === 13) {
            this.updateTodoText(edittext, todo);
        }
    };
    AppComponent.prototype.updateTodoTextBtn = function (edittext, todo) {
        this.updateTodoText(edittext, todo);
    };
    AppComponent.prototype.updateTodoText = function (edittext, todo) {
        var _this = this;
        todo.text = edittext.value;
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: todo.isCompleted
        };
        todos_factory_1.TodoFactory.update(_todo).then(function (data) { _this.setEditState(todo, false); });
    };
    AppComponent.prototype.updateStatus = function (todo, item) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        if (!todo.isCompleted) {
            document.querySelector("#doneItems").appendChild(item);
            this.doneTodos.push(todo);
            this.undoneTodos.splice(this.undoneTodos.findIndex(function (item) { return item._id == todo._id; }), 1);
        }
        else {
            document.querySelector("#todoItems").appendChild(item);
            this.undoneTodos.push(todo);
            this.doneTodos.splice(this.doneTodos.findIndex(function (item) { return item._id == todo._id; }), 1);
        }
        todos_factory_1.TodoFactory.update(_todo).then(function (data) {
            todo.isCompleted = !todo.isCompleted;
        });
    };
    AppComponent.prototype.deleteTodo = function (todo) {
        var todos = this.undoneTodos.concat(this.doneTodos);
        todos_factory_1.TodoFactory.delete(todo._id).then(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < todos.length; i++) {
                    if (todos[i]._id == todo._id) {
                        todos.splice(i, 1);
                    }
                }
            }
        });
    };
    AppComponent.prototype.setEditState = function (todo, state) {
        if (state) {
            todo.isEditMode = state;
        }
        else {
            delete todo.isEditMode;
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'todo-app',
        templateUrl: './todo-app.component.html',
        styleUrls: ['./todo-app.component.css']
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map