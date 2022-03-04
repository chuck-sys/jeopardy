import { Category } from './question';

export type Scores = {[key: string]: number};

export function getCategories(): Array<Category> {
  const s = localStorage.getItem('categories');
  if (s === null) {
    return [];
  }
  return JSON.parse(s);
}

export function setCategories(cats: Array<Category>) {
  const s = JSON.stringify(cats);
  localStorage.setItem('categories', s);
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
