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
    testData: TestData[] = [];
    testDataItem: TestData = null;

    errorMessage: string;

    constructor(private sampleDataService: SampleDataService) { }

    ngOnInit() {
        this.getTestData();
    }

    getTestData() {
        this.sampleDataService.getSampleData()
            .subscribe((data: TestData[]) => { this.testData = data },
            ((error: any) => this.errorMessage = error);
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

    addTestData(event: any) {
        event.preventDefault();
        if (!this.testData) { return; }
        this.sampleDataService.addSampleData(this.testDataItem)
            .map((data: TestData) => this.testDataItem = data);
    }
}
