import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {navbarRoute} from "./components/navbar/navbar.route";
import {errorRoute} from "./components/error/error.route";
import {HomeComponent} from "./views/home/home.component";
const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Accueil'
    }
  },
  {
    path: '**',
    redirectTo: ''
  },
  ...LAYOUT_ROUTES,
];

@NgModule({
  imports: [[RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
