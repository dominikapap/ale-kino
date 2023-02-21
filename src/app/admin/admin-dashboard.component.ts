import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <h1>DASHBOARD</h1>
    <div class="flex gap-8">
      <div>
        <h2 class="text-3xl font-bold  pb-1">Seanse</h2>
        <ol>
          <li><a routerLink="showings/add-showing">Dodaj nowy seans</a></li>
          <li><a routerLink="showings/showings-list">Lista seansów</a></li>
        </ol>
      </div>
      <div>
        <h2 class="text-3xl font-bold  pb-1">Filmy</h2>
        <ol>
          <li><a routerLink="movies/add-movie">Dodaj nowy film</a></li>
          <li><a routerLink="movies/movies-list">Lista filmów</a></li>
        </ol>
        <div></div>
        <router-outlet></router-outlet>
      </div>
    </div>
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
