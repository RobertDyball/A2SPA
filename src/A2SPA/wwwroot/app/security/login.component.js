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
var auth_service_1 = require("./auth.service");
var LoginComponent = (function () {
    function LoginComponent(router, titleService, http, authService) {
        this.router = router;
        this.titleService = titleService;
        this.http = http;
        this.authService = authService;
    }
    LoginComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    LoginComponent.prototype.login = function (event, email, password) {
        var _this = this;
        event.preventDefault();
        var body = 'username=' + email + '&password=' + password + '&grant_type=password';
        this.http.post('/connect/token', body, { headers: this.authService.contentHeaders() })
            .subscribe(function (response) {
            _this.authService.login(response.json());
            _this.router.navigate(['/employee']);
        }, function (error) {
            alert(error.text());
            console.log(error.text());
        });
    };
    LoginComponent.prototype.signup = function (event) {
        event.preventDefault();
        this.router.navigate(['/signup']);
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: '/partial/loginComponent'
    }),
    __metadata("design:paramtypes", [router_1.Router, platform_browser_1.Title, http_1.Http, auth_service_1.AuthService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map