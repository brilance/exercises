import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SafePipe } from '../safe.pipe';
import { WebplayerComponent } from './webplayer.component';

describe('WebplayerComponent', () => {
  let component: WebplayerComponent;
  let fixture: ComponentFixture<WebplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebplayerComponent,SafePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
