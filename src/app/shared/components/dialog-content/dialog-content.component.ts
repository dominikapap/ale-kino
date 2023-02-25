import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf, NgOptimizedImage } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dialog-content[message]',
  standalone: true,
  templateUrl: 'dialog-content.component.html',
  styles: [
    `
      #dialog-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        gap: 50px;
        align-items: center;
        max-width: min(88vw, 1130px);
        margin-inline: auto;
        overflow: hidden;
      }

      .dialog-content {
        padding: 4rem;
      }
      .mdc-dialog__actions {
        position: absolute;
        top: 0;
        right: 1rem;
      }
    `,
  ],
  imports: [
    NgIf,
    NgOptimizedImage,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent {
  @Input() message!: string;
  @Input() routerLink?: string;
  @Input() linkText?: string;
  @Input() secondRouterLink?: string;
  @Input() secondLinkText?: string;
}
