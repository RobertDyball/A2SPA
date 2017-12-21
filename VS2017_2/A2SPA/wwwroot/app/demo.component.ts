import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { ChartModule } from "angular2-highcharts";

@Component({
    selector: 'my-contact',
    templateUrl: 'partial/demoComponent'
})

export class DemoComponent {

    showSuccess() {
        this.toastrService.success('Hello world!', 'Toastr fun!');
    }

    // this is not meant to be secured; demonstrating a component that is open to anonymous users to access
    constructor(private toastrService: ToastrService, public titleService: Title) {
        this.options = {
            title: {
                text: 'Monthly Average Temperature'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            pane: [{ size: 50}],
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        };
    }
    options: Object;

    setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
