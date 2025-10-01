import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-play',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './play.html',
  styleUrl: './play.scss'
})
export class Play {

}
