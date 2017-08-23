import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Septa Map';
  routeNum:number;
  routeMessage:string = "";

  lookupRouteKey($event:KeyboardEvent):void{
    if ($event.key == "Enter"){
      const targ:HTMLInputElement = $event.target as HTMLInputElement;
      this.routeNum = parseInt(targ.value, 10);
    }
  }

  lookupRouteBtn(num:string):void{
    this.routeNum = parseInt(num, 10);
  }
}
