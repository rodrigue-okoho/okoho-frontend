import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileComponent} from "./profile/profile.component";
import {CvManagerComponent} from "./cv-manager/cv-manager.component";
import {FollowingEmployeeComponent} from "./following-employee/following-employee.component";
import {MyResumeComponent} from "./my-resume/my-resume.component";
import {MessageCandidatComponent} from "./message-candidat/message-candidat.component";
import {MyApplyComponent} from "./my-apply/my-apply.component";
import {AlertJobComponent} from "./alert-job/alert-job.component";
import {ShortlistJobComponent} from "./shortlist-job/shortlist-job.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";


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
    data: {
      defaultSort: 'id,asc',
    },
    component: MyApplyComponent
  },
  {
    path: 'dash-alert-job',
    data: {
      defaultSort: 'id,asc',
    },
    component: AlertJobComponent
  },
  {
    path: 'dash-short-list',
    data: {
      defaultSort: 'id,asc',
    },
    component: ShortlistJobComponent
  },
  {
    path: 'dash-change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class CandidateRoutingModule {
}
