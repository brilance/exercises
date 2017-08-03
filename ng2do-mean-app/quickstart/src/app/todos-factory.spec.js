//TODO - problem with configuration and importing
//import {Component} from '@angular/core';
// import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
//import { HttpModule, XHRBackend, Http, Response, ResponseOptions, RequestMethod } from '@angular/http';
//import { MockBackend, MockConnection } from '@angular/http/testing';
// import { TodoFactory } from './todos-factory';
// import { Todo } from './todo';
var todoList = {};
var todoListForDate = {};
var singleTodo = {};
var deleteResult = {};
describe("it should run a test", function () {
    it("should run this test", function () {
        expect(true).toBe(true);
    });
});
// describe('TodoFactory', () => {
//     /*beforeEach(() => {
//         TestBed.configureTestingModule({
//         imports: [HttpModule],
//         providers: [TodoFactory, { provide: XHRBackend, useClass: MockBackend }]
//         });
//     });*/
//     describe('getAll', () => {
//         /*it('should call http get and return a list of results', 
//         fakeAsync(inject([TodoFactory, XHRBackend], (TodoFactory:TodoFactory, mockBackend:MockBackend) => {
//             mockBackend.connections.subscribe((connection:MockConnection) => {
//                 expect(connection.request.method).toEqual(RequestMethod.Get);
//                 expect(connection.request.url).toEqual('/api/v1/todos');
//                 connection.mockRespond(new Response(new ResponseOptions({
//                     body: JSON.stringify(todoList)
//                 })));
//             });
//             TodoFactory.getAll().subscribe((results)=>{
//                 //TODO - test that results are as expected
//             });
//         })))*/
//     });
//     describe('getAllForDate', () => {
//         /*it('should call http get and return a list of results', 
//         fakeAsync(inject([TodoFactory, XHRBackend], (TodoFactory:TodoFactory, mockBackend:MockBackend) => {
//             mockBackend.connections.subscribe((connection:MockConnection) => {
//                 expect(connection.request.method).toEqual(RequestMethod.Get);
//                 expect(connection.request.url).toEqual('/api/v1/todos?date=2-26-1984');
//                 connection.mockRespond(new Response(new ResponseOptions({
//                     body: JSON.stringify(todoListForDate)
//                 })));
//             });
//             TodoFactory.getAllForDate("2-26-1984").subscribe((results)=>{
//                 //TODO - test that results are as expected
//             });
//         })))*/
//     });
//     describe('get', () => {
//         /*it('should call http get and return a single result', 
//         fakeAsync(inject([TodoFactory, XHRBackend], (TodoFactory:TodoFactory, mockBackend:MockBackend) => {
//             mockBackend.connections.subscribe((connection:MockConnection) => {
//                 expect(connection.request.method).toEqual(RequestMethod.Get);
//                 expect(connection.request.url).toEqual('/api/v1/todo/1');
//                 connection.mockRespond(new Response(new ResponseOptions({
//                     body: JSON.stringify(singleTodo)
//                 })));
//             });
//             TodoFactory.get("1").subscribe((results)=>{
//                 //TODO - test that results are as expected
//             });
//         })))*/
//     });
//     describe('save', () => {
//         /*it('should call http post and return a single result', 
//         fakeAsync(inject([TodoFactory, XHRBackend], (TodoFactory:TodoFactory, mockBackend:MockBackend) => {
//             mockBackend.connections.subscribe((connection:MockConnection) => {
//                 expect(connection.request.method).toEqual(RequestMethod.Post);
//                 expect(connection.request.url).toEqual('/api/v1/todo');
//                 connection.mockRespond(new Response(new ResponseOptions({
//                     body: JSON.stringify(singleTodo)
//                 })));
//             });
//             //TODO - create new Todo object to save
//             const todo = new Todo();
//             TodoFactory.save(todo).subscribe((results)=>{
//                 //TODO - test that results are as expected
//             });
//         })))*/
//     });
//     describe('update', () => {
//         /*it('should call http put and return a single result', 
//         fakeAsync(inject([TodoFactory, XHRBackend], (TodoFactory:TodoFactory, mockBackend:MockBackend) => {
//             mockBackend.connections.subscribe((connection:MockConnection) => {
//                 expect(connection.request.method).toEqual(RequestMethod.Put);
//                 expect(connection.request.url).toEqual('/api/v1/todo/1');
//                 connection.mockRespond(new Response(new ResponseOptions({
//                     body: JSON.stringify(singleTodo)
//                 })));
//             });
//             //TODO - create new Todo object to save
//             const todo = new Todo();
//             todo._id = '1';
//             TodoFactory.update(todo).subscribe((results)=>{
//                 //TODO - test that results are as expected
//             });
//         })))*/
//     });
//     describe('delete', () => {
//         /*it('should call http delete and return delete information', 
//         fakeAsync(inject([TodoFactory, XHRBackend], (TodoFactory:TodoFactory, mockBackend:MockBackend) => {
//             mockBackend.connections.subscribe((connection:MockConnection) => {
//                 expect(connection.request.method).toEqual(RequestMethod.Delete);
//                 expect(connection.request.url).toEqual('/api/v1/todo/1');
//                 connection.mockRespond(new Response(new ResponseOptions({
//                     body: JSON.stringify(deleteResult)
//                 })));
//             });
//             TodoFactory.delete('1').subscribe((results)=>{
//                 //TODO - test that results are as expected
//             });
//         })))*/
//     });
// }); 
//# sourceMappingURL=todos-factory.spec.js.map