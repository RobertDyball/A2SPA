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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var authService_1 = require("./security/authService");
var ChangePasswordViewModel_1 = require("./models/ChangePasswordViewModel");
var ngx_toastr_1 = require("ngx-toastr");
var ChangePasswordComponent = (function () {
    function ChangePasswordComponent(router, titleService, http, authService, toastrService) {
        this.router = router;
        this.titleService = titleService;
        this.http = http;
        this.authService = authService;
        this.toastrService = toastrService;
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.changePasswordViewModel = new ChangePasswordViewModel_1.ChangePasswordViewModel();
    };
    ChangePasswordComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    ChangePasswordComponent.prototype.showSuccess = function (title, message) {
        this.toastrService.success(message, title);
    };
    ChangePasswordComponent.prototype.showError = function (title, message) {
        this.toastrService.error(message, title);
    };
    ChangePasswordComponent.prototype.changePassword = function (event) {
        var _this = this;
        event.preventDefault();
        var body = { 'oldPassword': this.changePasswordViewModel.oldPassword, 'newPassword': this.changePasswordViewModel.newPassword, 'confirmPassword': this.changePasswordViewModel.confirmPassword };
        this.http.post('manage/changePassword', JSON.stringify(body), { headers: this.authService.authJsonHeaders() })
            .subscribe(function (response) {
            if (response.status == 200) {
                _this.showSuccess('Password changed', response.json());
                _this.router.navigate(['manage']);
            }
            else {
                _this.showError('Password not changed', response.json());
            }
        }, function (error) {
            // TODO: parse error messages, generate toast popups
            // {"Email":["The Email field is required.","The Email field is not a valid e-mail address."],"Password":["The Password field is required.","The Password must be at least 6 characters long."]}
            alert(error.text());
            console.log(error.text());
        });
    };
    return ChangePasswordComponent;
}());
ChangePasswordComponent = __decorate([
    core_1.Component({
        selector: 'register',
        templateUrl: 'partial/changePasswordComponent'
    }),
    __metadata("design:paramtypes", [router_1.Router, platform_browser_1.Title, http_1.Http, authService_1.AuthService, ngx_toastr_1.ToastrService])
], ChangePasswordComponent);
exports.ChangePasswordComponent = ChangePasswordComponent;
//# sourceMappingURL=changePassword.component.js.map