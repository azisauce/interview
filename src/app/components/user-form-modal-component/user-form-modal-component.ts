import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user.service';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form-modal-component.html',
  styleUrl: './user-form-modal-component.css'
})
export class UserFormComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Input() isEditing: boolean = false;
  @Input() user: User | null = null;
  @Input() roles: string[] = [];
  @Input() departments: string[] = [];

  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  formUser: User = this.getEmptyUser();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.formUser = { ...this.user };
    } else if (changes['visible'] && this.visible && !this.isEditing) {
      this.formUser = this.getEmptyUser();
    }
  }

  onSubmit(): void {
    this.save.emit({ ...this.formUser });
  }

  onClose(): void {
    this.close.emit();
  }

  private getEmptyUser(): User {
    return {
      id: 0,
      name: '',
      email: '',
      role: this.roles[0] || '',
      status: 'active',
      joinDate: new Date(),
      department: this.departments[0] || ''
    };
  }
}
