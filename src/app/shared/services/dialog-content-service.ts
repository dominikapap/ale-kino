import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../components/dialog-content/dialog-content.component';

@Injectable({
  providedIn: 'root',
})
export class DialogSontentService {
  private dialog = inject(MatDialog);

  dialogInstance(
    message: string,
    iconSuccess: boolean,
    routerLink?: string,
    linkText?: string
  ) {
    const dialogRef = this.dialog.open(DialogContentComponent);
    const instance = dialogRef.componentInstance;
    instance.message = message;
    instance.iconSuccess = iconSuccess;
    instance.routerLink = routerLink;
    instance.linkText = linkText;
  }
}
