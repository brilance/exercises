import { ComponentFixture, TestBed, inject, fakeAsync, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdInputModule,MdDatepickerModule,MdNativeDateModule } from '@angular/material';
import { DndModule } from 'ng2-dnd';
import { TodoFactory } from './todos-factory';
import { TodoListComponent } from './todo-list.component';
import { AppComponent } from './app.component';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const TodoFactoryStub={
    getAllForDate(date:string){
        return Observable.of(
        [
            {"_id":"5977a8d35f2c545aade3ebe4","text":"august 2nd is a busy day","date":"8-2-2017"},
            {"_id":"598253475d9155da1099be09","text":"a very very busy day indeed","date":"8-2-2017"}
        ]);
    },
    save(todo:Todo){
        return Observable.of(todo);
    },
    update(todo:Todo){
        return Observable.of(todo);
    }
}

describe('AppComponent', () => {
    let comp:    AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let getDateSpy:any;
    let updateSpy:any;
    let saveSpy: any;

    // async beforeEach
    beforeEach(async(() => {
        saveSpy = spyOn(TodoFactoryStub, 'save').and.callThrough();
        updateSpy = spyOn(TodoFactoryStub, 'update').and.callThrough();
        getDateSpy = spyOn(TodoFactoryStub, 'getAllForDate').and.callThrough();

         TestBed.configureTestingModule({
            declarations: [ TodoListComponent, AppComponent ], // declare the test component
            imports: [DndModule.forRoot(),BrowserAnimationsModule, MdNativeDateModule, MdDatepickerModule, MdInputModule],
            schemas: [],
            providers: [{provide: TodoFactory, useValue: TodoFactoryStub}]
        })
        .compileComponents();  // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance; // DashboardComponent test instance
    });

    describe('getDailyItems', () => {
        it('should populate the dateInfo array with 5 items and call getAllForDate 5 times', ()=>{
            getDateSpy.calls.reset();
            comp.dateInfo = [];
            comp.getDailyItems();
            expect(comp.dateInfo.length).toEqual(5);
            expect(getDateSpy).toHaveBeenCalledTimes(5);
        });
    });

    describe('fillForward', () => {
        it('should populate the dateInfo array forward one day', ()=>{
            comp.dateInfo = [];
            comp.fillForward(-1, 0, 4, 7, 2017, 5, 31);
            expect(comp.dateInfo.length).toEqual(1);
            expect(comp.dateInfo[0]['labelText']).toEqual('Aug 5');
            expect(comp.dateInfo[0]['linkText']).toEqual('8-5-2017');
            expect(comp.dateInfo[0]['dayOfWeek']).toEqual('Saturday');
        });
    });

    describe('fillBackward', () => {
        it('should populate the dateInfo array backward one day', ()=>{
            comp.dateInfo = [];
            comp.fillBackward(1, 4, 7, 2017, 5, 31);
            expect(comp.dateInfo.length).toEqual(1);
            expect(comp.dateInfo[0]['labelText']).toEqual('Aug 3');
            expect(comp.dateInfo[0]['linkText']).toEqual('8-3-2017');
            expect(comp.dateInfo[0]['dayOfWeek']).toEqual('Thursday');
        });
    });

    describe('fetchTodos', () => {
        it('should call getAllForDate and populate doneItems and undoneItems arrays', ()=>{
            getDateSpy.calls.reset();

            comp.dateInfo = [];
            comp.fillForward(-1, 0, 1, 7, 2017, 2, 31);
            expect(comp.dateInfo.length).toEqual(1);
            expect(comp.dateInfo[0].undoneItems.length).toEqual(0);

            comp.fetchTodos();
            expect(getDateSpy).toHaveBeenCalledTimes(1);
            expect(comp.dateInfo[0].undoneItems.length).toEqual(2);
        });
    });
    
    describe('addTodo', () => {
        it('should call save and append to undoneItems array', ()=>{
            saveSpy.calls.reset();
            const todoText = {value:'new todo text'};
            const picker = {value:'8/4/2017'};

            comp.dateInfo = [];
            comp.fillForward(-1, 0, 3, 7, 2017, 4, 31);
            expect(comp.dateInfo.length).toEqual(1);
            expect(comp.dateInfo[0].linkText).toEqual("8-4-2017");
            expect(comp.dateInfo[0].undoneItems.length).toEqual(0);

            comp.addTodo(todoText, picker);
            expect(saveSpy).toHaveBeenCalledTimes(1);
            expect(comp.dateInfo[0].undoneItems.length).toEqual(1);
        });
    });

    describe('createDateInfo', () => {
        it('should create DateInfo object and add to array', ()=>{
            comp.dateInfo = [];
            expect(comp.dateInfo.length).toEqual(0);

            comp.createDateInfo(7,4,2017,6,0);
            expect(comp.dateInfo.length).toEqual(1);
            const di = comp.dateInfo[0];
            expect(di.linkText).toEqual("8-4-2017");
            expect(di.labelText).toEqual("Aug 4");
            expect(di.dayOfWeek).toEqual("Saturday");
            expect(di.doneItems.length).toEqual(0);
            expect(di.undoneItems.length).toEqual(0);
        });
    });

    describe('addToDay', () => {
        it('should remove item from one day and add to another', ()=>{
            updateSpy.calls.reset();
            comp.dateInfo = [];
            comp.fillForward(-1, 4, 4, 7, 2017, 5, 31); //set up 5 days
            expect(comp.dateInfo.length).toEqual(5);

            //create the todo item
            const todo = new Todo();
            todo._id = "123";
            todo.text = "this is a todo item that will be moved";
            todo.date = '8-6-2017';
            todo.isCompleted = false;

            //add it to the 2nd dateInfo slot (for 8/6)
            expect(comp.dateInfo[1].linkText).toEqual(todo.date);//check that the dates are equal
            comp.dateInfo[1].undoneItems.push(todo);
            expect(comp.dateInfo[1].undoneItems.length).toEqual(1);
            expect(comp.dateInfo[0].undoneItems.length).toEqual(0);

            //expect it to be moved to the 1st dateInfo slot
            const event = {dragData: todo};
            comp.addToDay({todo:todo, day:0});
            expect(updateSpy).toHaveBeenCalledTimes(1);
            expect(comp.dateInfo[1].undoneItems.length).toEqual(0);
            expect(comp.dateInfo[0].undoneItems.length).toEqual(0);

            //expect the date to be changed to that date
            expect(todo.date).toEqual('8-5-2017');
        });
    });

     describe('goForward', () => {
        it('should fill dateInfo forward 5 days and make 5 calls to getAllForDate', ()=>{
            getDateSpy.calls.reset();
            comp.dateInfo = [];
            comp.fillForward(-1, 4, 4, 7, 2017, 5, 31); //set up 5 days
            expect(comp.dateInfo.length).toEqual(5);
            expect(comp.dateInfo[4].linkText).toEqual('8-9-2017');
            
            comp.goForward(true);
            //go forward by 5 days
            expect(comp.dateInfo.length).toEqual(5);
            expect(comp.dateInfo[4].linkText).toEqual('8-14-2017');
            expect(getDateSpy).toHaveBeenCalledTimes(5);
        })
     });

     describe('goBackward', () => {
        it('should fill dateInfo backward 5 days and make 5 calls to getAllForDate', ()=>{
            getDateSpy.calls.reset();
            comp.dateInfo = [];
            comp.fillForward(-1, 4, 4, 7, 2017, 5, 31); //set up 5 days
            expect(comp.dateInfo.length).toEqual(5);
            expect(comp.dateInfo[0].linkText).toEqual('8-5-2017');
            
            comp.goBackward(true);
            //go backward by 5 days
            expect(comp.dateInfo.length).toEqual(5);
            expect(comp.dateInfo[0].linkText).toEqual('7-31-2017');
            expect(getDateSpy).toHaveBeenCalledTimes(5);
        })
     });
});