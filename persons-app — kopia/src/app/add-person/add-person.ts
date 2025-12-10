import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PersonService } from '../person.service';
import { Address, Person } from '../person';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css'
})
export class AddPersonComponent implements OnInit {

  person: Person = {
    address: {}
  };
  isEdit = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.personService.getById(id).subscribe({
        next: p => this.person = p,
        error: () => this.errorMessage = 'Nie udało się pobrać danych osoby.'
      });
    }
  }

  save(): void {
    // upewnij się, że adres nie jest undefined
    if (!this.person.address) {
      this.person.address = {} as Address;
    }

    if (this.isEdit && this.person.id != null) {
      this.personService.update(this.person.id, this.person).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.errorMessage = 'Błąd podczas zapisu.'
      });
    } else {
      this.personService.create(this.person).subscribe({
        next: () => this.router.navigate(['/']),
        error: () => this.errorMessage = 'Błąd podczas dodawania.'
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
