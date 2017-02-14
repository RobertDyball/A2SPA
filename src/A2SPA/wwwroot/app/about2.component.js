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
var sampleData_service_1 = require("./services/sampleData.service");
var About2Component = (function () {
    function About2Component(sampleDataService) {
        this.sampleDataService = sampleDataService;
    }
    About2Component.prototype.ngOnInit = function () {
        this.getTestData();
    };
    About2Component.prototype.getTestData = function () {
        var _this = this;
        this.sampleDataService.getSampleData()
            .subscribe(function (data) { return _this.testData = data; }, function (error) { return _this.errorMessage = error; });
    };
    About2Component.prototype.addTestData = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.testData) {
            return;
        }
        this.sampleDataService.addSampleData(this.testData)
            .subscribe(function (data) { return _this.testData = data; }, function (error) { return _this.errorMessage = error; });
    };
    return About2Component;
}());
About2Component = __decorate([
    core_1.Component({
        selector: 'my-about2',
        templateUrl: '/areas/about/partial/about2Component'
    }),
    __metadata("design:paramtypes", [sampleData_service_1.SampleDataService])
], About2Component);
exports.About2Component = About2Component;
//# sourceMappingURL=about2.component.js.map