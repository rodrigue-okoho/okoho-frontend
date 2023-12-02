import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FindJobComponent} from "./find-job/find-job.component";
import {CandidatsComponent} from "./candidats/candidats.component";
import {EmployersComponent} from "./employers/employers.component";
import {accountState} from "./account/account.route";
import {ContactComponent} from "./contact/contact.component";
import {AboutComponent} from "./about/about.component";
import {FaqComponent} from "./faq/faq.component";
import {BlogComponent} from "./blog/blog.component";
import {TermConditionComponent} from "./term-condition/term-condition.component";
import {JobDetailComponent} from "./find-job/job-detail/job-detail.component";
import {CandidatDetailComponent} from "./candidats/candidat-detail/candidat-detail.component";
import {EmployersDetailComponent} from "./employers/employers-detail/employers-detail.component";
import {BlogDetailComponent} from "./blog/blog-detail/blog-detail.component";
import {PrivateCenterComponent} from "./private-center/private-center.component";
import {SiteMapComponent} from "./site-map/site-map.component";
import {ImpressumComponent} from "./impressum/impressum.component";
import {AccessibilityCenterComponent} from "./accessibility-center/accessibility-center.component";
import {DataProtectionComponent} from "./data-protection/data-protection.component";
import {SecurityCenterComponent} from "./security-center/security-center.component";
import {DatenschutzComponent} from "./datenschutz/datenschutz.component";
import {CandidateUntrainedComponent} from "./candidate-untrained/candidate-untrained.component";

const routes: Routes = [
  {
    path: 'find-job',
    data: {
      defaultSort: 'id,asc',
      pageTitle: 'title.home',
    },
    title: 'title.find-job',
    component: FindJobComponent
  },
  {
    path: 'find-job/detail/:id',
    data: {
      defaultSort: 'id,asc',
    },
    title: 'title.find-job',
    component: JobDetailComponent
  },
  {
    path: 'candidats',
    data: {
      defaultSort: 'id,asc',
    },
    title: 'title.candidat-list',
    component: CandidatsComponent
  },
  {
    path: 'candidat-untrained',
    data: {
      defaultSort: 'id,asc',
    },
    title: 'title.candidat-list',
    component: CandidateUntrainedComponent
  },
  {
    path: 'candidats/detail/:id',
    data: {
      defaultSort: 'id,asc',
    },
    title: 'title.candidat-list',
    component: CandidatDetailComponent
  }
  ,
  {
    path: 'employers',
    data: {
      defaultSort: 'id,asc',
    },
    title: 'title.recruteur-list',
    component: EmployersComponent
  },
  {
    path: 'employers/detail/:id',
    data: {
      defaultSort: 'id,asc',
    },
    title: 'title.recruteur-list',
    component: EmployersDetailComponent
  },
  {
    path: 'contact',
    title: 'title.contact',
    component: ContactComponent
  },
  {
    path: 'about',
    title: 'title.home',
    component: AboutComponent
  },
  {
    path: 'private-center',
    title: 'title.home',
    component: PrivateCenterComponent
  },
  {
    path: 'site-map',
    title: 'title.home',
    component: SiteMapComponent
  },
  {
    path: 'impressum',
    title: 'title.home',
    component: ImpressumComponent
  },
  {
    path: 'accessibility-center',
    title: 'title.home',
    component: AccessibilityCenterComponent
  },
  {
    path: 'datenschutz',
    title: 'title.home',
    component: DatenschutzComponent
  },
  {
    path: 'security-center',
    title: 'title.home',
    component: SecurityCenterComponent
  },
  {
    path: 'data-protection',
    title: 'title.home',
    component: DataProtectionComponent
  },
  {
    path: 'faq',
    title: 'title.home',
    component: FaqComponent
  },
  {
    path: 'term-condition',
    component: TermConditionComponent
  },
  {
    path: 'blog',
    data: {
      defaultSort: 'id,asc',
    },
    component: BlogComponent
  },
  {
    path: 'blog/detail/:id',
    component: BlogDetailComponent
  },
  ...accountState
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class ViewsRoutingModule {
}
