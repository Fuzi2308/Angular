import { Routes } from '@angular/router';
import { ListComponent } from './list/list';
import { DetailsComponent } from './details/details';
import { AddPersonComponent } from './add-person/add-person';
import { NotFoundComponent } from './not-found/not-found';

export const routes: Routes = [
  { path: '', component: ListComponent },                 // lista
  { path: 'details/:id', component: DetailsComponent },   // szczegóły
  { path: 'add', component: AddPersonComponent },         // dodawanie
  { path: '**', component: NotFoundComponent },           // 404
];
