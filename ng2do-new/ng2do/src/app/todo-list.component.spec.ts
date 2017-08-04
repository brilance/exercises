import { ComponentFixture, TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { DndModule } from 'ng2-dnd';
import { TodoFactory } from './todos-factory';
import { TodoListComponent } from './todo-list.component';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const TodoFactoryStub={
    update(){
        return Observable.of(true);//doesn't matter, not used in component
    },
    delete(){
        return Observable.of({n:1});//response for successful delete
    }
}

const newTodo = new Todo();
newTodo.text = "This is a new todo item";
newTodo.isCompleted = false;
newTodo.date = "8-4-2017";
newTodo._id = "1";

describe('TodoListComponent', () => {
    let comp:    TodoListComponent;
    let fixture: ComponentFixture<TodoListComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let updateSpy: any;
    let deleteSpy: any;

    // async beforeEach
    beforeEach(async(() => {
        deleteSpy = spyOn(TodoFactoryStub, 'delete').and.callThrough();
        updateSpy = spyOn(TodoFactoryStub, 'update').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [ TodoListComponent ], // declare the test component
            imports: [DndModule.forRoot()],
            schemas: [],
            providers: [{provide: TodoFactory, useValue: TodoFactoryStub}]
        })
        .compileComponents();  // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoListComponent);
        comp = fixture.componentInstance; // DashboardComponent test instance
    });

    describe('updateTodoText', () => {
        it('should update the text of the Todo item', ()=>{
            //fixture.detectChanges();
            expect(newTodo.text).toEqual("This is a new todo item");

            const text = {value:'This is some changed todo text.'};
            comp.updateTodoText(text, newTodo);

            expect(updateSpy).toHaveBeenCalled();
            expect(newTodo.text).toEqual(text.value);
            expect(newTodo.isEditMode).toBeUndefined();
        });
    });

     describe('setEditState', () => {
        it('should set isEditMode to true when called with true', ()=>{
            newTodo.isEditMode = false;
            expect(newTodo.isEditMode).toBeFalsy();

            comp.setEditState(newTodo, true);
            expect(newTodo.isEditMode).toBeTruthy();
        });

        it('should remove isEditMode when called with false', ()=>{
            expect(newTodo.isEditMode).toBeTruthy();

            comp.setEditState(newTodo, false);
            expect(newTodo.isEditMode).toBeUndefined();
        });
    });

    describe('updateStatus', () => {
        it('should set isCompleted to true when called on an uncompleted item', ()=>{
            newTodo.isCompleted = false;
            expect(newTodo.isCompleted).toBeFalsy();

            comp.undoneItems = [newTodo];
            comp.doneItems = [];
            comp.updateStatus(newTodo, null);

            expect(updateSpy).toHaveBeenCalled();
            expect(newTodo.isCompleted).toBeTruthy();
            expect(comp.undoneItems.length).toEqual(0);
            expect(comp.doneItems.length).toEqual(1);
        });

        it('should set isCompleted to false when called on a completed item', ()=>{
            newTodo.isCompleted = true;
            expect(newTodo.isCompleted).toBeTruthy();

            comp.undoneItems = [];
            comp.doneItems = [newTodo];
            comp.updateStatus(newTodo, null);

            expect(updateSpy).toHaveBeenCalled();
            expect(newTodo.isCompleted).toBeFalsy();
            expect(comp.undoneItems.length).toEqual(1);
            expect(comp.doneItems.length).toEqual(0);
        });
    });

    describe('delete', () => {
        it('should delete completed item and remove from doneItems', ()=>{
            newTodo.isCompleted = true;
            comp.doneItems = [newTodo];
            comp.deleteTodo(newTodo);
            expect(deleteSpy).toHaveBeenCalled();
            expect(comp.doneItems.length).toEqual(0);
        });
        it('should delete uncompleted item and remove from undoneItems', ()=>{
            newTodo.isCompleted = false;
            comp.undoneItems = [newTodo];
            comp.deleteTodo(newTodo);
            expect(deleteSpy).toHaveBeenCalled();
            expect(comp.undoneItems.length).toEqual(0);
        });
    });
});