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
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AboutComponent = (function () {
    function AboutComponent(sampleDataService) {
        this.sampleDataService = sampleDataService;
        this.testData = [];
        this.testDataItem = null;
        this.deletedOk = false;
    }
    AboutComponent.prototype.ngOnInit = function () {
        this.getTestData();
    };
    AboutComponent.prototype.getTestData = function () {
        var _this = this;
        this.sampleDataService.getSampleData()
            .subscribe(function (data) { return _this.testData = data; });
        //error => this.errorMessage = error);
    };
    AboutComponent.prototype.deleteRecord = function (itemToDelete, event) {
        var _this = this;
        event.preventDefault();
        this.sampleDataService.deleteRecord(itemToDelete)
            .subscribe(function (status) {
            _this.getTestData();
            //                if (status) {
            //                    //this.router.navigate(['/customers']);
            ////                    this.getTestData();
            //                    console.log(JSON.stringify(status));
            //                }
            //                else {
            //                    this.getTestData();
            //                    this.errorMessage = 'Unable to delete customer';
            //                }
        }, function (error) {
            _this.errorMessage = error;
            console.log(error);
        });
    };
    //deleteRecord(itemToDelete: TestData, event: any) {
    //    this.deletedOk = false;
    //    event.preventDefault();
    //    this.sampleDataService.deleteRecord(itemToDelete);
    //    //.map((data: boolean) => { this.deletedOk = data },
    //    //    ((error:any) => this.errorMessage = error));
    //    //console.log('delete record ' + itemToDelete.id);
    //}
    AboutComponent.prototype.addTestData = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.testData) {
            return;
        }
        this.sampleDataService.addSampleData(this.testDataItem)
            .map(function (data) { return _this.testDataItem = data; });
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'my-about',
        templateUrl: '/partial/aboutComponent'
    }),
    __metadata("design:paramtypes", [sampleData_service_1.SampleDataService])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map