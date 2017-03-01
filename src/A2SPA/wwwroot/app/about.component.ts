import { Component, OnInit } from '@angular/core';
import { SampleDataService } from './services/sampleData.service';
import { TestData } from './models/testData';

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
    tableMode: string;

    errorMessage: string;

    constructor(private sampleDataService: SampleDataService) { }

    initTestData(): TestData {
        var newTestData = new TestData();
        //newTestData.id = 0;
        //newTestData.currency = null;
        //newTestData.emailAddress = null;
        //newTestData.password = null;
        //newTestData.username = null;

        return newTestData;
    }

    ngOnInit() {
        this.getTestData();
        this.testData = this.initTestData();
        this.selectedItem = null;
        this.tableMode = 'list';
    }

    getTestData() {
        this.sampleDataService.getSampleData()
            .subscribe((data: TestData[]) => {
                this.testDataList = data;
                if (this.testDataList != null && this.testDataList.length > 0) {
                    this.selectedItem = this.testDataList[0];
                }
            },
            (error: any) => this.errorMessage = error);
    }

    deleteRecord(itemToDelete: TestData, event: any) {
        event.preventDefault();
        this.sampleDataService.deleteRecord(itemToDelete)
            .subscribe((status: boolean) => {
                if (status = true) {
                    this.getTestData();
                }
                else {
                    this.errorMessage = 'Unable to delete customer';
                }
            },
            (error: any) => {
                this.errorMessage = error;
                console.log(error)
            });
    }

    changeMode(newMode: string, thisItem: TestData, event: any): void {
        event.preventDefault();
        this.tableMode = newMode;
        if (this.testDataList.length == 0) {
            this.tableMode = 'add';
        }

        if (this.testDataList.length > 0) {
            if (this.testData == null)
                this.testData = this.initTestData();
            //else
            //    this.testData = this.testDataList[0];
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
    }

    selectCurrentItem(thisItem: TestData, event: any) {
        event.preventDefault();
        this.selectedItem = thisItem;
        this.testData = this.selectedItem;
    }

    addTestData(event: any) {
        event.preventDefault();
        if (!this.testData) { return; }
        this.sampleDataService.addSampleData(this.testData)
            .subscribe((data: TestData) => { this.testData = data; this.getTestData(); },
            (error: any) => this.errorMessage = error);
    }

    editTestData(event: any) {
        event.preventDefault();
        if (!this.testData) { return; }
        this.sampleDataService.editSampleData(this.testData)
            .subscribe((data: TestData) => { this.testData = data; this.getTestData(); },
            (error: any) => this.errorMessage = error);
    }
}
