import { Route } from '@angular/router';

import { PasswordComponent } from './password.component';
import {UserRouteAccessService} from "../../../core/auth/user-route-access.service";

export const passwordRoute: Route = {
  path: 'password',
  component: PasswordComponent,
  data: {
    pageTitle: 'global.menu.account.password',
  },
  canActivate: [UserRouteAccessService],
};
