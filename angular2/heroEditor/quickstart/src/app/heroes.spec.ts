import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router }            from '@angular/router';
import { HttpModule } from '@angular/http';

import { Hero } from './hero';
import { HeroesComponent } from './heroes.component';
import { HeroService } from './hero.service';

const heroServiceStub = {
    getHeroes(){
        let h1 = new Hero();
        h1.id = 1;
        h1.name = "Bob Hero";
        let h2 = new Hero();
        h2.id = 2;
        h2.name = "Jill Hero";
        let heros = [h1, h2];
        return Promise.resolve(heros);
    },
    create(name:string){
        let h3 = new Hero();
        h3.id = 3;
        h3.name = name;
        return Promise.resolve(h3);
    },
    delete(id:number){
        return Promise.resolve();
    }
};

const RouterStub = {
    navigate(url: string) { return url; }
}

describe('HeroesComponent', () => {
    let comp:    HeroesComponent;
    let fixture: ComponentFixture<HeroesComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let heroService:HeroService;
    let navSpy:  any;

    // async beforeEach
    beforeEach(async(() => {
        navSpy = spyOn(RouterStub, 'navigate');

        TestBed.configureTestingModule({
            declarations: [ HeroesComponent ], // declare the test component
            imports: [HttpModule],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [{provide: HeroService, useValue: heroServiceStub},{provide: Router, useValue: RouterStub}]
        })
        .compileComponents();  // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroesComponent);

        comp = fixture.componentInstance; // DashboardComponent test instance
       
        heroService = fixture.debugElement.injector.get(HeroService);

        // query for the <h3> by CSS element selector
        de = fixture.debugElement.query(By.css('h2'));
        el = de.nativeElement;
    });

    it('should display "My Heroes"', () => {
        expect(el.textContent).toContain('My Heroes');
    });

    describe('getHeroes', () => {
         it('should return Bob Hero and Jill Hero', async(() => {
            fixture.detectChanges();
            comp.getHeroes();

            fixture.whenStable().then(() => { // wait for async getQuote
                fixture.detectChanges();        // update view with quote
                expect(comp.heroes.length).toEqual(2);
                expect(comp.heroes[0].id).toEqual(1);
                expect(comp.heroes[0].name).toEqual("Bob Hero");
                expect(comp.heroes[1].id).toEqual(2);
                expect(comp.heroes[1].name).toEqual("Jill Hero");
            });
        }));
    });

    describe('onSelect', () => {
        it('should set this.selectedHero to Bob Hero', async(() => {
            let theHero = new Hero();
            theHero.id = 1;
            theHero.name = 'Bob Hero';
            comp.onSelect(theHero);
            expect(comp.selectedHero.id).toEqual(1);
            expect(comp.selectedHero.name).toEqual("Bob Hero");
        }));
    });

    describe('add', () => {
        beforeEach(async(() => {
            comp.getHeroes();
        }));

        it('should add Jane Hero to heroes array', fakeAsync(() => {
            fixture.detectChanges();
            comp.add('Jane Hero');
            fixture.detectChanges();
            tick();                  // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.heroes.length).toEqual(3);
            expect(comp.heroes[2].name).toEqual("Jane Hero");
        }));

        it('should set selectedHero to null', fakeAsync(() => {
            fixture.detectChanges();
            comp.add('Jane Hero');
            fixture.detectChanges();
            tick();                  // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.selectedHero).toBeNull();
        }));
    });

    describe('delete', () => {
        beforeEach(async(() => {
            comp.getHeroes();
        }));

        it('should go from two heroes to one after deleting', fakeAsync(() => {
            fixture.detectChanges();
            expect(comp.heroes.length).toEqual(2);
            comp.delete(comp.heroes[0]);
            fixture.detectChanges();
            tick();                  // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.heroes.length).toEqual(1);
        }));

        it('should set selectedHero to null if selectedHero is deleted', fakeAsync(() => {
            fixture.detectChanges();
            comp.onSelect(comp.heroes[0]);
            comp.delete(comp.heroes[0]);
            fixture.detectChanges();
            tick();                  // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.selectedHero).toBeNull();
        }));
    });

    describe('goToDetail', () => {
        beforeEach(async(() => {
            comp.getHeroes();
        }));

        it('should call Router.navigate with /detail/1', ()=>{
            fixture.detectChanges();
            comp.onSelect(comp.heroes[0]);
            comp.gotoDetail();
            expect(navSpy).toHaveBeenCalledWith(['/detail', comp.heroes[0].id]);
        });
    });
});
 