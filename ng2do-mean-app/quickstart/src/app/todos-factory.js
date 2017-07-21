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
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var TodoFactory = (function () {
    function TodoFactory(http) {
        this.http = http;
    }
    TodoFactory.prototype.getAll = function () {
        return this.http.get('/api/v1/todos');
    };
    TodoFactory.prototype.getAllForDate = function (dateStr) {
        //dateStr format: m-d-yyyy
        return this.http.get('/api/v1/todos?date=' + dateStr);
    };
    TodoFactory.prototype.get = function (id) {
        return this.http.get('/api/v1/todo/' + id);
    };
    TodoFactory.prototype.save = function (todo) {
        return this.http.post('/api/v1/todo', todo);
    };
    TodoFactory.prototype.update = function (todo) {
        return this.http.put('/api/v1/todo/' + todo._id, todo);
    };
    TodoFactory.prototype.delete = function (id) {
        return this.http.delete('/api/v1/todo/' + id);
    };
    TodoFactory = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], TodoFactory);
    return TodoFactory;
}());
exports.TodoFactory = TodoFactory;
;
//# sourceMappingURL=todos-factory.js.map