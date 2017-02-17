import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { AuthService } from './auth.service';

@Component({
    selector: 'signup',
    templateUrl: '/partial/signupComponent'
})

export class SignupComponent {

    constructor(public router: Router, private titleService: Title, public http: Http, private authService: AuthService) { }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    public signup(event: Event, email: string, password: string, verifyPassword: string) {
        event.preventDefault();

        let body = { 'email': email, 'password': password, 'verifyPassword': verifyPassword };

        this.http.post('/Account/Register', JSON.stringify(body), { headers: this.authService.jsonHeaders() })
            .subscribe(response => {
                if (response.status == 200) {
                    this.router.navigate(['/login']);
                } else {
                    alert(response.json().error);
                    console.log(response.json().error);
                }
            },
            error => {
                // todo: parse error messages, generate toast popups
                // {"Email":["The Email field is required.","The Email field is not a valid e-mail address."],"Password":["The Password field is required.","The Password must be at least 6 characters long."]}
                alert(error.text());
                console.log(error.text());
            });
    }

    public login(event: Event) {
        event.preventDefault();
        this.router.navigate(['/login']);
    }
}
