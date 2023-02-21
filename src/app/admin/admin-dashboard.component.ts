import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <h1>DASHBOARD</h1>
    <h2>Seanse</h2>
    <ol>
      <li><a routerLink="showings/add-showing">Dodaj nowy seans</a></li>
      <li><a routerLink="showings/showings-list">Lista seansów</a></li>
    </ol>

    <h2>Filmy</h2>
    <ol>
      <li><a routerLink="movies/add-movie">Dodaj nowy film</a></li>
      <li><a routerLink="movies/movies-list">Lista filmów</a></li>
    </ol>

    <router-outlet></router-outlet>
  `,
  styles: [
    `
      * {
        margin-top: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {}
