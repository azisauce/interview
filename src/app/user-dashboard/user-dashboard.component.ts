import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// User interface
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: Date;
  department: string;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  // All users data
  users: User[] = [];

  // Filtered and sorted users for display
  displayedUsers: User[] = [];

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  paginatedUsers: User[] = [];

  // Filtering
  searchTerm: string = '';
  selectedRole: string = 'all';
  selectedStatus: string = 'all';
  selectedDepartment: string = 'all';

  // Sorting
  sortField: keyof User = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Form for adding/editing users
  showForm: boolean = false;
  isEditing: boolean = false;
  currentUser!: User;

  // Statistics
  totalUsers: number = 0;
  activeUsers: number = 0;
  inactiveUsers: number = 0;

  // Available options for filters
  roles: string[] = ['Admin', 'Manager', 'Developer', 'Designer', 'Analyst'];
  departments: string[] = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  statuses: string[] = ['active', 'inactive'];


  ngOnInit(): void {
    this.currentUser = this.getEmptyUser();
    this.loadMockData();
    this.applyFiltersAndSort();
    this.calculateStatistics();
  }

  // Load mock data
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
    this.applyFiltersAndSort();
    this.calculateStatistics();
  }

  // Apply all filters and sorting
  applyFiltersAndSort(): void {
    // Start with all users
    let filtered = [...this.users];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    // Apply status filter
    if (this.selectedStatus !== 'all') {
      filtered = filtered.filter(user => user.status === this.selectedStatus);
    }

    // Apply department filter
    if (this.selectedDepartment !== 'all') {
      filtered = filtered.filter(user => user.department === this.selectedDepartment);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[this.sortField];
      const bValue = b[this.sortField];

      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.displayedUsers = filtered;
    this.totalPages = Math.ceil(this.displayedUsers.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to first page when filters change
    this.updatePagination();
  }

  // Update pagination
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.displayedUsers.slice(startIndex, endIndex);
  }

  // Pagination controls
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

  // Sorting
  sortBy(field: keyof User): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  getSortIcon(field: keyof User): string {
    if (this.sortField !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // Calculate statistics
  calculateStatistics(): void {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.filter(u => u.status === 'active').length;
    this.inactiveUsers = this.users.filter(u => u.status === 'inactive').length;
  }

  // CRUD operations
  openAddForm(): void {
    this.isEditing = false;
    this.currentUser = this.getEmptyUser();
    this.showForm = true;
  }

  openEditForm(user: User): void {
    this.isEditing = true;
    this.currentUser = { ...user };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.currentUser = this.getEmptyUser();
  }

  saveUser(): void {
    if (this.isEditing) {
      const index = this.users.findIndex(u => u.id === this.currentUser.id);
      if (index !== -1) {
        this.users[index] = { ...this.currentUser };
      }
    } else {
      const newId = Math.max(...this.users.map(u => u.id), 0) + 1;
      this.currentUser.id = newId;
      this.users.push({ ...this.currentUser });
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
    user.status = user.status === 'active' ? 'inactive' : 'active';
    this.applyFiltersAndSort();
    this.calculateStatistics();
  }

  // Helper methods
  getEmptyUser(): User {
    return {
      id: 0,
      name: '',
      email: '',
      role: this.roles[0],
      status: 'active',
      joinDate: new Date(),
      department: this.departments[0]
    };
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedRole = 'all';
    this.selectedStatus = 'all';
    this.selectedDepartment = 'all';
    this.applyFiltersAndSort();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
