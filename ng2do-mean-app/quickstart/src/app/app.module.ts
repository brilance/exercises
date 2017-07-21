import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MdInputModule,MdDatepickerModule,MdNativeDateModule } from '@angular/material';


import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, MdNativeDateModule, MdDatepickerModule, MdInputModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
