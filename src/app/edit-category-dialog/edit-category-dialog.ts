import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-category-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './edit-category-dialog.html',
  styleUrl: './edit-category-dialog.scss'
})
export class EditCategoryDialog {
  name = '';
  order = 0;
}
