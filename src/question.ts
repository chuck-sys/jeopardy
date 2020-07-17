export interface Question {
  hint: string;
  points: number;
  category: string;
  answer: string;
}

export interface QuestionWithStatus {
  q: Question;
  answeredBy: string;
  seenAnswer: boolean;
}

export function addStatus(q: Question): QuestionWithStatus {
  return {
    q,
    answeredBy: '',
    seenAnswer: false,
  };
}

export function mapAddStatus(qs: Array<Question>): Array<QuestionWithStatus> {
  return qs.map(addStatus);
}

export function emptyQuestion(category: string): Question {
  return {
    hint: '',
    points: 100,
    category,
    answer: '',
  };
}

export function copy(q: Question): Question {
  return {
    hint: q.hint,
    points: q.points,
    category: q.category,
    answer: q.answer,
  };
}
