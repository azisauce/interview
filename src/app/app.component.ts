import { Component } from '@angular/core';
import { UserDashboardComponent } from './components/UserDashboardComponent/user-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [UserDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'interview-app';
}
