import { Routes, RouterModule } from '@angular/router';

import { About1Component } from './about1.component';
import { About2Component } from './about2.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent, data: { title: 'Home' } },
    { path: 'about1', component: About1Component, data: { title: 'About1' } },
    { path: 'about2', component: About2Component, data: { title: 'About2' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [About1Component, About2Component, IndexComponent, ContactComponent];
