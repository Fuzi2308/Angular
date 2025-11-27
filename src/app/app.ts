import { Component } from '@angular/core';
import { RandomComponent } from './random/random';
import { ListComponent } from './list/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RandomComponent, ListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  title: string = 'my-angular-app';
  subtitle: string = 'Moja pierwsza aplikacja w Angularze :)';
}
