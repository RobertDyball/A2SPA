import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Http } from '@angular/http';
import { AuthService } from './security/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: '/partial/appComponent'
})
export class AppComponent {
    angularClientSideData = 'Angular';

    public constructor(private router: Router, private titleService: Title, private http: Http, private authService: AuthService) { }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    public isLoggedIn(): boolean {
        return this.authService.loggedIn();
    }

    // TODO: move this to auth.service
    public logout() {
        this.http.get('/connect/logout', { headers: this.authService.authJsonHeaders() })
            .subscribe(response => {
                this.authService.logout();
                this.router.navigate(['']);
            },
            error => {
                alert(error.text());
                console.log(error.text());
            }
            );
    }
}
