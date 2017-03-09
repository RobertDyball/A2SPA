"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require("./app.routing");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var sampleData_service_1 = require("./services/sampleData.service");
var auth_service_1 = require("./security/auth.service");
var auth_guard_service_1 = require("./security/auth-guard.service");
var ngx_toastr_1 = require("ngx-toastr");
require("./rxjs-operators");
// enableProdMode();
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, ngx_toastr_1.ToastrModule.forRoot(), app_routing_1.routing],
        declarations: [app_component_1.AppComponent, app_routing_1.routedComponents],
        providers: [sampleData_service_1.SampleDataService,
            auth_service_1.AuthService,
            auth_guard_service_1.AuthGuard, platform_browser_1.Title, { provide: common_1.APP_BASE_HREF, useValue: '/' }],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map