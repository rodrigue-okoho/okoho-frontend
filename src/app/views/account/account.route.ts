import { Routes } from '@angular/router';

import { activateRoute } from './activate/activate.route';
import { passwordRoute } from './password/password.route';
import { passwordResetFinishRoute } from './password-reset/finish/password-reset-finish.route';
import { passwordResetInitRoute } from './password-reset/init/password-reset-init.route';
import {ActivateComponent} from "./activate/activate.component";
import {ActivateWaitComponent} from "./activate-wait/activate-wait.component";

const ACCOUNT_ROUTES = [activateRoute,
  passwordRoute,
  passwordResetFinishRoute,
  passwordResetInitRoute,
  {
    path: 'activate-wait',
    component: ActivateWaitComponent,
    data: {
      pageTitle: 'activate.title',
    },
  }];

export const accountState: Routes = [
  {
    path: 'account',
    children: ACCOUNT_ROUTES,
  },
];
