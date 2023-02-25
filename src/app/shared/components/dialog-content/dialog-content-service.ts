import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from './dialog-content.component';

@Injectable({
  providedIn: 'root',
})
export class DialogSontentService {
  private dialog = inject(MatDialog);

  dialogInstance(message: string, routerLink: string, linkText: string) {
    const dialogRef = this.dialog.open(DialogContentComponent);
    const instance = dialogRef.componentInstance;
    instance.message = message;
    instance.routerLink = routerLink;
    instance.linkText = linkText;
  }
}
