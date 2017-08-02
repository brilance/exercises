import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from './hero-search.component';
import { Hero } from './hero';


let heroServiceStub = {
    getHeroes(){
        let h1 = new Hero();
        h1.id = 1;
        h1.name = "Hero Bob";
        let h2 = new Hero();
        h2.id = 2;
        h2.name = "Hero Jill";
        let h3 = new Hero();
        h3.id = 3;
        h3.name = "Hero Jamie";
        let heroArray = [h1, h2, h3];
        return Promise.resolve(heroArray);
    }
}

describe('DashboardComponent', () => {
    let comp:    DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let heroService:HeroService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DashboardComponent ], // declare the test component
            imports: [RouterTestingModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{provide: HeroService, useValue: heroServiceStub}]
        })
        .compileComponents();  // compile template and css
    }));

    beforeEach(() => {
        
        fixture = TestBed.createComponent(DashboardComponent);

        comp = fixture.componentInstance; // DashboardComponent test instance

        heroService = fixture.debugElement.injector.get(HeroService);
        
        // query for the <h3> by CSS element selector
        de = fixture.debugElement.query(By.css('h3'));
        el = de.nativeElement;
    });

    it('should display the text "top heroes"', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain('Top Heroes');
    });

    it('this.heroes length equals 2', fakeAsync(() => {
        fixture.detectChanges();
        tick();                  // wait for promise to resolve
        fixture.detectChanges();
        expect(comp.heroes.length).toEqual(2);
    }));

    it('should display 2 heroes', fakeAsync(() => {
        fixture.detectChanges();
        tick();                  // wait for promise to resolve
        fixture.detectChanges();
        let de = fixture.debugElement.queryAll(By.css('.hero'));
        expect(de.length).toEqual(2);
    }));
});