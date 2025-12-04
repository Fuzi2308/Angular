import { Injectable } from '@angular/core';
import { Person } from './person';

const STORAGE_KEY = 'persons';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor() {}

  private loadAllInternal(): Person[] {
    const json = localStorage.getItem(STORAGE_KEY);
    if (!json) {
      return [];
    }
    try {
      return JSON.parse(json) as Person[];
    } catch {
      console.error('Błędny JSON w localStorage, czyszczę dane.');
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }

  private saveAllInternal(persons: Person[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
  }

  /** 1) wczytanie wszystkich danych */
  getAll(): Person[] {
    return this.loadAllInternal();
  }

  /** 2) wczytanie wskazanego indeksem elementu */
  getByIndex(index: number): Person | undefined {
    const persons = this.loadAllInternal();
    return persons[index];
  }

  /** 3) dodanie jednej osoby */
  add(person: Person): void {
    const persons = this.loadAllInternal();
    persons.push(person);
    this.saveAllInternal(persons);
  }

  /** 4) usunięcie wskazanego indeksem elementu */
  delete(index: number): void {
    const persons = this.loadAllInternal();
    if (index < 0 || index >= persons.length) {
      return;
    }
    persons.splice(index, 1);
    this.saveAllInternal(persons);
  }
}
