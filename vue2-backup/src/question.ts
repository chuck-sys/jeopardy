export interface Question {
  hint: string;
  points: number;
  category: string;
  answer: string;
  answeredBy: string;
  seenAnswer: boolean;
}
export interface Category {
  name: string;
  questions: Array<Question>;
}

export function emptyQuestion(category: string): Question {
  return {
    hint: '',
    points: 100,
    category,
    answer: '',
    answeredBy: '',
    seenAnswer: false,
  };
}

export function copy(q: Question): Question {
  return {
    hint: q.hint,
    points: q.points,
    category: q.category,
    answer: q.answer,
    answeredBy: q.answeredBy,
    seenAnswer: q.seenAnswer,
  };
}
