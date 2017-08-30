import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { AuthService } from './security/auth.service';
import { LoginViewModel } from './models/LoginViewModel';
import { ErrorMessageService } from './services/ErrorMessageService';

@Component({
    selector: 'login',
    templateUrl: 'partial/loginComponent'
})

export class LoginComponent {
    loginViewModel: LoginViewModel;

    constructor(public router: Router, private titleService: Title, public http: Http, private authService: AuthService, private errorMessageService: ErrorMessageService) { }

    ngOnInit() {
        this.loginViewModel = new LoginViewModel();
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    // post the user's login details to server, if authenticated token is returned, then token is saved to session storage
    login(event: Event): void {
        this.authService.logout();
        event.preventDefault();
        let body = 'username=' + this.loginViewModel.email + '&password=' + this.loginViewModel.password + '&grant_type=password';

        this.http.post('connect/token', body, { headers: this.authService.contentHeaders() })
            .subscribe(response => {
                // success, save the token to session storage
                this.authService.login(response.json());
                this.router.navigate(['about']);
            },
            error => {
                // failed
                if (error != null) {
                    this.errorMessageService.showError("Error", error.json().error_description);
                }
                else {
                    this.errorMessageService.showError('Error', "An error occurred");
                }
                console.log(JSON.stringify(error));
            }
            );
    }
}
