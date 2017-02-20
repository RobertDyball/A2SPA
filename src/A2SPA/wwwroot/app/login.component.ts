import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { AuthService } from './security/auth.service';
import { LoginViewModel } from './models/LoginViewModel';

@Component({
    selector: 'login',
    templateUrl: '/partial/loginComponent'
})

export class LoginComponent {
    loginViewModel: LoginViewModel;

    constructor(public router: Router, private titleService: Title, public http: Http, private authService: AuthService) { }

    ngOnInit() {
        this.loginViewModel = new LoginViewModel();
    }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    login(event: Event): void {
        event.preventDefault();
        let body = 'username=' + this.loginViewModel.email + '&password=' + this.loginViewModel.password + '&grant_type=password';

        this.http.post('/connect/token', body, { headers: this.authService.contentHeaders() })
            .subscribe(response => {
                this.authService.login(response.json());
                this.router.navigate(['/about']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }

    signup(event: Event) {
        event.preventDefault();
        this.router.navigate(['/signup']);
    }
}
