import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageCompat } from './local-storage-compat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(lsCompat: LocalStorageCompat) {
    const compatCategories = lsCompat.getCompatCategories();
    if (compatCategories !== null) {
      lsCompat.saveCategories(compatCategories);
      lsCompat.backupCompatCategories();
    }
  }
}
