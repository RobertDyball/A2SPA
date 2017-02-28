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
    itemToSelect: TestData = null;
    testData: TestData = null;
    tableMode: string;

    errorMessage: string;

    constructor(private sampleDataService: SampleDataService) { }

    ngOnInit() {
        this.getTestData();
        this.testData = new TestData();
        this.itemToSelect = new TestData();
        this.tableMode = 'add';
    }

    getTestData() {
        this.sampleDataService.getSampleData()
            .subscribe((data: TestData[]) => { this.testDataList = data; if (this.testDataList != null && this.testDataList.length > 0) { this.testData = this.testDataList[1]; } },
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

    changeMode(newMode: string, thisItem: TestData, event: any) : void {
        event.preventDefault();
        this.tableMode = newMode;

        if (this.testDataList.length == 0) {
            this.tableMode = 'add';
        }

        if (this.testDataList.length > 0) {
            if (this.testData == null)
                this.testData = new TestData();
            else
                this.testData = this.testDataList[0];
        }


        switch (newMode) {
            case 'add':
                this.testData = new TestData();
                this.testData.id = null;
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

    selectCurrentItem(itemToSelect: TestData, event: any) {
        event.preventDefault();
        this.testData = itemToSelect;
        console.log('select item: ' + itemToSelect.id);
    }

    addTestData(event: any) {
        event.preventDefault();
        console.log('adding new data');
        if (!this.testData) { return; }
        this.sampleDataService.addSampleData(this.testData)
            .subscribe((data: TestData) => { this.testData = data; this.getTestData(); },
            (error: any) => this.errorMessage = error);
    }

    editTestData(event: any) {
        event.preventDefault();
        console.log('edit existing data');
        if (!this.testData) { return; }
        this.sampleDataService.editSampleData(this.testData)
            .subscribe((data: TestData) => { this.testData = data; this.getTestData(); },
            (error: any) => this.errorMessage = error);
    }
}
