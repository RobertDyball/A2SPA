import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
    selector: 'register',
    templateUrl: 'partial/manageComponent'
})

export class ManageComponent {
    
    constructor(private titleService: Title) { }

    setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
