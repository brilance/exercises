import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router }            from '@angular/router';
import { HttpModule } from '@angular/http';


import { HeroSearchService } from './hero-search.service';
import { HeroSearchComponent } from './hero-search.component';
import { Hero } from './hero';
import { Observable } from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

const HeroSearchServiceStub = {
    search(term:string){
        let h1 = new Hero();
        h1.id = 1;
        h1.name = "Bob Hero";
        let h2 = new Hero();
        h2.id = 2;
        h2.name = "Jill Hero";
        let heros = [h1, h2];
        return Observable.of(heros);
    }
}

const RouterStub = {
    navigate(url: string) { return url; }
}

describe('HeroSearchComponent', () => {
    let comp:    HeroSearchComponent;
    let fixture: ComponentFixture<HeroSearchComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let heroSearchService:HeroSearchService;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HeroSearchComponent ], // declare the test component
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{provide: HeroSearchService, useValue: HeroSearchServiceStub},{provide: Router, useValue: RouterStub}]
        })
        .compileComponents();  // compile template and css
    }));

    beforeEach(() => {
        
        fixture = TestBed.createComponent(HeroSearchComponent);

        comp = fixture.componentInstance; // DashboardComponent test instance
       
        heroSearchService = fixture.debugElement.injector.get(HeroSearchService);

        // query for the <h3> by CSS element selector
        de = fixture.debugElement.query(By.css('h4'));
        el = de.nativeElement;
    }); 

    it('should display "Hero Search"', () => {
        expect(el.textContent).toContain('Hero Search');
    });

    it('should return two heroes', async(() => {
        fixture.detectChanges();
        comp.heroes.subscribe((heroes)=>{
            let hero1 = heroes[0];
            expect(hero1.id).toEqual(1);
            expect(hero1.name).toEqual("Bob Hero");
            let hero2 = heroes[1];
            expect(hero2.id).toEqual(2);
            expect(hero2.name).toEqual("Jill Hero");
        });
        comp.search('Hero');
    }));
});