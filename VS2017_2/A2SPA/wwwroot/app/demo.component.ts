import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'my-contact',
    templateUrl: 'partial/demoComponent'
})

export class DemoComponent {
    // this is not meant to be secured; demonstrating a component that is open to anonymous users to access
    constructor(private toastrService: ToastrService) { }

    showSuccess() {
        this.toastrService.success('Hello world!', 'Toastr fun!');
    }
}
