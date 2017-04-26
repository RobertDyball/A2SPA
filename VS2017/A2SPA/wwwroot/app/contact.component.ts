import { Component } from '@angular/core';

@Component({
    selector: 'my-contact',
    templateUrl: 'partial/contactComponent'
})

export class ContactComponent {

    public alerts: any = [];

    public add(): void {
        this.alerts.push({
            type: 'info',
            msg: `This alert will be closed in 5 seconds (added: ${(new Date()).toLocaleTimeString()})`,
            timeout: 5000
        });
    }

}
