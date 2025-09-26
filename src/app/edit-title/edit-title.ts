import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-title',
  imports: [FormsModule],
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
