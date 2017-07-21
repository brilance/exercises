"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var http_1 = require("@angular/common/http");
var todos_factory_1 = require("./todos-factory");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpClientModule, animations_1.BrowserAnimationsModule, material_1.MdNativeDateModule, material_1.MdDatepickerModule, material_1.MdInputModule],
            declarations: [app_component_1.AppComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [todos_factory_1.TodoFactory]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map