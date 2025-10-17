import { Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, from } from 'rxjs';
import { liveQuery } from 'dexie';

import { Database, Category, Question } from '../database';
import { QuestionTile } from '../question-tile/question-tile';

@Component({
  selector: 'app-edit-category',
  imports: [AsyncPipe, QuestionTile, MatButtonModule, MatIconModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.scss'
})
export class EditCategory {
  category = input<Category>();
  questions$: Observable<Question[]>;

  constructor(db: Database) {
    this.questions$ = from(liveQuery(
      () => db.questions.where({
        categoryId: this.category()?.id,
      }).toArray()
    ));
  }
}
