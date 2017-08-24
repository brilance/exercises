import { Component, OnInit, Input } from '@angular/core';
import { SeptaService } from '../septa.service';
import { Alert } from '../models/alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  private _route:number;
  alerts:Array<Alert>;

  constructor(private septaService:SeptaService) { }

  ngOnInit() {
    this.alerts = [];
  }

  @Input() set route(route: number) {
    if (route){
      this._route = route;
      this.getAlerts();
    }
  }

  get route(): number {
    return this._route;
  }

  getAlerts():void{
    this.septaService.getAlerts(this._route).subscribe(results => {
      this.alerts = results;
      for (let alert of this.alerts){
        alert.advisory_message = alert.advisory_message.replace(/\<.[^\>\<]*\>/g, " ");
        alert.advisory_message = alert.advisory_message.replace(/&amp;/g, "&");
        alert.detour_message = alert.detour_message.replace(/\<.[^\>\<]*\>/g, " ");
      }
    });
  }

  togglePanel(id:string):void{
    const panelElem = document.getElementById(id);
    if (panelElem.style.display == "block"){
      panelElem.style.display = "none";
    }
    else{
      panelElem.style.display = "block";
    }
  }
}
