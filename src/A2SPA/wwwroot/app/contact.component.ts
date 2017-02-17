import { Component } from '@angular/core';
import { AuthService } from './security/auth.service';

@Component({
    selector: 'my-contact',
    templateUrl: '/partial/contactComponent'
})

export class ContactComponent {

    constructor(private authService: AuthService) { }

    // secured page...
}
