import {Component} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {isAuthenticated} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-app-frontend';

  protected readonly isAuthenticated = isAuthenticated;
}
