import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatButtonModule],
  templateUrl: './modal-confirm.component.html',
  styleUrl: './modal-confirm.component.scss',
})
export class ModalConfirmComponent {
  public data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef);

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public onDelete(): void {
    this.dialogRef.close(true);
  }
}
