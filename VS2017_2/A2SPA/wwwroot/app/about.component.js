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
var sampleData_service_1 = require("./services/sampleData.service");
var testData_1 = require("./models/testData");
var ErrorMessageService_1 = require("./services/ErrorMessageService");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var moment = require("moment");
var AboutComponent = (function () {
    function AboutComponent(sampleDataService, errorMessageService) {
        this.sampleDataService = sampleDataService;
        this.errorMessageService = errorMessageService;
        this.testDataList = [];
        this.selectedItem = null;
        this.testData = null;
        this.tableMode = 'list';
        this.showForm = true;
        this.moment = moment;
        if (!this.testData) {
            this.testData = this.initTestData();
        }
    }
    AboutComponent.prototype.initTestData = function () {
        var newTestData = new testData_1.TestData();
        newTestData.id = null;
        newTestData.currency = null;
        newTestData.emailAddress = null;
        newTestData.password = null;
        newTestData.username = null;
        newTestData.dateOfBirth = new Date();
        newTestData.lastLoginDate = new Date();
        newTestData.sessionExpiryTime = new Date();
        return newTestData;
    };
    AboutComponent.prototype.ngOnInit = function () {
        this.tableMode = 'add';
        this.getTestData();
        this.testData = this.initTestData();
        this.selectedItem = this.initTestData();
    };
    AboutComponent.prototype.changeMode = function (newMode, thisItem, event) {
        event.preventDefault();
        this.tableMode = newMode;
        if (this.testDataList.length == 0 || this.testData == null) {
            this.tableMode = 'add';
        }
        switch (newMode) {
            case 'add':
                //this.testData = this.initTestData();
                this.testData = Object.assign({}, this.initTestData());
                //this.testData.dateOfBirth = new Date();
                //this.testData.lastLoginDate = new Date();
                //this.testData.sessionExpiryTime = new Date();
                break;
            case 'edit':
                this.testData = Object.assign({}, thisItem);
                this.testData.dateOfBirth = new Date(thisItem.dateOfBirth);
                this.testData.lastLoginDate = new Date(thisItem.lastLoginDate);
                this.testData.sessionExpiryTime = new Date(thisItem.sessionExpiryTime);
                break;
            case 'list':
            default:
                this.testData = Object.assign({}, thisItem);
                break;
        }
    };
    AboutComponent.prototype.selectCurrentItem = function (thisItem, event) {
        event.preventDefault();
        this.selectedItem = thisItem;
        this.testData = Object.assign({}, thisItem);
        this.testData.dateOfBirth = new Date(thisItem.dateOfBirth);
        this.testData.lastLoginDate = new Date(thisItem.lastLoginDate);
        this.testData.sessionExpiryTime = new Date(thisItem.sessionExpiryTime);
    };
    AboutComponent.prototype.addTestData = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.testData) {
            return;
        }
        //this.testData.dateOfBirth = moment(this.testData.dateOfBirth).toDate(); //.format("YYYY-MM-DDThh:mm:00.000Z");
        //this.testData.lastLoginDate = moment(this.testData.lastLoginDate).toDate(); //.format("YYYY-MM-DDThh:mm:00.000Z");
        //this.testData.sessionExpiryTime = moment(this.testData.sessionExpiryTime).toDate(); //.format("YYYY-MM-DDThh:mm:00.000Z");
        //this.testData.dateOfBirth = new Date(moment(this.testData.dateOfBirth).format("YYYY-MM-DDThh:mm"));
        //this.testData.lastLoginDate = new Date(moment(this.testData.lastLoginDate).format("YYYY-MM-DDThh:mm"));
        //this.testData.sessionExpiryTime = new Date(moment(this.testData.sessionExpiryTime).format("YYYY-MM-DDThh:mm"));
        this.sampleDataService.addSampleData(this.testData)
            .subscribe(function (data) {
            if (data != null && data.statusCode == 200) {
                //use this to save network traffic; just pushes new record into existing
                //data.value.dateOfBirth = moment(data.value.dateOfBirth).format("YYYY-MM-DDThh:mm");         // new Date(data.value.dateOfBirth);
                //data.value.lastLoginDate = moment(data.value.lastLoginDate).format("YYYY-MM-DDThh:mm");     // new Date(data.value.lastLoginDate);
                //data.value.sessionExpiryTime = moment(data.value.sessionExpiryTime).format("YYYY-MM-DDThh:mm");
                //this.testDataList.push(data.value);
                // or keep these 2 lines; subscribe to data, but then refresh all data anyway
                _this.testData = _this.initTestData();
                _this.getTestData();
                _this.errorMessageService.showSuccess('Add', "data added ok");
            }
            else {
                _this.errorMessageService.showError('Add', _this.errorMessageService.formattedErrorResponse(data.value));
            }
        }, function (error) {
            _this.errorMessageService.showError('Get', JSON.stringify(error));
        });
    };
    AboutComponent.prototype.getTestData = function () {
        var _this = this;
        this.sampleDataService.getSampleData()
            .subscribe(function (data) {
            if (data != null && data.statusCode == 200) {
                _this.testDataList = data.value;
                _this.errorMessageService.showSuccess('Get', "data fetched ok");
                if (_this.testDataList != null && _this.testDataList.length > 0) {
                    //this.testDataList[0].dateOfBirth = new Date(this.testDataList[0].dateOfBirth);
                    //this.testDataList[0].lastLoginDate = new Date(this.testDataList[0].lastLoginDate);
                    //// this.testDataList[0].sessionExpiryTime = moment(this.testDataList[0].sessionExpiryTime, moment.ISO_8601).format("hh:mm");
                    //this.testDataList[0].sessionExpiryTime = new Date(this.testDataList[0].sessionExpiryTime);
                    //this.selectedItem = this.testDataList[0];
                    _this.tableMode = 'list';
                }
                else {
                    _this.tableMode = 'add';
                }
            }
            else if (data == null || data.statusCode == 204) {
                _this.tableMode = 'add';
                _this.errorMessageService.showError('Get', "No data available");
            }
            else {
                _this.tableMode = 'add';
                _this.errorMessageService.showError('Get', "An error occurred");
            }
        }, function (error) {
            _this.errorMessageService.showError('Get', JSON.stringify(error));
        });
    };
    AboutComponent.prototype.editTestData = function (event) {
        var _this = this;
        event.preventDefault();
        if (!this.testData) {
            return;
        }
        //        console.log(this.testData.dateOfBirth);
        //        //this.testData.dateOfBirth = moment.utc(this.testData.dateOfBirth).toDate(); //.format("YYYY-MM-DDThh:mm:00.000Z");
        ////         this.testData.dateOfBirth = moment(moment(this.testData.dateOfBirth).format("YYYY-MM-DDThh:mm:00.000Z"), "YYYY-MM-DD 00:00 +00:00").toDate(); //.format("YYYY-MM-DDThh:mm:00.000Z");
        //        console.log(this.testData.dateOfBirth);
        //        console.log(this.testData.lastLoginDate);
        //        this.testData.lastLoginDate = moment(moment(this.testData.lastLoginDate).format("YYYY-MM-DDThh:mm:00.000Z"), "YYYY-MM-DD hh:mm +00:00").toDate(); //.format("YYYY-MM-DDThh:mm:00.000Z");
        //        console.log(this.testData.lastLoginDate);
        //        console.log(this.testData.sessionExpiryTime);
        //        this.testData.sessionExpiryTime = moment(moment(this.testData.sessionExpiryTime).format("YYYY-MM-DDThh:mm:00.000Z"), "0001-01-01 hh:mm +00:00").toDate(); //.format("YYYY-MM-DDThh:mm:00.000Z");
        //        console.log(this.testData.sessionExpiryTime);
        this.sampleDataService.editSampleData(this.testData)
            .subscribe(function (data) {
            if (data != null && data.statusCode == 200) {
                _this.errorMessageService.showSuccess('Update', "updated ok");
                //data.value.dateOfBirth = new Date(data.value.dateOfBirth);
                //data.value.lastLoginDate = new Date(data.value.lastLoginDate);
                //data.value.sessionExpiryTime = new Date(moment(data.value.sessionExpiryTime).format("hh:mm"));
                //this.testData = data.value;
                _this.testData = _this.initTestData();
                _this.getTestData();
            }
            else {
                _this.errorMessageService.showError('Update', _this.errorMessageService.formattedErrorResponse(data.value));
            }
        }, function (error) {
            _this.errorMessageService.showError('Update', JSON.stringify(error));
        });
    };
    AboutComponent.prototype.deleteRecord = function (itemToDelete, event) {
        var _this = this;
        event.preventDefault();
        this.sampleDataService.deleteRecord(itemToDelete)
            .subscribe(function (data) {
            if (data != null && data.statusCode == 200) {
                _this.errorMessageService.showSuccess('Delete', data.value);
                _this.getTestData();
            }
            else {
                _this.errorMessageService.showError('Delete', "An error occurred");
            }
        }, function (error) {
            _this.errorMessageService.showError('Delete', JSON.stringify(error));
        });
    };
    return AboutComponent;
}());
AboutComponent = __decorate([
    core_1.Component({
        selector: 'my-about',
        templateUrl: 'partial/aboutComponent'
    }),
    __metadata("design:paramtypes", [sampleData_service_1.SampleDataService, ErrorMessageService_1.ErrorMessageService])
], AboutComponent);
exports.AboutComponent = AboutComponent;
//# sourceMappingURL=about.component.js.map