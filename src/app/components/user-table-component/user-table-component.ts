import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user.service';


export interface SortState {
  field: keyof User;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table-component.html',
  styleUrl: './user-table-component.css'
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Input() sortState: SortState = { field: 'name', direction: 'asc' };

  @Output() sort = new EventEmitter<keyof User>();
  @Output() edit = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();
  @Output() toggleStatus = new EventEmitter<User>();

  onSort(field: keyof User): void {
    this.sort.emit(field);
  }

  getSortIcon(field: keyof User): string {
    if (this.sortState.field !== field) return '↕️';
    return this.sortState.direction === 'asc' ? '↑' : '↓';
  }
}


