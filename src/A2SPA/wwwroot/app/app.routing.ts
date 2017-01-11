import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: 'home', component: IndexComponent, data: { title: 'Index' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AboutComponent, IndexComponent, ContactComponent];
