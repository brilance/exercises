"use strict";
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var hero_1 = require("./hero");
var hero_service_1 = require("./hero.service");
var hero_detail_component_1 = require("./hero-detail.component");
var router_stubs_1 = require("./router-stubs");
var heroServiceStub = {
    update: function (hero) {
        return Promise.resolve(hero);
    },
    getHero: function (id) {
        if (id === 1) {
            var h1 = new hero_1.Hero();
            h1.id = 1;
            h1.name = "Bob Hero";
            return Promise.resolve(h1);
        }
    },
};
var locationStub = {
    back: function () {
        return true;
    }
};
describe('HeroDetailComponent', function () {
    var comp;
    var fixture;
    var de;
    var el;
    var heroService;
    var locationSpy;
    var updateSpy;
    var routeStub;
    // async beforeEach
    beforeEach(testing_2.async(function () {
        locationSpy = spyOn(locationStub, 'back');
        updateSpy = spyOn(heroServiceStub, 'update').and.callThrough();
        routeStub = new router_stubs_1.ActivatedRouteStub();
        testing_1.TestBed.configureTestingModule({
            declarations: [hero_detail_component_1.HeroDetailComponent],
            imports: [forms_1.FormsModule],
            schemas: [],
            providers: [{ provide: hero_service_1.HeroService, useValue: heroServiceStub }, { provide: router_1.ActivatedRoute, useValue: routeStub }, { provide: common_1.Location, useValue: locationStub }]
        })
            .compileComponents(); // compile template and css
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(hero_detail_component_1.HeroDetailComponent);
        comp = fixture.componentInstance; // DashboardComponent test instance
    });
    describe('goBack', function () {
        it('should call location.back()', function () {
            comp.goBack();
            expect(locationSpy).toHaveBeenCalled();
        });
    });
    describe('ngOnInit', function () {
        it('should set this.hero to the hero with id 1', testing_1.fakeAsync(function () {
            routeStub.testParamMap = { id: 1 };
            fixture.detectChanges();
            testing_1.tick(); // wait for promise to resolve
            fixture.detectChanges();
            expect(comp.hero.id).toEqual(1);
            expect(comp.hero.name).toEqual("Bob Hero");
        }));
    });
    describe('save', function () {
        it('should call heroService.update and location.back', testing_1.fakeAsync(function () {
            routeStub.testParamMap = { id: 1 };
            fixture.detectChanges();
            testing_1.tick();
            fixture.detectChanges();
            comp.save();
            fixture.detectChanges();
            testing_1.tick();
            fixture.detectChanges();
            expect(updateSpy).toHaveBeenCalled();
            expect(locationSpy).toHaveBeenCalled();
        }));
    });
});
//# sourceMappingURL=hero-detail.component.spec.js.map