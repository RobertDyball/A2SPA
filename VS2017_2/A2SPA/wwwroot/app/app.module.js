"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_1 = require("./app.routing");
var common_1 = require("@angular/common");
var app_component_1 = require("./app.component");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ErrorMessageService_1 = require("./services/ErrorMessageService");
var sampleData_service_1 = require("./services/sampleData.service");
var auth_service_1 = require("./security/auth.service");
var auth_guard_service_1 = require("./security/auth-guard.service");
var ngx_toastr_1 = require("ngx-toastr");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
require("./rxjs-operators");
var angular2_highcharts_1 = require("angular2-highcharts");
var HighchartsService_1 = require("angular2-highcharts/dist/HighchartsService");
function highchartsFactory() {
    var hc = require('highcharts');
    var dd = require('highcharts/modules/drilldown');
    dd(hc);
    return hc;
}
exports.highchartsFactory = highchartsFactory;
// enableProdMode();
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [ng_bootstrap_1.NgbModule.forRoot(), angular2_highcharts_1.ChartModule, animations_1.BrowserAnimationsModule, platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, ngx_toastr_1.ToastrModule.forRoot(), app_routing_1.routing],
            declarations: [app_component_1.AppComponent, app_routing_1.routedComponents],
            providers: [sampleData_service_1.SampleDataService,
                ErrorMessageService_1.ErrorMessageService,
                auth_service_1.AuthService,
                auth_guard_service_1.AuthGuard,
                { provide: common_1.APP_BASE_HREF, useValue: '/a2spa' },
                platform_browser_1.Title,
                { provide: HighchartsService_1.HighchartsStatic, useFactory: highchartsFactory }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map