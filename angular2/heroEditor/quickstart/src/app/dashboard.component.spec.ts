import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        let heroArray = [{id:1, name:"Hero Bob"}, {id:2, name:"Hero Jill"}];
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
            providers:    [{provide: HeroService, useValue: heroServiceStub}]
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

    it('should display two heroes', () => {
        let elems = fixture.debugElement.queryAll(By.css('.grid'));
        fixture.detectChanges();
        expect(elems.length).toEqual(2);
    });
});