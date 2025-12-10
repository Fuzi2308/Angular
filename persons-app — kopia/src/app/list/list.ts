import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PersonService } from '../person.service';
import { Person } from '../person';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListComponent implements OnInit {

  people: Person[] = [];
  errorMessage = '';
  loading = false;           // <-- NOWE

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;     // zaczynamy ładowanie

    this.personService.getAll().subscribe({
      next: data => {
        this.people = data;
        this.loading = false; // koniec ładowania
      },
      error: () => {
        this.errorMessage = 'Nie udało się pobrać listy osób.';
        this.loading = false;
      }
    });
  }

  delete(id?: number): void {
    if (id == null) return;
    if (!confirm('Na pewno usunąć tę osobę?')) return;

    this.personService.delete(id).subscribe({
      next: () => this.loadPeople(),
      error: () => alert('Błąd podczas usuwania.')
    });
  }

  goToDetails(id?: number): void {
    if (id == null) return;
    this.router.navigate(['/details', id]);
  }

  goToEdit(id?: number): void {
    if (id == null) return;
    this.router.navigate(['/edit', id]);
  }
}
