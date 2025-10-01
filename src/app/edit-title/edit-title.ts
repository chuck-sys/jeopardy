import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AutoFocus } from '../auto-focus';

@Component({
  selector: 'app-edit-title',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, AutoFocus,
  ],
  templateUrl: './edit-title.html',
  styleUrl: './edit-title.scss'
})
export class EditTitle {
  isEditing = false;
  newName = '';
  gameName = input('');

  nameChanged = output<string>();

  handleClickHeader() {
    this.isEditing = true;
    this.newName = this.gameName();
  }

  handleSubmitHeader() {
    this.isEditing = false;
    this.nameChanged.emit(this.newName);
  }

  handleCancelEditHeader() {
    this.isEditing = false;
  }
}
