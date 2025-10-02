import { Injectable, Inject } from '@angular/core';
import { Database, Category, Question } from './database';
import { ILocalStorage, LOCAL_STORAGE } from './local-storage';

export interface QuestionCompat {
  hint: string;
  points: number;
  category: string;
  answer: string;
  answeredBy: string;
  seenAnswer: boolean;
}

export interface CategoryCompat {
  name: string;
  questions: Array<QuestionCompat>;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageCompat {
  public static readonly STORAGE_KEY = 'categories';
  public static readonly BACKUP_KEY = 'categories-compat';

  constructor(
    private db: Database,
    @Inject(LOCAL_STORAGE) private localStorage: ILocalStorage) {}

  getCompatCategories(): Array<CategoryCompat> | null {
    const s = this.localStorage.getItem(LocalStorageCompat.STORAGE_KEY);
    if (s === null) {
      return null;
    }

    return JSON.parse(s);
  }

  backupCompatCategories() {
    const s = this.localStorage.getItem(LocalStorageCompat.STORAGE_KEY);
    if (s === null) {
      return;
    }

    this.localStorage.removeItem(LocalStorageCompat.STORAGE_KEY);
    this.localStorage.setItem(LocalStorageCompat.BACKUP_KEY, s);
  }

  async saveCategories(categoriesCompat: Array<CategoryCompat>) {
    const gameId = await this.db.jeopardyGames.add({
      name: 'Imported game (from previous version of site)',
      lastSaveTime: new Date(),
    });

    const categories: Array<Category> = categoriesCompat.map((compat, orderNumber) => {
      return {
        gameId,
        name: compat.name,
        orderNumber,
      };
    });

    const categoryIds = await this.db.categories.bulkAdd(categories, {allKeys: true});
    categoriesCompat.forEach(async (compat, i) => {
      const categoryId = categoryIds[i];
      const questions: Array<Question> = compat.questions.map(q => {
        return {
          categoryId,
          points: q.points,
          question: q.hint,
          answer: q.answer,
        };
      });

      await this.db.questions.bulkAdd(questions);
    });
  }
}
