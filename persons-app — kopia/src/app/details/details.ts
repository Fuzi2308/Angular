import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class DetailsComponent implements OnInit {

  person: Person | null = null;   // tu trzymamy dane
  loading = true;                 // flaga ładowania
  notFound = false;               // flaga 404

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    console.log('Param id =', idParam, 'Number =', id);

    if (!id) {
      this.loading = false;
      this.notFound = true;
      return;
    }

    this.personService.getById(id).subscribe({
      next: p => {
        console.log('Pobrane szczegóły osoby:', p);
        this.person = p;
        this.loading = false;
        this.notFound = false;
      },
      error: err => {
        console.error('Błąd przy pobieraniu szczegółów', err);
        this.person = null;
        this.loading = false;
        this.notFound = true;
      }
    });
  }
}
