// This is the root component of the app
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-header></app-header>\n' +
    '<router-outlet></router-outlet>\n' +
    '<app-footer></app-footer>'
})
export class AppComponent {
}
