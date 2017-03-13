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
var ngx_toastr_1 = require("ngx-toastr");
var ContactComponent = (function () {
    // this is not meant to be secured; demonstrating a component that is open to anonymous users to access
    function ContactComponent(toastrService) {
        this.toastrService = toastrService;
    }
    ContactComponent.prototype.showSuccess = function () {
        this.toastrService.success('Hello world!', 'Toastr fun!');
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        selector: 'my-contact',
        templateUrl: '/partial/contactComponent'
    }),
    __metadata("design:paramtypes", [ngx_toastr_1.ToastrService])
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map