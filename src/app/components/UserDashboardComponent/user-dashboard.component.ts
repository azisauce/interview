import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStatisticsComponent } from '../statistics-panel-component/statistics-panel-component';
import { UserFiltersComponent, FilterState } from '../user-filters-component/user-filters-component';
import { UserTableComponent, SortState } from '../user-table-component/user-table-component';
import { PaginationComponent } from '../pagination-component/pagination-component';
import { UserFormComponent } from '../user-form-modal-component/user-form-modal-component';
import { User } from '../../services/user.service';


@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    UserStatisticsComponent,
    UserFiltersComponent,
    UserTableComponent,
    PaginationComponent,
    UserFormComponent
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  // All users data
  users: User[] = [];
  displayedUsers: User[] = [];
  paginatedUsers: User[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  // Filter state
  filterState: FilterState = {
    searchTerm: '',
    selectedRole: 'all',
    selectedDepartment: 'all'
  };

  // Sort state
  sortState: SortState = {
    field: 'name',
    direction: 'asc'
  };

  // Form state
  showForm: boolean = false;
  isEditing: boolean = false;
  currentUser: User | null = null;

  // Statistics
  totalUsers: number = 0;
  activeUsers: number = 0;
  inactiveUsers: number = 0;

  // Available options
  roles: string[] = ['Admin', 'Manager', 'Developer', 'Designer', 'Analyst'];
  departments: string[] = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

  ngOnInit(): void {
    this.loadMockData();
    this.applyFiltersAndSort();
    this.calculateStatistics();
  }

  loadMockData(): void {
    this.users = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'Admin',
        status: 'active',
        joinDate: new Date('2023-01-15'),
        department: 'Engineering'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'Developer',
        status: 'active',
        joinDate: new Date('2023-03-20'),
        department: 'Engineering'
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        role: 'Manager',
        status: 'active',
        joinDate: new Date('2022-11-10'),
        department: 'Marketing'
      },
      {
        id: 4,
        name: 'Alice Williams',
        email: 'alice.williams@example.com',
        role: 'Designer',
        status: 'inactive',
        joinDate: new Date('2023-05-05'),
        department: 'Marketing'
      },
      {
        id: 5,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        role: 'Analyst',
        status: 'active',
        joinDate: new Date('2023-07-12'),
        department: 'Finance'
      },
      {
        id: 6,
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        role: 'Developer',
        status: 'active',
        joinDate: new Date('2023-02-28'),
        department: 'Engineering'
      },
      {
        id: 7,
        name: 'Ethan Hunt',
        email: 'ethan.hunt@example.com',
        role: 'Manager',
        status: 'active',
        joinDate: new Date('2022-09-15'),
        department: 'Sales'
      },
      {
        id: 8,
        name: 'Fiona Green',
        email: 'fiona.green@example.com',
        role: 'Developer',
        status: 'inactive',
        joinDate: new Date('2023-04-18'),
        department: 'Engineering'
      }
    ];
  }

  onFiltersChange(filters: FilterState): void {
    this.filterState = filters;
    this.applyFiltersAndSort();
  }

  onResetFilters(): void {
    this.filterState = {
      searchTerm: '',
      selectedRole: 'all',
      selectedDepartment: 'all'
    };
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let filtered = [...this.users];

    // Apply search filter
    if (this.filterState.searchTerm) {
      const term = this.filterState.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (this.filterState.selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === this.filterState.selectedRole);
    }

    // Apply department filter
    if (this.filterState.selectedDepartment !== 'all') {
      filtered = filtered.filter(user => user.department === this.filterState.selectedDepartment);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[this.sortState.field];
      const bValue = b[this.sortState.field];

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return this.sortState.direction === 'asc' ? comparison : -comparison;
    });

    this.displayedUsers = filtered;
    this.totalPages = Math.ceil(this.displayedUsers.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePagination();
  }

  onSort(field: keyof User): void {
    if (this.sortState.field === field) {
      this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortState.field = field;
      this.sortState.direction = 'asc';
    }
    this.applyFiltersAndSort();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.displayedUsers.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  previousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  calculateStatistics(): void {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.filter(u => u.status === 'active').length;
    this.inactiveUsers = this.users.filter(u => u.status === 'inactive').length;
  }

  openAddForm(): void {
    this.isEditing = false;
    this.currentUser = null;
    this.showForm = true;
  }

  openEditForm(user: User): void {
    this.isEditing = true;
    this.currentUser = { ...user };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.currentUser = null;
  }

  saveUser(user: User): void {
    if (this.isEditing && user.id) {
      const index = this.users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        this.users[index] = { ...user };
      }
    } else {
      const newId = Math.max(...this.users.map(u => u.id), 0) + 1;
      user.id = newId;
      this.users.push({ ...user });
    }

    this.applyFiltersAndSort();
    this.calculateStatistics();
    this.closeForm();
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== userId);
      this.applyFiltersAndSort();
      this.calculateStatistics();
    }
  }

  toggleUserStatus(user: User): void {
    const foundUser = this.users.find(u => u.id === user.id);
    if (foundUser) {
      foundUser.status = foundUser.status === 'active' ? 'inactive' : 'active';
      this.applyFiltersAndSort();
      this.calculateStatistics();
    }
  }
}
