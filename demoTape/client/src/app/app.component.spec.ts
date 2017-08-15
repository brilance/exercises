import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { madonna } from './testing/madonna';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Demo Tape'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Demo Tape');
  }));

  describe('setArtist', () => {
    it('should set the artist to the given artist', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.artist).toBeUndefined();
      expect(app.iframeURI).toBeUndefined();
      app.setArtist(madonna);
      expect(app.artist).toBe(madonna);
      expect(app.iframeURI).toBe(`https://open.spotify.com/embed?uri=${app.artist.uri}`);
    }));
  });
});
