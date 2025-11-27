import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class ListComponent {
  newItem: string = '';
  items: string[] = [];

  addItem(): void {
    const value = this.newItem.trim();
    if (!value) return;
    this.items.push(value);
    this.newItem = '';
  }

  removeItem(index: number): void {
    this.items.splice(index, 1);
  }
}
