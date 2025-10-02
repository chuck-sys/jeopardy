import { InjectionToken } from '@angular/core';

export interface ILocalStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const LOCAL_STORAGE = new InjectionToken<ILocalStorage>('Local storage', {
  providedIn: 'root',
  factory: () => window.localStorage,
});
