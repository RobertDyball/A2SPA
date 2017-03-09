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
var testData_1 = require("./models/testData");
var ngx_toastr_1 = require("ngx-toastr");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var AboutComponent = (function () {
    function AboutComponent(sampleDataService, toastrService) {
        this.sampleDataService = sampleDataService;
        this.toastrService = toastrService;
        this.testDataList = [];
        this.selectedItem = null;
        this.testData = null;
    }
    AboutComponent.prototype.initTestData = function () {
        var newTestData = new testData_1.TestData();
        return newTestData;
    };
    AboutComponent.prototype.ngOnInit = function () {
        this.getTestData();
        this.testData = this.initTestData();
        this.selectedItem = null;
        this.tableMode = 'list';
    };
    AboutComponent.prototype.showSuccess = function (title, message) {
        this.toastrService.success(message, title);
    };
    AboutComponent.prototype.showError = function (title, message) {
        this.toastrService.error(message, title);
    };
    AboutComponent.prototype.getTestData = function () {
        var _this = this;
        this.sampleDataService.getSampleData()
            .subscribe(function (data) {
            _this.testDataList = data;
            if (_this.testDataList != null && _this.testDataList.length > 0) {
                _this.selectedItem = _this.testDataList[0];
            }
        }, function (error) {
            _this.showError('Error during Get', error);
            _this.errorMessage = error;
            console.log(error);
        });
    };
    AboutComponent.prototype.deleteRecord = function (itemToDelete, event) {
        var _this = this;
        event.preventDefault();
        this.sampleDataService.deleteRecord(itemToDelete)
            .subscribe(function (status) {
            if (status != null && status.statusCode == "200") {
                _this.showSuccess('Delete', status.value);
                _this.getTestData();
            }
            else {
                _this.showError('Delete', status.value);
            }
        }, function (error) {
            _this.showError('Delete', JSON.stringify(error));
        });
    };
    AboutComponent.prototype.changeMode = function (newMode, thisItem, event) {
        event.preventDefault();
        this.tableMode = newMode;
        if (this.testDataList.length == 0) {
            this.tableMode = 'add';
        }
        if (this.testDataList.length > 0) {
            if (this.testData == null)
                this.testData = this.initTestData();
        }
        switch (newMode) {
            case 'add':
                this.testData = this.initTestData();
                break;
            case 'edit':
                this.testData = thisItem;
                break;
            case 'list':
            default:
                {
                    this.testData = thisItem;
                }
                break;
        }
    };
    AboutComponent.prototype.selectCurrentItem = function (thisItem, event) {
        event.preventDefault();
        this.selectedItem = thisItem;
        this.testData = this.selectedItem;
    };
    AboutComponent.prototype.addTestData = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.testData) {
            return;
        }
        this.sampleDataService.addSampleData(this.testData)
            .subscribe(function (data) { _this.testData = data; _this.getTestData(); }, function (error) {
            _this.showError('Error during Add', error);
            _this.errorMessage = error;
            console.log(error);
        });
    };
    AboutComponent.prototype.editTestData = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.testData) {
            return;
        }
        this.sampleDataService.editSampleData(this.testData)
            .subscribe(function (data) { _this.testData = data; _this.getTestData(); }, function (error) {
            _this.showError('Error during Edit', error);
            _this.errorMessage = error;
            console.log(error);
        });
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'my-about',
        templateUrl: '/partial/aboutComponent'
    }),
    __metadata("design:paramtypes", [sampleData_service_1.SampleDataService, ngx_toastr_1.ToastrService])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map