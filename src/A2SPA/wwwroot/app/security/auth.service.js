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
var http_1 = require("@angular/http");
var AuthService = (function () {
    function AuthService() {
    }
    // for requesting secure data using json
    AuthService.prototype.authJsonHeaders = function () {
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        header.append('Authorization', 'Bearer ' + sessionStorage.getItem('bearer_token'));
        return header;
    };
    // for requesting secure data from a form post
    AuthService.prototype.authFormHeaders = function () {
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Accept', 'application/json');
        header.append('Authorization', 'Bearer ' + sessionStorage.getItem('bearer_token'));
        return header;
    };
    // for requesting unsecured data using json
    AuthService.prototype.jsonHeaders = function () {
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        return header;
    };
    // for requesting unsecured data using form post
    AuthService.prototype.contentHeaders = function () {
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Accept', 'application/json');
        return header;
    };
    // After a successful login, save token data into session storage
    // note: use "localStorage" for persistent, browser-wide logins; "sessionStorage" for per-session storage.
    AuthService.prototype.login = function (responseData) {
        var access_token = responseData.access_token;
        var expires_in = responseData.expires_in;
        sessionStorage.setItem('access_token', access_token);
        sessionStorage.setItem('bearer_token', access_token);
        // TODO: implement meaningful refresh, handle expiry 
        sessionStorage.setItem('expires_in', expires_in.toString());
    };
    // called when logging out user; clears tokens from browser
    AuthService.prototype.logout = function () {
        //localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('bearer_token');
        sessionStorage.removeItem('expires_in');
    };
    // simple check of logged in status: if there is a token, we're (probably) logged in.
    // ideally we check status and check token has not expired (server will back us up, if this not done, but it could be cleaner)
    AuthService.prototype.loggedIn = function () {
        return !!sessionStorage.getItem('bearer_token');
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map