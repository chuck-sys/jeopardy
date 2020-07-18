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
  const scores: Scores = {};
  teams.forEach((team: string) => {
    scores[team] = 0;
  });
  return scores;
}

export function setTeams(teams: Scores) {
  const s = JSON.stringify(Object.keys(teams));
  localStorage.setItem('teams', s);
}
