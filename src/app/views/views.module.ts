import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewsRoutingModule} from "./views-routing.module";
import { FindJobComponent } from './find-job/find-job.component';
import { EmployersComponent } from './employers/employers.component';
import { CandidatsComponent } from './candidats/candidats.component';
import {AccountModule} from "./account/account.module";
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { BlogComponent } from './blog/blog.component';
import {SharedModule} from "../shared/shared.module";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {fontAwesomeIcons} from "../core/config/font-awesome-icons";
import {ReactiveFormsModule} from "@angular/forms";
import {GoogleMapsModule} from "@angular/google-maps";
import { TermConditionComponent } from './term-condition/term-condition.component';



@NgModule({
  declarations: [
    FindJobComponent,
    EmployersComponent,
    CandidatsComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    BlogComponent,
    TermConditionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GoogleMapsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AccountModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule {
  constructor(iconLibrary: FaIconLibrary,) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
