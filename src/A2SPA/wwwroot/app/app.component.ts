import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: '/partial/appComponent'
})
export class AppComponent  {
    public constructor(private titleService: Title) { }

    name = 'Angular';

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
