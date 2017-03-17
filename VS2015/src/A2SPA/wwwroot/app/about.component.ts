import { Component, OnInit } from '@angular/core';
import { SampleDataService } from './services/sampleData.service';
import { TestData } from './models/testData';
import { ViewModelResponse } from './models/viewModelResponse';
import { ErrorResponse } from './models/errorResponse';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
    selector: 'my-about',
    templateUrl: '/partial/aboutComponent'
})

export class AboutComponent implements OnInit {
    testDataList: TestData[] = [];
    selectedItem: TestData = null;
    testData: TestData = null;
    tableMode: string = 'list';
    showForm: boolean = true;

    errorMessage: string;

    constructor(private sampleDataService: SampleDataService, private toastrService: ToastrService) { }

    initTestData(): TestData {
        var newTestData = new TestData();
        return newTestData;
    }

    ngOnInit() {
        this.getTestData();
        this.testData = this.initTestData();
        this.selectedItem = null;
        this.tableMode = 'list';
    }

    showSuccess(title: string, message: string) {
        this.toastrService.success(message, title);
    }

    showError(title: string, message: string) {
        this.toastrService.error(message, title);
    }

    changeMode(newMode: string, thisItem: TestData, event: any): void {
        event.preventDefault();
        this.tableMode = newMode;
        if (this.testDataList.length == 0) {
            this.tableMode = 'add';
        }
        else
            if (this.testData == null) {
                this.testData = this.initTestData();
            }

        switch (newMode) {
            case 'add':
                this.testData = this.initTestData();
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
    }

    formattedErrorResponse(error: ErrorResponse[]): string {
        var plural = (error.length > 0) ? 's' : '';
        var errorMessage = "Error" + plural + ": ";
        for (var i = 0; i < error.length; i++) {
            if (error.length > 0) errorMessage += "(" + (i + 1) + ") ";
            errorMessage += "field: " + error[0].memberNames + ", error: " + error[0].errorMessage;
            if (i < error.length) errorMessage += ", ";
        }
        return errorMessage;
    }

    addTestData(event: any) {
        event.preventDefault();
        if (!this.testData) { return; }
        this.sampleDataService.addSampleData(this.testData)
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    //use this to save network traffic; just pushes new record into existing
                    this.testDataList.push(data.value);
                    // or keep these 2 lines; subscribe to data, but then refresh all data anyway
                    //this.testData = data.value;
                    //this.getTestData();
                    this.showSuccess('Add', "data added ok");
                }
                else {
                    this.showError('Add', this.formattedErrorResponse(data.value));
                }
            },
            (error: any) => {
                this.showError('Get', JSON.stringify(error));
            });
    }

    getTestData() {
        this.sampleDataService.getSampleData()
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    this.testDataList = data.value;
                    this.showSuccess('Get', "data fetched ok");
                    if (this.testDataList != null && this.testDataList.length > 0) {
                        this.selectedItem = this.testDataList[0];
                    }
                }
                else {
                    this.showError('Get', "An error occurred");
                }
            },
            (error: any) => {
                this.showError('Get', JSON.stringify(error));
            });
    }

    editTestData(event: any) {
        event.preventDefault();
        if (!this.testData) { return; }
        this.sampleDataService.editSampleData(this.testData)
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    this.showSuccess('Update', "updated ok");
                    this.testData = data.value;
                    this.getTestData();
                }
                else {
                    this.showError('Update', this.formattedErrorResponse(data.value));
                }
            },
            (error: any) => {
                this.showError('Update', JSON.stringify(error));
            });
    }

    deleteRecord(itemToDelete: TestData, event: any) {
        event.preventDefault();
        this.sampleDataService.deleteRecord(itemToDelete)
            .subscribe((data: ViewModelResponse) => {
                if (data != null && data.statusCode == 200) {
                    this.showSuccess('Delete', data.value);
                    this.getTestData();
                }
                else {
                    this.showError('Delete', "An error occurred");
                }
            },
            (error: any) => {
                this.showError('Delete', JSON.stringify(error));
            });
    }
}
