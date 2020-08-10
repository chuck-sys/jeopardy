import { Questions } from './question';

export type Scores = {[key: string]: number};

export function getQuestions(): Questions {
  const s = localStorage.getItem('questions');
  if (s === null) {
    return {};
  }
  return JSON.parse(s);
}

export function setQuestions(questions: Questions) {
  const s = JSON.stringify(questions);
  localStorage.setItem('questions', s);
}

export function getTeams(): Scores {
  const s = localStorage.getItem('teams');
  if (s === null) {
    return {};
  }
  const teams = JSON.parse(s);
  if (Array.isArray(teams)) {
    return {};
  }
  return teams;
}

export function setTeams(teams: Scores) {
  const s = JSON.stringify(teams);
  localStorage.setItem('teams', s);
}
