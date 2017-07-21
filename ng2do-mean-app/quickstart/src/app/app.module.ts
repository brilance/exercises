import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdInputModule,MdDatepickerModule,MdNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { TodoFactory } from './todos-factory'

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, HttpClientModule, BrowserAnimationsModule, MdNativeDateModule, MdDatepickerModule, MdInputModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers:[TodoFactory]
})
export class AppModule { }
