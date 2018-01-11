import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ErrorMessageService } from './services/ErrorMessageService';
import { SampleDataService } from './services/sampleData.service';
import { AuthService } from './security/auth.service';
import { AuthGuard } from './security/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import './rxjs-operators';
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { AlertModule, DatepickerModule, RatingModule } from 'ngx-bootstrap';

declare var require: any;

export function highchartsFactory() {
    const hc = require('highcharts');
    const dd = require('highcharts/modules/drilldown');
    dd(hc);
    return hc;
}

// enableProdMode();
@NgModule({
    imports: [ChartModule,
        AlertModule.forRoot(),
        DatepickerModule.forRoot(),
        RatingModule.forRoot(),
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ToastrModule.forRoot(),
        routing],
    declarations: [AppComponent, routedComponents],
    providers: [SampleDataService,
        ErrorMessageService,
        AuthService,
        AuthGuard,
        { provide: APP_BASE_HREF, useValue: '/a2spa' },
        Title,
        { provide: HighchartsStatic, useFactory: highchartsFactory }],
    bootstrap: [AppComponent]
})
export class AppModule { }
