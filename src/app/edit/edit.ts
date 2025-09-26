import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EditTitle } from '../edit-title/edit-title';
import { Config } from '../config';
import { Database } from '../database';

@Component({
  selector: 'app-edit',
  imports: [EditTitle, RouterLink],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {
  selectedGameName = signal('');

  constructor(private db: Database, private cfg: Config) {
    db.jeopardyGames.get(cfg.selectedGameId).then(game => {
      if (game === undefined) {
        return;
      }

      this.selectedGameName.set(game.name);
    });
  }

  handleChangeName(newName: string) {
    this.db.jeopardyGames.update(this.cfg.selectedGameId, { name: newName });
    this.selectedGameName.set(newName);
  }
}
