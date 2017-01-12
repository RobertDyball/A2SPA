import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, routedComponents } from './app.routing';
import { APP_BASE_HREF, Location } from '@angular/common';
import { AppComponent } from './app.component';

// enableProdMode();

@NgModule({
    imports: [BrowserModule, routing],
    declarations: [AppComponent, routedComponents],
    providers: [    { provide: APP_BASE_HREF, useValue: '/' }
  ],

    bootstrap: [AppComponent]
})
export class AppModule { }
