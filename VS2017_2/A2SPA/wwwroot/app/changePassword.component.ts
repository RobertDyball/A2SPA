import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { AuthService } from './security/authService';
import { ChangePasswordViewModel } from './models/ChangePasswordViewModel';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'register',
    templateUrl: 'partial/changePasswordComponent'
})

export class ChangePasswordComponent {
    changePasswordViewModel: ChangePasswordViewModel;

    constructor(public router: Router, private titleService: Title, public http: Http, private authService: AuthService, private toastrService: ToastrService) { }

    ngOnInit() {
        this.changePasswordViewModel = new ChangePasswordViewModel();
    }

    setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    showSuccess(title: string, message: string) {
        this.toastrService.success(message, title);
    }

    showError(title: string, message: string) {
        this.toastrService.error(message, title);
    }

    changePassword(event: Event): void {
        event.preventDefault();
        let body = { 'oldPassword': this.changePasswordViewModel.oldPassword, 'newPassword': this.changePasswordViewModel.newPassword, 'confirmPassword': this.changePasswordViewModel.confirmPassword };

        this.http.post('manage/changePassword', JSON.stringify(body), { headers: this.authService.authJsonHeaders() })
            .subscribe(response => {
                if (response.status == 200) {
                    this.showSuccess('Password changed',response.json());
                    this.router.navigate(['manage']);
                } else {
                    this.showError('Password not changed', response.json());
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
