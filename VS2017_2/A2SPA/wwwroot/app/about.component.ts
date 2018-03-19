import { Component, OnInit } from '@angular/core';
import { SampleDataService } from './services/sampleData.service';
import { TestData } from './models/testData';
import { ViewModelResponse } from './models/viewModelResponse';
import { ErrorResponse } from './models/errorResponse';
import { ErrorMessageService } from './services/ErrorMessageService';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
//import 'moment/locale/en';

@Component({
    selector: 'my-about',
    templateUrl: 'partial/aboutComponent'
})

export class AboutComponent implements OnInit {
    testDataList: TestData[] = [];
    selectedItem: TestData = null;
    testData: TestData = null;
    tableMode: string = 'list';

    showForm: boolean = true;
    errorMessage: string;

    constructor(private sampleDataService: SampleDataService, private errorMessageService: ErrorMessageService) {
        if (!this.testData) { this.testData = this.initTestData(); }
    }

    initTestData(): TestData {
        var newTestData = new TestData();
        newTestData.id = null;
        newTestData.currency = null;
        newTestData.emailAddress = null;
        newTestData.password = null;
        newTestData.username = null;
        newTestData.dateOfBirth = new Date();
        newTestData.lastLoginDate = new Date();
        newTestData.sessionExpiryTime = new Date();
        return newTestData;
    }

    ngOnInit() {
        moment.locale('en');
        this.tableMode = 'add';
        this.getTestData();
        this.testData = this.initTestData();
        this.selectedItem = this.initTestData();
    }

    changeMode(newMode: string, thisItem: TestData, event: any): void {
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
                break;

            case 'list':
            default:
                this.testData = Object.assign({}, thisItem);
                break;
        }
    }

    selectCurrentItem(thisItem: TestData, event: any) {
        event.preventDefault();
        this.selectedItem = thisItem;
        this.testData = Object.assign({}, thisItem);
        this.testData.dateOfBirth = new Date(thisItem.dateOfBirth);
        this.testData.lastLoginDate = new Date(thisItem.lastLoginDate);
        this.testData.sessionExpiryTime = new Date(thisItem.sessionExpiryTime);
    }

    addTestData(event: any) {
        event.preventDefault();
        if (!this.testData) { return; }

        //this.testData.dateOfBirth = new Date(moment(this.testData.dateOfBirth).format("YYYY-MM-DDThh:mm"));
        //this.testData.lastLoginDate = new Date(moment(this.testData.lastLoginDate).format("YYYY-MM-DDThh:mm"));
        //this.testData.sessionExpiryTime = new Date(moment(this.testData.sessionExpiryTime).format("YYYY-MM-DDThh:mm"));

        this.sampleDataService.addSampleData(this.testData)
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    //use this to save network traffic; just pushes new record into existing
                    //data.value.dateOfBirth = moment(data.value.dateOfBirth).format("YYYY-MM-DDThh:mm");         // new Date(data.value.dateOfBirth);
                    //data.value.lastLoginDate = moment(data.value.lastLoginDate).format("YYYY-MM-DDThh:mm");     // new Date(data.value.lastLoginDate);
                    //data.value.sessionExpiryTime = moment(data.value.sessionExpiryTime).format("YYYY-MM-DDThh:mm");
                    //this.testDataList.push(data.value);

                    // or keep these 2 lines; subscribe to data, but then refresh all data anyway
                    this.testData = this.initTestData();
                    this.getTestData();
                    this.errorMessageService.showSuccess('Add', "data added ok");
                }
                else {
                    this.errorMessageService.showError('Add', this.errorMessageService.formattedErrorResponse(data.value));
                }
            },
            (error: any) => {
                this.errorMessageService.showError('Get', JSON.stringify(error));
            });
    }

    getTestData() {
        this.sampleDataService.getSampleData()
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    this.testDataList = data.value;
                    this.errorMessageService.showSuccess('Get', "data fetched ok");
                    if (this.testDataList != null && this.testDataList.length > 0) {

                        this.testDataList[0].dateOfBirth = new Date(this.testDataList[0].dateOfBirth);
                        this.testDataList[0].lastLoginDate = new Date(this.testDataList[0].lastLoginDate);
                        // this.testDataList[0].sessionExpiryTime = moment(this.testDataList[0].sessionExpiryTime, moment.ISO_8601).format("hh:mm");
                        this.testDataList[0].sessionExpiryTime = new Date(this.testDataList[0].sessionExpiryTime);

                        this.selectedItem = this.testDataList[0];
                        this.tableMode = 'list';
                    } else {
                        this.tableMode = 'add';
                    }
                }
                else if (data == null || data.statusCode == 204) {
                    this.tableMode = 'add';
                    this.errorMessageService.showError('Get', "No data available");
                }
                else {
                    this.tableMode = 'add';
                    this.errorMessageService.showError('Get', "An error occurred");
                }
            },
            (error: any) => {
                this.errorMessageService.showError('Get', JSON.stringify(error));
            });
    }

    editTestData(event: any) {
        event.preventDefault();
        if (!this.testData) { return; }

        //this.testData.dateOfBirth = new Date(moment(this.testData.dateOfBirth).format("YYYY-MM-DDThh:mm"));
        //this.testData.lastLoginDate = new Date(moment(this.testData.lastLoginDate).format("YYYY-MM-DDThh:mm"));
        //this.testData.sessionExpiryTime = new Date(moment(this.testData.sessionExpiryTime).format("YYYY-MM-DDThh:mm"));

        this.sampleDataService.editSampleData(this.testData)
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    this.errorMessageService.showSuccess('Update', "updated ok");

                    //data.value.dateOfBirth = new Date(data.value.dateOfBirth);
                    //data.value.lastLoginDate = new Date(data.value.lastLoginDate);
                    //data.value.sessionExpiryTime = new Date(moment(data.value.sessionExpiryTime).format("hh:mm"));

                    //this.testData = data.value;
                    this.testData = this.initTestData();
                    this.getTestData();
                }
                else {
                    this.errorMessageService.showError('Update', this.errorMessageService.formattedErrorResponse(data.value));
                }
            },
            (error: any) => {
                this.errorMessageService.showError('Update', JSON.stringify(error));
            });
    }

    deleteRecord(itemToDelete: TestData, event: any) {
        event.preventDefault();
        this.sampleDataService.deleteRecord(itemToDelete)
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    this.errorMessageService.showSuccess('Delete', data.value);
                    this.getTestData();
                }
                else {
                    this.errorMessageService.showError('Delete', "An error occurred");
                }
            },
            (error: any) => {
                this.errorMessageService.showError('Delete', JSON.stringify(error));
            });
    }
}
