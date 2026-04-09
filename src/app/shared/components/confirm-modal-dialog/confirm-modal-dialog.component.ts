import { Component, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';

interface DialogData {
  title: string
  message: string,
  confirmButton: string,
  concelButton: string
}

@Component({
  selector: 'app-confirm-modal-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    ReactiveFormsModule,
    MatIconModule,
    MatTimepickerModule,
    MatDatepickerModule
  ],
  templateUrl: './confirm-modal-dialog.component.html',
  styleUrl: './confirm-modal-dialog.component.scss'
})
export class ConfirmModalDialogComponent {

  readonly dialogRef = inject(MatDialogRef<ConfirmModalDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onSave() {
    this.dialogRef.close(this.data)
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
