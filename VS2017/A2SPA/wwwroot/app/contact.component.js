"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/debounceTime");
var ContactComponent = (function () {
    function ContactComponent() {
        this._success = new Subject_1.Subject();
        this.staticAlertClosed = false;
    }
    ContactComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.debounceTime(5000).subscribe(function () { return _this.successMessage = null; });
    };
    ContactComponent.prototype.changeSuccessMessage = function () {
        this._success.next(new Date() + " - Message successfully changed.");
    };
    // this is not meant to be secured; demonstrating a component that is open to anonymous users to access
    // TODO: restore toasts....    constructor(private toastrService: NgbdAlertSelfclosing) { }
    ContactComponent.prototype.showSuccess = function () {
        // this.toastrService.success('Hello world!', 'Toastr fun!');
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        selector: 'my-contact',
        templateUrl: 'partial/contactComponent'
    })
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map