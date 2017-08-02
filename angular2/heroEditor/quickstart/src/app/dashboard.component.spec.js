"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/core/testing");
var testing_3 = require("@angular/router/testing");
var core_1 = require("@angular/core");
var hero_service_1 = require("./hero.service");
var dashboard_component_1 = require("./dashboard.component");
var hero_1 = require("./hero");
var heroServiceStub = {
    getHeroes: function () {
        var h1 = new hero_1.Hero();
        h1.id = 1;
        h1.name = "Hero Bob";
        var h2 = new hero_1.Hero();
        h2.id = 2;
        h2.name = "Hero Jill";
        var h3 = new hero_1.Hero();
        h3.id = 3;
        h3.name = "Hero Jamie";
        var heroArray = [h1, h2, h3];
        return Promise.resolve(heroArray);
    }
};
describe('DashboardComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var heroService;
    // async beforeEach
    beforeEach(testing_2.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [dashboard_component_1.DashboardComponent],
            imports: [testing_3.RouterTestingModule],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [{ provide: hero_service_1.HeroService, useValue: heroServiceStub }]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(dashboard_component_1.DashboardComponent);
        comp = fixture.componentInstance; // DashboardComponent test instance
        heroService = fixture.debugElement.injector.get(hero_service_1.HeroService);
        // query for the <h3> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h3'));
        el = de.nativeElement;
    });
    it('should display the text "top heroes"', function () {
        fixture.detectChanges();
        expect(el.textContent).toContain('Top Heroes');
    });
    it('this.heroes length equals 2', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testing_1.tick(); // wait for promise to resolve
        fixture.detectChanges();
        expect(comp.heroes.length).toEqual(2);
    }));
    it('should display 2 heroes', testing_1.fakeAsync(function () {
        fixture.detectChanges();
        testing_1.tick(); // wait for promise to resolve
        fixture.detectChanges();
        var de = fixture.debugElement.queryAll(platform_browser_1.By.css('.hero'));
        expect(de.length).toEqual(2);
    }));
});
//# sourceMappingURL=dashboard.component.spec.js.map