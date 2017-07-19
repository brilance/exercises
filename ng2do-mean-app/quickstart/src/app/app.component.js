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
        this.todos = [];
        todos_factory_1.TodoFactory.getAll().then(function (data) { _this.todos = data; });
    }
    AppComponent.prototype.addTodo = function ($event, todoText) {
        var _this = this;
        if ($event.which === 13) {
            var _todo = {
                text: todoText.value,
                isCompleted: false
            };
            todos_factory_1.TodoFactory.save(_todo).then(function (data) {
                _this.todos.push(data);
                todoText.value = '';
            });
        }
    };
    AppComponent.prototype.updateTodoText = function ($event, todo) {
        var _this = this;
        if ($event.which === 13) {
            todo.text = $event.target.value;
            var _todo = {
                _id: todo._id,
                text: todo.text,
                isCompleted: todo.isCompleted
            };
            todos_factory_1.TodoFactory.update(_todo).then(function (data) { _this.setEditState(todo, false); });
        }
    };
    AppComponent.prototype.updateStatus = function (todo) {
        var _todo = {
            _id: todo._id,
            text: todo.text,
            isCompleted: !todo.isCompleted
        };
        todos_factory_1.TodoFactory.update(_todo).then(function (data) { todo.isCompleted = !todo.isCompleted; });
    };
    AppComponent.prototype.deleteTodo = function (todo) {
        var todos = this.todos;
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