import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {HOME_ROUTE} from './home.route';
import {HomeComponent} from './home.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  imports: [CommonModule,
    SharedModule, RouterModule.forChild([HOME_ROUTE]),
    FontAwesomeModule, ComponentsModule,],
  declarations: [HomeComponent],
})
export class HomeModule {
}
