import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { AuthService } from './security/auth.service';
import { RegisterViewModel } from './models/RegisterViewModel';

@Component({
    selector: 'register',
    templateUrl: '/partial/registerComponent'
})

export class RegisterComponent {
    registerViewModel: RegisterViewModel;

    constructor(public router: Router, private titleService: Title, public http: Http, private authService: AuthService) { }

    ngOnInit() {
        this.registerViewModel = new RegisterViewModel();
    }

    setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    register(event: Event): void {
        event.preventDefault();
        let body = { 'email': this.registerViewModel.email, 'password': this.registerViewModel.password, 'verifyPassword': this.registerViewModel.verifyPassword };

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
                // TODO: parse error messages, generate toast popups
                // {"Email":["The Email field is required.","The Email field is not a valid e-mail address."],"Password":["The Password field is required.","The Password must be at least 6 characters long."]}
                alert(error.text());
                console.log(error.text());
            });
    }
}
