﻿import { Component } from '@angular/core';

@Component({
    selector: 'my-contact',
    templateUrl: 'partial/contactComponent'
})

export class ContactComponent {
    // this is not meant to be secured; demonstrating a component that is open to anonymous users to access
    constructor() { }
}
