import type { Table } from 'dexie';
import Dexie from 'dexie';

import type { Config } from './config';

export interface JeopardyGame {
  id?: number;
  name: string;
  lastSaveTime: Date;
}

export interface Category {
  id?: number;
  gameId: number;

  name: string;
  orderNumber: number;
}

export interface Question {
  id?: number;
  categoryId: number;

  points: number;
  question: string;
  answer: string;
}

export class Database extends Dexie {
  jeopardyGames!: Table<JeopardyGame, number>;
  categories!: Table<Category, number>;
  questions!: Table<Question, number>;

  constructor(cfg: Config) {
    super('jeopardy');

    this.version(1).stores({
      jeopardyGames: '++id',
      categories: '++id, gameId',
      questions: '++id, categoryId',
    });

    this.jeopardyGames
      .get(cfg.selectedGameId)
      .then(selectedGame => {
        if (selectedGame !== undefined) {
          return;
        }

        this.jeopardyGames.add({
          id: cfg.selectedGameId,
          name: 'Untitled jeopardy game',
          lastSaveTime: new Date(),
        });
      });
  }
}
