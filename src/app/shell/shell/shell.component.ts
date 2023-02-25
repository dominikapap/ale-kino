import { Component } from '@angular/core';

@Component({
  selector: 'app-shell',
  template: '<router-outlet></router-outlet>',
  styles: [
    `
      :host {
        padding-top: 120px;
      }
    `,
  ],
})
export class ShellComponent {}
