import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterCriteria {
  searchTerm: string;
  selectedRole: string;
  selectedDepartment: string;
  selectedStatus: string;
}

@Component({
  selector: 'app-user-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-filter.component.html',
  styleUrl: './user-filter.component.css'
})
export class UserFilterComponent {
  // Inputs - Configuration from parent
  @Input() roles: string[] = [];
  @Input() departments: string[] = [];
  @Input() statuses: string[] = [];

  // Outputs - Emit filter changes to parent
  @Output() filterChange = new EventEmitter<FilterCriteria>();
  @Output() resetFilters = new EventEmitter<void>();

  // Local filter state
  searchTerm: string = '';
  selectedRole: string = 'all';
  selectedDepartment: string = 'all';
  selectedStatus: string = 'all';

  // Emit filter changes whenever any filter value changes
  onFilterChange(): void {
    this.filterChange.emit({
      searchTerm: this.searchTerm,
      selectedRole: this.selectedRole,
      selectedDepartment: this.selectedDepartment,
      selectedStatus: this.selectedStatus
    });
  }

  // Reset all filters to default values
  onResetFilters(): void {
    this.searchTerm = '';
    this.selectedRole = 'all';
    this.selectedDepartment = 'all';
    this.selectedStatus = 'all';
    this.resetFilters.emit();
  }
}
