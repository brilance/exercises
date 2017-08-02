import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router }            from '@angular/router';
import { HttpModule } from '@angular/http';
import { Location }                 from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms'

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';
import { ActivatedRouteStub } from './router-stubs';

const heroServiceStub = {
    update(hero:Hero){
        return Promise.resolve(hero);
    },
    getHero(id:number){
        if (id === 1){
            let h1 = new Hero();
            h1.id = 1;
            h1.name = "Bob Hero";
            return Promise.resolve(h1);
        }
    },
};

const locationStub = {
    back(){
        return true;
    }
}

describe('HeroDetailComponent', () => {
    let comp:    HeroDetailComponent;
    let fixture: ComponentFixture<HeroDetailComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;
    let heroService:HeroService;
    let locationSpy:any;
    let updateSpy:any;
    let routeStub:ActivatedRouteStub;

    // async beforeEach
    beforeEach(async(() => {
        locationSpy = spyOn(locationStub, 'back');
        updateSpy = spyOn(heroServiceStub, 'update').and.callThrough();
        routeStub = new ActivatedRouteStub();
        TestBed.configureTestingModule({
            declarations: [ HeroDetailComponent ], // declare the test component
            imports: [FormsModule],
            schemas: [],
            providers: [{provide: HeroService, useValue: heroServiceStub},{provide: ActivatedRoute, useValue: routeStub}, {provide:Location, useValue:locationStub}]
        })
        .compileComponents();  // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HeroDetailComponent);
        comp = fixture.componentInstance; // DashboardComponent test instance
    });

    describe('goBack', ()=>{
        it('should call location.back()', ()=>{
            comp.goBack();
            expect(locationSpy).toHaveBeenCalled();
        });
    });

    describe('ngOnInit', () => {
        it('should set this.hero to the hero with id 1', fakeAsync(() => {
            routeStub.testParamMap = {id:1};
            fixture.detectChanges();
            tick();                  // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.hero.id).toEqual(1);
            expect(comp.hero.name).toEqual("Bob Hero");
        }));
    });

    describe('save', ()=> {
        it('should call heroService.update and location.back', fakeAsync(() => {
            routeStub.testParamMap = {id:1};
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            comp.save();
            fixture.detectChanges();
            tick();
            fixture.detectChanges();

            expect(updateSpy).toHaveBeenCalled();
            expect(locationSpy).toHaveBeenCalled();
        }));
    });
});
