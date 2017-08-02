"use strict";
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var testing_2 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var hero_search_service_1 = require("./hero-search.service");
var hero_search_component_1 = require("./hero-search.component");
var hero_1 = require("./hero");
var Observable_1 = require("rxjs/Observable");
var HeroSearchServiceStub = {
    search: function (term) {
        var h1 = new hero_1.Hero();
        h1.id = 1;
        h1.name = "Bob Hero";
        var h2 = new hero_1.Hero();
        h2.id = 2;
        h2.name = "Jill Hero";
        var heros = [h1, h2];
        return Observable_1.Observable.of(heros);
    }
};
var RouterStub = {
    navigate: function (url) { return url; }
};
describe('HeroSearchComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var heroSearchService;
    // async beforeEach
    beforeEach(testing_2.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [hero_search_component_1.HeroSearchComponent],
            imports: [http_1.HttpModule],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [{ provide: hero_search_service_1.HeroSearchService, useValue: HeroSearchServiceStub }, { provide: router_1.Router, useValue: RouterStub }]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(hero_search_component_1.HeroSearchComponent);
        comp = fixture.componentInstance; // DashboardComponent test instance
        heroSearchService = fixture.debugElement.injector.get(hero_search_service_1.HeroSearchService);
        // query for the <h3> by CSS element selector
        de = fixture.debugElement.query(platform_browser_1.By.css('h4'));
        el = de.nativeElement;
    });
    it('should display "Hero Search"', function () {
        expect(el.textContent).toContain('Hero Search');
    });
    it('should return two heroes', testing_2.async(function () {
        fixture.detectChanges();
        comp.heroes.subscribe(function (heroes) {
            var hero1 = heroes[0];
            expect(hero1.id).toEqual(1);
            expect(hero1.name).toEqual("Bob Hero");
            var hero2 = heroes[1];
            expect(hero2.id).toEqual(2);
            expect(hero2.name).toEqual("Jill Hero");
        });
        comp.search('Hero');
    }));
});
//# sourceMappingURL=hero-search.component.spec.js.map