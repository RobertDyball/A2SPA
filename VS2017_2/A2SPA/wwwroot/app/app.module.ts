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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import './rxjs-operators';

// enableProdMode();

@NgModule({
    imports: [NgbModule.forRoot(), BrowserAnimationsModule, BrowserModule, FormsModule, HttpModule, ToastrModule.forRoot(), routing],
    declarations: [AppComponent, routedComponents],
    providers: [SampleDataService,
        ErrorMessageService,
        AuthService,
        AuthGuard, Title, { provide: APP_BASE_HREF, useValue: '/a2spa' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
