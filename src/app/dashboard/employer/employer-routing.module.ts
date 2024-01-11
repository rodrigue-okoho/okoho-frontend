import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardEmployerComponent} from "./dashboard/dashboard.component";
import {ProfileEmployerComponent} from "./profile/profile.component";
import {PackageComponent} from "./package/package.component";
import {MeetingComponent} from "./meeting/meeting.component";
import {MessageComponent} from "./message/message.component";
import {CandidatAlertComponent} from "./candidat-alert/candidat-alert.component";
import {ShortListCandidatComponent} from "./short-list-candidat/short-list-candidat.component";
import {SubmitJobComponent} from "./submit-job/submit-job.component";
import {ApplicantJobComponent} from "./applicant-job/applicant-job.component";
import {MyJobComponent} from "./my-job/my-job.component";

const routes: Routes = [
  {
    path: 'dash-employer',
    component: DashboardEmployerComponent
  },
  {
    path: 'dash-employer-profile',
    component: ProfileEmployerComponent
  },
  {
    path: 'dash-employer-package',
    data: {
      defaultSort: 'id,asc',
    },
    component: PackageComponent
  },
  {
    path: 'dash-employer-meeting',
    data: {
      defaultSort: 'id,asc',
    },
    component: MeetingComponent
  },
  {
    path: 'dash-employer-message',
    data: {
      defaultSort: 'id,asc',
    },
    component: MessageComponent
  },
  {
    path: 'dash-employer-candidat-alert',
    data: {
      defaultSort: 'id,asc',
    },
    component: CandidatAlertComponent
  },
  {
    path: 'dash-employer-shortlist',
    data: {
      defaultSort: 'id,asc',
    },
    component: ShortListCandidatComponent
  },
  {
    path: 'dash-employer-submit-job',
    component: SubmitJobComponent
  },
  {
    path: 'dash-employer-submit-job/:id',
    component: SubmitJobComponent
  },
  {
    path: 'dash-employer-applicant-job',
    data: {
      defaultSort: 'id,asc',
    },
    component: ApplicantJobComponent
  },
  {
    path: 'dash-employer-my-job',
    data: {
      defaultSort: 'id,asc',
    },
    component: MyJobComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class EmployerRoutingModule {
}
