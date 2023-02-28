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
      .dialog-container {
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

      .dialog-container__dialog-content {
        padding: clamp(8px, 4vw, 4rem);
      }
      .dialog-container__close-btn {
        margin: 0;
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
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentComponent {
  @Input() message!: string;
  @Input() iconSuccess = true;
  @Input() routerLink?: string;
  @Input() linkText?: string;
  @Input() secondRouterLink?: string;
  @Input() secondLinkText?: string;
}
