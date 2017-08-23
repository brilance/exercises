import { Component } from '@angular/core';
import { shuffle } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  places = [null,null,null,null,null,null,null,null,null];
  availablePlaces = [0,1,2,3,4,5,6,7,8];
  threes = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  moveCounter = 0;
  displayMessage = '';
  gameWon = false;
  gameWinner = null;
  autoPlay = true;
  whoseTurn = null;

  ngOnInit(): void {
    this.randomize();
    this.placeO();
  }

  randomize():void{
    this.availablePlaces = shuffle(this.availablePlaces);
  }

  placeX(position):void{
    if (position > -1 && position < this.places.length){
      this.places[position] = "X";
      this.moveCounter++;
      this.whoseTurn = "O";
      this.checkMoveCount();
    }
  }

  placeO():void{
    let subscript = this.availablePlaces.pop();
    while(this.places[subscript]!=null){
      subscript = this.availablePlaces.pop();
      if (this.availablePlaces.length == 0){
        break;
      }
    }
    this.places[subscript] = "O";
    this.moveCounter++;
    this.whoseTurn = "X";
    this.checkMoveCount();
  }

  checkMoveCount():void{
    this.checkWinState();
    if (!this.gameWon){
      if (this.moveCounter == 9){
        this.displayMessage = 'Game Over';
      }
      else{
        if (this.autoPlay && this.whoseTurn == "O"){
            this.placeO();
        }
      }
    }
  }

  checkWinState():void{
    //check whether any of the sets of indices listed in threes contain all X's or all O's
    for (let threeset of this.threes){
      const items = [];
      for (let index of threeset){
        items.push(this.places[index]);
      }
      if (items[0]=="X" && items[1]=="X" && items[2]=="X"){
        this.gameWon = true;
        this.gameWinner = "X";
      }
      else if (items[0]=="O" && items[1]=="O" && items[2]=="O"){
        this.gameWon = true;
        this.gameWinner = "O";
      }
    }

    if (this.gameWon){
      this.displayMessage = "Game Won By " + this.gameWinner; 
    }
  }
}
