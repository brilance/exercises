"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var hero_1 = require("./hero");
var heroes_component_1 = require("./heroes.component");
var hero_service_1 = require("./hero.service");
var heroServiceStub = {
    getHeroes: function () {
        var h1 = new hero_1.Hero();
        h1.id = 1;
        h1.name = "Bob Hero";
        var h2 = new hero_1.Hero();
        h2.id = 2;
        h2.name = "Jill Hero";
        var heros = [h1, h2];
        return Promise.resolve(heros);
    },
    create: function (name) {
        var h3 = new hero_1.Hero();
        h3.id = 3;
        h3.name = name;
        return Promise.resolve(h3);
    },
    delete: function (id) {
        return Promise.resolve();
    }
};
var RouterStub = {
    navigate: function (url) { return url; }
};
describe('HeroesComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var heroService;
    var navSpy;
    // async beforeEach
    beforeEach(testing_2.async(function () {
        navSpy = spyOn(RouterStub, 'navigate');
        testing_1.TestBed.configureTestingModule({
            declarations: [heroes_component_1.HeroesComponent],
            imports: [http_1.HttpModule],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [{ provide: hero_service_1.HeroService, useValue: heroServiceStub }, { provide: router_1.Router, useValue: RouterStub }]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(heroes_component_1.HeroesComponent);
        comp = fixture.componentInstance; // DashboardComponent test instance
        heroService = fixture.debugElement.injector.get(hero_service_1.HeroService);
        // query for the <h3> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h2'));
        el = de.nativeElement;
    });
    it('should display "My Heroes"', function () {
        expect(el.textContent).toContain('My Heroes');
    });
    describe('getHeroes', function () {
        it('should return Bob Hero and Jill Hero', testing_2.async(function () {
            fixture.detectChanges();
            comp.getHeroes();
            fixture.whenStable().then(function () {
                fixture.detectChanges(); // update view with quote
                expect(comp.heroes.length).toEqual(2);
                expect(comp.heroes[0].id).toEqual(1);
                expect(comp.heroes[0].name).toEqual("Bob Hero");
                expect(comp.heroes[1].id).toEqual(2);
                expect(comp.heroes[1].name).toEqual("Jill Hero");
            });
        }));
    });
    describe('onSelect', function () {
        it('should set this.selectedHero to Bob Hero', testing_2.async(function () {
            var theHero = new hero_1.Hero();
            theHero.id = 1;
            theHero.name = 'Bob Hero';
            comp.onSelect(theHero);
            expect(comp.selectedHero.id).toEqual(1);
            expect(comp.selectedHero.name).toEqual("Bob Hero");
        }));
    });
    describe('add', function () {
        beforeEach(testing_2.async(function () {
            comp.getHeroes();
        }));
        it('should add Jane Hero to heroes array', testing_1.fakeAsync(function () {
            fixture.detectChanges();
            comp.add('Jane Hero');
            fixture.detectChanges();
            testing_1.tick(); // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.heroes.length).toEqual(3);
            expect(comp.heroes[2].name).toEqual("Jane Hero");
        }));
        it('should set selectedHero to null', testing_1.fakeAsync(function () {
            fixture.detectChanges();
            comp.add('Jane Hero');
            fixture.detectChanges();
            testing_1.tick(); // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.selectedHero).toBeNull();
        }));
    });
    describe('delete', function () {
        beforeEach(testing_2.async(function () {
            comp.getHeroes();
        }));
        it('should go from two heroes to one after deleting', testing_1.fakeAsync(function () {
            fixture.detectChanges();
            expect(comp.heroes.length).toEqual(2);
            comp.delete(comp.heroes[0]);
            fixture.detectChanges();
            testing_1.tick(); // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.heroes.length).toEqual(1);
        }));
        it('should set selectedHero to null if selectedHero is deleted', testing_1.fakeAsync(function () {
            fixture.detectChanges();
            comp.onSelect(comp.heroes[0]);
            comp.delete(comp.heroes[0]);
            fixture.detectChanges();
            testing_1.tick(); // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.selectedHero).toBeNull();
        }));
    });
    describe('goToDetail', function () {
        beforeEach(testing_2.async(function () {
            comp.getHeroes();
        }));
        it('should call Router.navigate with /detail/1', function () {
            fixture.detectChanges();
            comp.onSelect(comp.heroes[0]);
            comp.gotoDetail();
            expect(navSpy).toHaveBeenCalledWith(['/detail', comp.heroes[0].id]);
        });
    });
});
//# sourceMappingURL=heroes.spec.js.map