"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var auth_service_1 = require("./security/auth.service");
var AppComponent = (function () {
    function AppComponent(router, titleService, http, authService) {
        this.router = router;
        this.titleService = titleService;
        this.http = http;
        this.authService = authService;
        this.angularClientSideData = 'Angular';
    }
    // wrapper to the Angular title service.
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    // provide local page the user's logged in status (do we have a token or not)
    AppComponent.prototype.isLoggedIn = function () {
        return this.authService.loggedIn();
    };
    // tell the server that the user wants to logout; clears token from server, then calls auth.service to clear token locally in browser
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.http.get('/connect/logout', { headers: this.authService.authJsonHeaders() })
            .subscribe(function (response) {
            // clear token in browser
            _this.authService.logout();
            // return to 'home' page
            _this.router.navigate(['']);
        }, function (error) {
            // failed; TODO: add some nice toast / error handling
            alert(error.text());
            console.log(error.text());
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/partial/appComponent'
    }),
    __metadata("design:paramtypes", [router_1.Router, platform_browser_1.Title, http_1.Http, auth_service_1.AuthService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map