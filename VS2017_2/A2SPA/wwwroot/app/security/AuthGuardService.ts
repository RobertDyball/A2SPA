import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from './authService';

@Injectable()
export class AuthGuard {

    constructor(private authService: AuthService, private router: Router, private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.authService.loggedIn()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
