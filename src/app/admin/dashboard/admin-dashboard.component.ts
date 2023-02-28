import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
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
