import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics-panel-component.html',
  styleUrl: './statistics-panel-component.css'
})
export class UserStatisticsComponent {
  @Input() totalUsers: number = 0;
  @Input() activeUsers: number = 0;
  @Input() inactiveUsers: number = 0;
}
