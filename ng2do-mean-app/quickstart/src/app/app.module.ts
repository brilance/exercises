import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdInputModule,MdDatepickerModule,MdNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { TodoFactory } from './todos-factory'
import {TodoListComponent} from './todo-list.component';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, BrowserAnimationsModule, MdNativeDateModule, MdDatepickerModule, MdInputModule],
  declarations: [ AppComponent,TodoListComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ TodoFactory ]
})
export class AppModule { }
