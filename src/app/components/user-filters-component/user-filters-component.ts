import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterState {
  searchTerm: string;
  selectedRole: string;
  selectedDepartment: string;
}

@Component({
  selector: 'app-user-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-filters-component.html',
  styleUrl: './user-filters-component.css'
})
export class UserFiltersComponent {
  @Input() roles: string[] = [];
  @Input() departments: string[] = [];
  @Input() filters: FilterState = {
    searchTerm: '',
    selectedRole: 'all',
    selectedDepartment: 'all'
  };

  @Output() filtersChange = new EventEmitter<FilterState>();
  @Output() reset = new EventEmitter<void>();

  onFilterChange(): void {
    this.filtersChange.emit(this.filters);
  }

  onReset(): void {
    this.reset.emit();
  }
}
