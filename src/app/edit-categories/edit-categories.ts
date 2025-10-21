import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { liveQuery } from 'dexie';
import { from, Observable } from 'rxjs';

import { Database, Category } from '../database';
import { Config } from '../config';
import { EditCategory } from '../edit-category/edit-category';
import { EditCategoryDialog } from '../edit-category-dialog/edit-category-dialog';

@Component({
  selector: 'app-edit-categories',
  imports: [AsyncPipe, EditCategory, MatButtonModule, MatIconModule],
  templateUrl: './edit-categories.html',
  styleUrl: './edit-categories.scss'
})
export class EditCategories {
  categories$: Observable<Category[]>;

  constructor(private db: Database, private config: Config, private dialog: MatDialog) {
    this.categories$ = from(liveQuery(
      () => db.categories.where({
        gameId: config.selectedGameId
      }).toArray()
    ));
  }

  handleClickNewCategory(e: Event) {
    const dialogRef = this.dialog.open(EditCategoryDialog, {
      data: {
        name: '',
        order: 0,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
