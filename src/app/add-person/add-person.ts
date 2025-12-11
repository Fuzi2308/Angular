// src/app/add-person/add-person.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Person } from '../person';
import { PersonService } from '../person.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-person.html',
  styleUrl: './add-person.css',
})
export class AddPersonComponent {
  person: Person = {
    firstName: '',
    familyName: '',
    age: undefined,
    address: {
      city: '',
      street: '',
      postCode: '',
    },
  };

  constructor(
    private personService: PersonService,
    private router: Router
  ) {}

  save(): void {
    this.personService.add(this.person);
    this.router.navigate(['/']);
  }
}
