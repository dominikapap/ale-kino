import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <h1 class="text-3xl font-semibold text-center">ADMIN DASHBOARD</h1>
    <div class="flex gap-8 ">
      <div>
        <h2 class="text-3xl font-bold  pb-1">Seanse</h2>
        <ol>
          <li>
            <a
              routerLink="showings/add-showing"
              class="text-xl inline-flex items-baseline"
              >Dodaj nowy seans
              <mat-icon class="ml-2 mt-0 text-lg">create</mat-icon></a
            >
          </li>
          <li>
            <a
              routerLink="showings/showings-list"
              class="text-xl inline-flex items-baseline"
              >Lista seansów
              <mat-icon class="ml-2 mt-0 text-lg">list</mat-icon></a
            >
          </li>
        </ol>
      </div>
      <div>
        <h2 class="text-3xl font-bold  pb-1">Filmy</h2>
        <ol>
          <li>
            <a
              routerLink="movies/add-movie"
              class="text-xl inline-flex items-baseline"
              >Dodaj nowy film
              <mat-icon class="ml-2 mt-0 text-lg">create</mat-icon></a
            >
          </li>
          <li>
            <a
              routerLink="movies/movies-list"
              class="text-xl inline-flex items-baseline"
              >Lista filmów
              <mat-icon class="ml-2 mt-0 text-lg">list</mat-icon></a
            >
          </li>
        </ol>
        <div></div>
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      *:not(.mat-icon) {
        margin-top: 1rem;
      }
      :host {
        margin-top: 120px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDashboardComponent {}
