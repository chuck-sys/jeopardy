import type { Table } from 'dexie';
import Dexie from 'dexie';

import type { Config } from './config';

export interface IncrementingIds {
  category: number;
  question: number;
  team: number;
}

export interface JeopardyGame {
  id?: number;
  name: string;
  description: string;
  lastSaveTime: Date;

  incrementingIds: IncrementingIds;

  teams: Array<Team>;
  categories: Array<Category>;
  questions: Array<Question>;
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

export interface QuestionAnsweredEntry {
  questionId: number;
  teamId: number;

  isCorrect: boolean;
  pointsObtained: number;
}

export interface Team {
  id?: number;
  name: string;

  questionsAnswered: Map<number, QuestionAnsweredEntry>;
}

export class Database extends Dexie {
  jeopardyGames!: Table<JeopardyGame, number>;

  constructor(cfg: Config) {
    super('jeopardy');

    this.version(1).stores({
      jeopardyGames: '++id',
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
          description: 'Undescribed jeopardy game',
          lastSaveTime: new Date(),

          incrementingIds: {
            category: 0,
            question: 0,
            team: 0,
          },

          teams: [],
          categories: [],
          questions: [],
        });
      });
  }
}
