import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Config {
  selectedGameId: number;

  constructor() {
    this.selectedGameId = parseInt(window.localStorage.getItem('selectedGameId') || '0');
  }

  save() {
    window.localStorage.setItem('selectedGameId', this.selectedGameId.toString());
  }
}
