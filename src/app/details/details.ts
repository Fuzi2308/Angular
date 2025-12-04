import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  person?: Person;
  index: number = -1;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      const idx = idParam !== null ? Number(idParam) : NaN;

      if (Number.isNaN(idx)) {
        this.router.navigate(['/']);
        return;
      }

      this.index = idx;
      this.person = this.personService.getByIndex(idx);

      if (!this.person) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
