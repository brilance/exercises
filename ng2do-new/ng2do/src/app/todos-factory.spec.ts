import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClient} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoFactory } from './todos-factory';
import { Todo } from './todo';

const todoList = [
    {"_id":"5972535661711b103333b94e","text":"item for Wednesday","isCompleted":false,"date":"7-19-2017"},
    {"_id":"5977918d5f2c545aade3ebe2","text":"something for the 30th","isCompleted":false,"date":"7-30-2017"},
    {"_id":"5983a5109cc5800790880c96","text":"test adding a todo from the new project","isCompleted":true,"date":"8-3-2017"},
    {"_id":"5983a5209cc5800790880c97","text":"test adding another todo","isCompleted":true,"date":"8-4-2017"},   
];

const todoListForDate = [
    {"_id":"5977a8d35f2c545aade3ebe4","text":"august 2nd is a busy day","date":"8-2-2017"},
    {"_id":"598253475d9155da1099be09","text":"a very very busy day indeed","date":"8-2-2017"}
];

const singleTodo = {"_id":"5972535661711b103333b94e","text":"item for Wednesday","isCompleted":false,"date":"7-19-2017"};

const newTodo = new Todo();
newTodo.text = "This is a new todo item";
newTodo.isCompleted = false;
newTodo.date = "8-4-2017";

const deleteResult = {
    //TODO - fill in data
}

describe("it should run a test", () => {
    it("should run this test", () => {
        expect(true).toBe(true);
    });
});

describe('TodoFactory', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [TodoFactory]
        });
    });

    describe('getAll', () => {
        it('should call http get and return a list of results', 
        fakeAsync(inject([TodoFactory, HttpClient, HttpTestingController], (TodoFactory:TodoFactory, http: HttpClient, httpMock:HttpTestingController) => {

            TodoFactory.getAll().subscribe((results)=>{
                expect(results).toBe(todoList);
            });

            const req = httpMock.expectOne('http://localhost:3000/api/v1/todos');
            expect(req.request.method).toEqual('GET');
            req.flush(todoList);
            httpMock.verify();
        })))
    });

    describe('getAllForDate', () => {
        it('should call http get and return a list of results', 
        fakeAsync(inject([TodoFactory, HttpClient, HttpTestingController], (TodoFactory:TodoFactory, http: HttpClient, httpMock:HttpTestingController) => {

            TodoFactory.getAllForDate("8-2-2017").subscribe((results)=>{
                expect(results).toBe(todoListForDate);
            });

            const req = httpMock.expectOne('http://localhost:3000/api/v1/todos?date=8-2-2017');
            expect(req.request.method).toEqual('GET');
            req.flush(todoListForDate);
            httpMock.verify();
        })))

        it('should return nothing when called with an invalid date string', 
        fakeAsync(inject([TodoFactory, HttpClient, HttpTestingController], (TodoFactory:TodoFactory, http: HttpClient, httpMock:HttpTestingController) => {

            TodoFactory.getAllForDate("asdf").subscribe((results)=>{
                expect(results["length"]).toEqual(0);
            });

            const req = httpMock.expectOne('http://localhost:3000/api/v1/todos?date=asdf');
            expect(req.request.method).toEqual('GET');
            req.flush([]);
            httpMock.verify();
        })))
    });

    describe('get', () => {
        it('should call http get and return a single result', 
        fakeAsync(inject([TodoFactory, HttpClient, HttpTestingController], (TodoFactory:TodoFactory, http: HttpClient, httpMock:HttpTestingController) => {

            TodoFactory.get("5972535661711b103333b94e").subscribe((results)=>{
                expect(results).toBe(singleTodo);
            });

            const req = httpMock.expectOne('http://localhost:3000/api/v1/todo/5972535661711b103333b94e');
            expect(req.request.method).toEqual('GET');
            req.flush(singleTodo);
            httpMock.verify();
        })))
    });

    describe('save', () => {
        it('should call http post and return a single result', 
        fakeAsync(inject([TodoFactory, HttpClient, HttpTestingController], (TodoFactory:TodoFactory, http: HttpClient, httpMock:HttpTestingController) => {

            TodoFactory.save(newTodo).subscribe((results)=>{
                expect(results).toBe(newTodo);
            });

            const req = httpMock.expectOne('http://localhost:3000/api/v1/todo');
            expect(req.request.method).toEqual('POST');
            req.flush(newTodo);
            httpMock.verify();
        })))
    });

    describe('update', () => {
        it('should call http put and return a single result', 
        fakeAsync(inject([TodoFactory, HttpClient, HttpTestingController], (TodoFactory:TodoFactory, http: HttpClient, httpMock:HttpTestingController) => {

            TodoFactory.update(singleTodo).subscribe((results)=>{
                expect(results).toBe(singleTodo);
            });

            const req = httpMock.expectOne('http://localhost:3000/api/v1/todo/5972535661711b103333b94e');
            expect(req.request.method).toEqual('PUT');
            req.flush(singleTodo);
            httpMock.verify();
        })))
    });

    describe('delete', () => {
        it('should call http delete and return delete information', 
        fakeAsync(inject([TodoFactory, HttpClient, HttpTestingController], (TodoFactory:TodoFactory, http: HttpClient, httpMock:HttpTestingController) => {

            TodoFactory.delete("5972535661711b103333b94e").subscribe((results)=>{
                expect(results["n"]).toEqual(1);
            });

            const req = httpMock.expectOne('http://localhost:3000/api/v1/todo/5972535661711b103333b94e');
            expect(req.request.method).toEqual('DELETE');
            req.flush({n:1});
            httpMock.verify();
        })))
    });
});