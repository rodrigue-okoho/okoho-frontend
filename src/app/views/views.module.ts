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
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { CandidatDetailComponent } from './candidats/candidat-detail/candidat-detail.component';
import { EmployersDetailComponent } from './employers/employers-detail/employers-detail.component';
import { JobDetailComponent } from './find-job/job-detail/job-detail.component';
import {RouterModule} from "@angular/router";
import {ComponentsModule} from "../components/components.module";
import { SecurityCenterComponent } from './security-center/security-center.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { PrivateCenterComponent } from './private-center/private-center.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AccessibilityCenterComponent } from './accessibility-center/accessibility-center.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { CandidateUntrainedComponent } from './candidate-untrained/candidate-untrained.component';
import {PdfViewerModule} from "ng2-pdf-viewer";




@NgModule({
  declarations: [
    FindJobComponent,
    EmployersComponent,
    CandidatsComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    BlogComponent,
    TermConditionComponent,
    BlogDetailComponent,
    CandidatDetailComponent,
    EmployersDetailComponent,
    JobDetailComponent,
    SecurityCenterComponent,
    SiteMapComponent,
    PrivateCenterComponent,
    ImpressumComponent,
    AccessibilityCenterComponent,
    DataProtectionComponent,
    DatenschutzComponent,
    CandidateUntrainedComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    GoogleMapsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ViewsRoutingModule,
    ComponentsModule,
    PdfViewerModule,
  ],

})
export class ViewsModule {
  constructor(iconLibrary: FaIconLibrary,) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
