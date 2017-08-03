import {Todo} from './todo';

export class DateInfo{
    labelText:string;
    linkText:string;
    doneItems:Array<Todo>;
    undoneItems:Array<Todo>;
    dayOfWeek:string;
}