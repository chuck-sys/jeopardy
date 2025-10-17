import { Component, input, output } from '@angular/core';

import { Question } from '../database';
import { TileDisplayMode } from '../tile-display-mode';
import { EditView } from '../edit-view';

@Component({
  selector: 'app-question-tile',
  imports: [],
  templateUrl: './question-tile.html',
  styleUrl: './question-tile.scss'
})
export class QuestionTile {
  readonly TileDisplayMode = TileDisplayMode;

  question = input<Question>();
  questionClicked = output<Question>();

  constructor(public editView: EditView) {}

  handleClick() {
    const q = this.question();
    if (q) {
      this.questionClicked.emit(q);
    }
  }
}
