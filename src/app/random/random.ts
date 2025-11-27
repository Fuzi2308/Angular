import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomService } from '../random.service';

@Component({
  selector: 'app-random',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './random.html',
  styleUrl: './random.css',
})
export class RandomComponent {
  @Input() max: number = 10;

  current?: number;
  comment: string = '';
  isLowerOrEqualHalf: boolean = true;

  constructor(private randomService: RandomService) {}

  generate(): void {
    this.current = this.randomService.getRandom(this.max);

    if (this.current <= this.max / 2) {
      this.comment = `Liczba jest mniejsza lub równa połowie (${this.max / 2}).`;
      this.isLowerOrEqualHalf = true;
    } else {
      this.comment = `Liczba jest większa niż połowa (${this.max / 2}).`;
      this.isLowerOrEqualHalf = false;
    }
  }
}
