import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
type StatusFilter = 'all' | 'active' | 'inactive';

@Component({
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  @Input() totalUsers: number = 0;
  @Input() activeUsers: number = 0;
  @Input() inactiveUsers: number = 0;
  @Output() statusSelected = new EventEmitter<StatusFilter>();

selectStatus(status: StatusFilter) {
  
  this.statusSelected.emit(status);
}


}
