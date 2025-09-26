import { Routes } from '@angular/router';

import { Play } from './play/play';
import { Edit } from './edit/edit';

export const routes: Routes = [
  {
    path: '',
    component: Play,
  },
  {
    path: 'edit',
    component: Edit,
  },
];
