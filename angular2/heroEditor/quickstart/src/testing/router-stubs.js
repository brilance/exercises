"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var ActivatedRouteStub = (function () {
    function ActivatedRouteStub() {
        // ActivatedRoute.paramMap is Observable
        this.subject = new BehaviorSubject_1.BehaviorSubject(router_1.convertToParamMap(this.testParamMap));
        this.paramMap = this.subject.asObservable();
    }
    Object.defineProperty(ActivatedRouteStub.prototype, "testParamMap", {
        get: function () { return this._testParamMap; },
        set: function (params) {
            this._testParamMap = router_1.convertToParamMap(params);
            this.subject.next(this._testParamMap);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivatedRouteStub.prototype, "snapshot", {
        // ActivatedRoute.snapshot.paramMap
        get: function () {
            return { paramMap: this.testParamMap };
        },
        enumerable: true,
        configurable: true
    });
    return ActivatedRouteStub;
}());
ActivatedRouteStub = __decorate([
    core_1.Injectable()
], ActivatedRouteStub);
exports.ActivatedRouteStub = ActivatedRouteStub;
//# sourceMappingURL=router-stubs.js.map