import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Septa Map'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Septa Map');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Septa Map');
  }));

  describe('lookupRouteKey', () =>{
      it('should set the route variable', fakeAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        const input:HTMLElement = document.getElementById('route-number');
        input.setAttribute('value', '101');
        const event = new KeyboardEvent("keyup",{
            "key": "Enter"
        });
        input.dispatchEvent(event);
        tick(10);
        expect(app.routeNum).toEqual(101);
    }));
  });

  describe('lookupRouteBtn', () =>{
    it('should set the route variable', fakeAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      const input:HTMLElement = document.getElementById('route-number');
      input.setAttribute('value', '101');
      const btn:HTMLElement = document.getElementById('route-number-btn');
      btn.click();
      tick(10);
      expect(app.routeNum).toEqual(101);
    }));
  });
});
