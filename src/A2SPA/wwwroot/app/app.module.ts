import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { SampleDataService } from './services/sampleData.service';
import { AuthService } from './security/auth.service';
import { AuthGuard } from './security/auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import './rxjs-operators';

// enableProdMode();

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, ToastrModule.forRoot(), routing],
    declarations: [AppComponent, routedComponents],
    providers: [SampleDataService,
        AuthService,
        AuthGuard, Title, { provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
