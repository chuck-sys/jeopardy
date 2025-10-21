import { Component, model, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  name: string;
  order: number;
}

@Component({
  selector: 'app-edit-category-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './edit-category-dialog.html',
  styleUrl: './edit-category-dialog.scss'
})
export class EditCategoryDialog {
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly name = model(this.data.name);
  readonly order = model(this.data.order);

  constructor(
    private readonly dialogRef: MatDialogRef<EditCategoryDialog>,
  ) {}

  handleCreate() {
    this.dialogRef.close({
      name: this.name(),
      order: this.order(),
    });
  }

  handleCancel() {
    this.dialogRef.close();
  }
}
