import { Injectable } from '@angular/core';

import { TileDisplayMode } from './tile-display-mode';

@Injectable({
  providedIn: 'root'
})
export class EditView {
  displayScore = TileDisplayMode.None;
  displayQuestion = TileDisplayMode.None;
  displayAnswer = TileDisplayMode.None;
}
