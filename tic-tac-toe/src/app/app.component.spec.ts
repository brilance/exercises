import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;;
  let comp:AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance; // DashboardComponent test instance
  });

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('placeX', () => {
    it('should place an X at the designated position and increment moveCounter', ()=>{
      comp.moveCounter = 0;
      comp.autoPlay = false;
      expect(comp.places[8]).toBeNull()
      comp.placeX(8);
      expect(comp.places[8]).toBe("X");
      expect(comp.moveCounter).toEqual(1);
    });

    it('should do nothing if called with a subscript beyond the array length', ()=>{
      comp.moveCounter = 0;
      expect(comp.places[9]).toBeUndefined()
      comp.placeX(9);
      expect(comp.places[9]).toBeUndefined();
      expect(comp.moveCounter).toEqual(0);
    });
  });

  describe('moveCounter', () => {
    it('should do nothing if the move count is not 9', ()=>{
      comp.moveCounter = 0;
      comp.autoPlay = false;
      comp.checkMoveCount();
      expect(comp.displayMessage).toEqual('');
    });

    it('should change the display message if the move count is 9 and nobody won', ()=>{
      comp.moveCounter = 9;
      comp.checkMoveCount();
      expect(comp.displayMessage).toEqual('Game Over');
    });

    describe('checkWinState', () => {
      it('should report a horizontal win state', ()=>{
        comp.places = ['X','X','X',null,null,null,null,null,null];
        comp.checkWinState();
        expect(comp.gameWon).toBeTruthy();
        expect(comp.displayMessage).toBe("Game Won By X");
      });

      it('should report a vertical win state', ()=>{
        comp.places = ['O',null,null,'O',null,null,'O',null,null];
        comp.checkWinState();
        expect(comp.gameWon).toBeTruthy();
        expect(comp.displayMessage).toBe("Game Won By O");
      });

      it('should report a diagonal win state', ()=>{
        comp.places = ['X',null,null,null,'X',null,null,null,'X'];
        comp.checkWinState();
        expect(comp.gameWon).toBeTruthy();
        expect(comp.displayMessage).toBe("Game Won By X");
      });

      it('should not report a mixed state as a win', ()=>{
        comp.places = ['X','O','X',null,null,null,null,null,null];
        comp.checkWinState();
        expect(comp.gameWon).toBeFalsy();
        expect(comp.displayMessage).toBe("");
      });
    });

    describe('placeO', () => {
      it('should place an O at a random position', ()=>{
        fixture.detectChanges();
        comp.moveCounter = 0;
        comp.autoPlay = false;
        comp.places = [null,null,null,null,null,null,null,null,null];
        comp.placeO();
        expect(comp.places).toContain("O");
        expect(comp.moveCounter).toEqual(1);
      });

      it('should place an O in the last remaining position', ()=>{
        fixture.detectChanges();
        comp.moveCounter = 8;
        comp.places = ["X",null,"X","X","X","X","X","X","X"];
        comp.placeO();
        expect(comp.places[1]).toEqual("O");
        expect(comp.moveCounter).toEqual(9);
        expect(comp.gameWon).toBeTruthy();
      });
    });
  });
});
