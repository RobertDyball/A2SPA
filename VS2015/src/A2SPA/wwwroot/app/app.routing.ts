
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './security/auth-guard.service';

import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ChangePasswordComponent } from './changePassword.component';
import { ManageComponent } from './manage.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent, data: { title: 'Home' } },
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
    { path: 'register', component: RegisterComponent, data: { title: 'Register' } },
    { path: 'changePassword', component: ChangePasswordComponent, data: { title: 'Change Password' }, canActivate: [AuthGuard] },
    { path: 'manage', component: ManageComponent, data: { title: 'Manage Account' }, canActivate: [AuthGuard] },
    { path: 'about', component: AboutComponent, data: { title: 'About' }, canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AboutComponent, IndexComponent, ContactComponent, LoginComponent, RegisterComponent, ChangePasswordComponent, ManageComponent];
