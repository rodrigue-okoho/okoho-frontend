import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from "./candidate/dashboard/dashboard.component";
import {CandidateComponent} from "../components/siderbar/candidate/candidate.component";
import {RecruteurComponent} from "../components/siderbar/recruteur/recruteur.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {fontAwesomeIcons} from "../core/config/font-awesome-icons";
import {ProfileComponent} from './candidate/profile/profile.component';
import {MyResumeComponent} from './candidate/my-resume/my-resume.component';
import {MyApplyComponent} from './candidate/my-apply/my-apply.component';
import {ShortlistJobComponent} from './candidate/shortlist-job/shortlist-job.component';
import {AlertJobComponent} from './candidate/alert-job/alert-job.component';
import {FollowingEmployeeComponent} from './candidate/following-employee/following-employee.component';
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {ChangePasswordComponent} from './candidate/change-password/change-password.component';
import {CpChangePasswordComponent} from "../components/cp-change-password/cp-change-password.component";
import {SubmitJobComponent} from './employer/submit-job/submit-job.component';
import {ApplicantJobComponent} from './employer/applicant-job/applicant-job.component';
import {ShortListCandidatComponent} from './employer/short-list-candidat/short-list-candidat.component';
import {CandidatAlertComponent} from './employer/candidat-alert/candidat-alert.component';
import {DashboardEmployerComponent} from './employer/dashboard/dashboard.component';
import {PackageComponent} from './employer/package/package.component';
import {MeetingComponent} from './employer/meeting/meeting.component';
import {MessageComponent} from './employer/message/message.component';
import {ProfileEmployerComponent} from "./employer/profile/profile.component";
import {MyJobComponent} from './employer/my-job/my-job.component';
import {DeleteProfileComponent} from './employer/delete-profile/delete-profile.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MessageCandidatComponent} from './candidate/message-candidat/message-candidat.component';
import {CvManagerComponent} from './candidate/cv-manager/cv-manager.component';
import {CdkStepperModule} from "@angular/cdk/stepper";
import {NgStepperModule} from "angular-ng-stepper";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CandidateRoutingModule} from "./candidate/candidate-routing.module";
import {EmployerRoutingModule} from "./employer/employer-routing.module";
import {NgxSelectModule} from "ngx-select-ex";
import {NgSelectModule} from "@ng-select/ng-select";
import {TabsModule} from "ngx-bootstrap/tabs";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {GoogleMapsModule} from "@angular/google-maps";
import {NgxSpinnerModule} from "ngx-spinner";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";


@NgModule({
  declarations: [
    DashboardComponent, CandidateComponent,
    RecruteurComponent, ProfileComponent, MyResumeComponent,
    MyApplyComponent, ShortlistJobComponent, AlertJobComponent, CpChangePasswordComponent,
    FollowingEmployeeComponent, ChangePasswordComponent, SubmitJobComponent,
    ApplicantJobComponent, ShortListCandidatComponent, DashboardEmployerComponent,
    ProfileEmployerComponent,
    CandidatAlertComponent, PackageComponent, MeetingComponent, MessageComponent,
    MyJobComponent, DeleteProfileComponent, MessageCandidatComponent, CvManagerComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    CandidateRoutingModule,
    EmployerRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    NgxSelectModule,
    NgSelectModule,
    CdkStepperModule,
    NgStepperModule, NgbModule,
    NgxIntlTelInputModule,
    PdfViewerModule,
    GoogleMapsModule,
    NgxSpinnerModule,
    LeafletModule
  ],
  exports: []
})
export class DashboardModule {
  constructor(iconLibrary: FaIconLibrary,) {
    iconLibrary.addIcons(...fontAwesomeIcons);
  }
}
