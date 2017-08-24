import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SeptaService } from './septa.service';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SeptaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
