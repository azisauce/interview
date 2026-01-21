import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-component.html',
  styleUrl: './pagination-component.css'
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
