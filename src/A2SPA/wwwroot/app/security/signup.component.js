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
var SignupComponent = (function () {
    function SignupComponent(router, titleService, http, authService) {
        this.router = router;
        this.titleService = titleService;
        this.http = http;
        this.authService = authService;
    }
    SignupComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    SignupComponent.prototype.signup = function (event, email, password, verifyPassword) {
        var _this = this;
        event.preventDefault();
        var body = { 'email': email, 'password': password, 'verifyPassword': verifyPassword };
        this.http.post('/Account/Register', JSON.stringify(body), { headers: this.authService.jsonHeaders() })
            .subscribe(function (response) {
            if (response.status == 200) {
                _this.router.navigate(['/login']);
            }
            else {
                alert(response.json().error);
                console.log(response.json().error);
            }
        }, function (error) {
            // todo: parse error messages, generate toast popups
            // {"Email":["The Email field is required.","The Email field is not a valid e-mail address."],"Password":["The Password field is required.","The Password must be at least 6 characters long."]}
            alert(error.text());
            console.log(error.text());
        });
    };
    SignupComponent.prototype.login = function (event) {
        event.preventDefault();
        this.router.navigate(['/login']);
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        selector: 'signup',
        templateUrl: '/partial/signupComponent'
    }),
    __metadata("design:paramtypes", [router_1.Router, platform_browser_1.Title, http_1.Http, auth_service_1.AuthService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map