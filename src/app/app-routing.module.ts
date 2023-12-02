import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {navbarRoute} from "./components/navbar/navbar.route";
import {errorRoute} from "./components/error/error.route";
import {HomeComponent} from "./views/home/home.component";
import { UserRouteAccessService } from './core/auth/user-route-access.service';
const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    loadChildren: () => import('./views/views-routing.module').then(m => m.ViewsRoutingModule),
  },
  {
    path: 'dash',
    canActivate: [UserRouteAccessService],
    data: {
      authorities: ["ROLE_CANDIDATE"],
    },
    loadChildren: () => import('./dashboard/candidate/candidate-routing.module').then(m => m.CandidateRoutingModule),
  },
  {
    path: 'dash',
    canActivate: [UserRouteAccessService],
    data: {
      authorities: ["ROLE_ENTREPRISE"],
    },
    loadChildren: () => import('./dashboard/employer/employer-routing.module').then(m => m.EmployerRoutingModule),
  },
  ...LAYOUT_ROUTES,
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    useHash: false
  }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
