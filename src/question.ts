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

export type Questions = {[key: string]: Question[]};
export type QuestionsWithStatus = {[key: string]: QuestionWithStatus[]}

export function questionsMakeStatus(qs: Questions): QuestionsWithStatus {
  const ret: QuestionsWithStatus = {};
  Object.keys(qs).forEach((category: string) => {
    ret[category] = mapAddStatus(qs[category]);
  });

  return ret;
}

export function statusMakeQuestions(qs: QuestionsWithStatus): Questions {
  const ret: Questions = {};
  Object.keys(qs).forEach((category: string) => {
    ret[category] = qs[category].map((q: QuestionWithStatus) => q.q);
  });

  return ret;
}
