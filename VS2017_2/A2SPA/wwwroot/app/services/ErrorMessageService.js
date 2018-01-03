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
var ngx_toastr_1 = require("ngx-toastr");
var ErrorMessageService = (function () {
    function ErrorMessageService(toastrService) {
        this.toastrService = toastrService;
    }
    ErrorMessageService.prototype.formattedErrorResponse = function (error) {
        var plural = (error.length > 0) ? 's' : '';
        var errorMessage = "Error" + plural + ": ";
        for (var i = 0; i < error.length; i++) {
            if (error.length > 0)
                errorMessage += "(" + (i + 1) + ") ";
            errorMessage += "field: " + error[0].memberNames + ", error: " + error[0].errorMessage;
            if (i < error.length)
                errorMessage += ", ";
        }
        return errorMessage;
    };
    ErrorMessageService.prototype.showSuccess = function (title, message) {
        this.toastrService.success(message, title);
    };
    ErrorMessageService.prototype.showError = function (title, message) {
        this.toastrService.error(message, title);
    };
    return ErrorMessageService;
}());
ErrorMessageService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ngx_toastr_1.ToastrService])
], ErrorMessageService);
exports.ErrorMessageService = ErrorMessageService;
//# sourceMappingURL=ErrorMessageService.js.map