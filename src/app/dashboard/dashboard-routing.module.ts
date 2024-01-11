import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./candidate/dashboard/dashboard.component";
import {FollowingEmployeeComponent} from "./candidate/following-employee/following-employee.component";
import {ProfileComponent} from "./candidate/profile/profile.component";
import {MyResumeComponent} from "./candidate/my-resume/my-resume.component";
import {MyApplyComponent} from "./candidate/my-apply/my-apply.component";
import {AlertJobComponent} from "./candidate/alert-job/alert-job.component";
import {ShortlistJobComponent} from "./candidate/shortlist-job/shortlist-job.component";
import {ChangePasswordComponent} from "./candidate/change-password/change-password.component";
import {DashboardEmployerComponent} from "./employer/dashboard/dashboard.component";
import {ProfileEmployerComponent} from "./employer/profile/profile.component";
import {PackageComponent} from "./employer/package/package.component";
import {MeetingComponent} from "./employer/meeting/meeting.component";
import {CandidatAlertComponent} from "./employer/candidat-alert/candidat-alert.component";
import {ShortListCandidatComponent} from "./employer/short-list-candidat/short-list-candidat.component";
import {SubmitJobComponent} from "./employer/submit-job/submit-job.component";
import {ApplicantJobComponent} from "./employer/applicant-job/applicant-job.component";
import {MyJobComponent} from "./employer/my-job/my-job.component";
import {MessageComponent} from "./employer/message/message.component";
import {MessageCandidatComponent} from "./candidate/message-candidat/message-candidat.component";
import { CvManagerComponent } from './candidate/cv-manager/cv-manager.component';

const routes: Routes = [
  {
    path: 'dash-candidate',
    component: DashboardComponent,
    data: {
      authorities: ['ROLE_CANDIDATE'],
      pageTitle: 'userManagement.home.title',
    },
  },
  {
    data: {
      authorities: ["ROLE_CANDIDATE"],
    },
    path: 'dash-my-profile',
    component: ProfileComponent
  },
  {
    path: 'dash-cv-manager',
    data: {
      authorities: ["ROLE_CANDIDATE"],
    },
    component: CvManagerComponent
  },
  {
    path: 'dash-following-employee',
    data: {
      authorities: ["ROLE_CANDIDATE"],
    },
    component: FollowingEmployeeComponent
  },
  {
    path: 'dash-my-resume',
    component: MyResumeComponent
  },
  {
    path: 'dash-message',
    component: MessageCandidatComponent
  },
  {
    path: 'dash-my-apply',
    component: MyApplyComponent
  },
  {
    path: 'dash-alert-job',
    component: AlertJobComponent
  },
  {
    path: 'dash-short-list',
    component: ShortlistJobComponent
  },
  {
    path: 'dash-change-password',
    component: ChangePasswordComponent
  },
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
export class DashboardRoutingModule {
}
