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
