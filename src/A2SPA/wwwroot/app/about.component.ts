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
        this.tableMode = 'list';
    }

    getTestData() {
        this.sampleDataService.getSampleData()
            .subscribe((data: TestData[]) => { this.testDataList = data },
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

    selectCurrentItem(itemToSelect: TestData, event: any) {
        event.preventDefault();
        this.testData = itemToSelect;
        console.log('select item: ' + itemToSelect.id);
    }

    addTestData(event: any) {
        event.preventDefault();
        console.log('adding new data');
        //if (!this.testData) { return; }
        this.sampleDataService.addSampleData(this.testData)
            .subscribe((data: TestData) => { this.testData = data },
            (error: any) => this.errorMessage = error);
    }
}
