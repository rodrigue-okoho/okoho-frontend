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

const routes: Routes = [
  {
    path: 'find-job',
    data: {
      defaultSort: 'id,asc',
    },
    component: FindJobComponent
  },
  {
    path: 'candidats',
    data: {
      defaultSort: 'id,asc',
    },
    component: CandidatsComponent
  }
  ,
  {
    path: 'employers',
    data: {
      defaultSort: 'id,asc',
    },
    component: EmployersComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'term-condition',
    component: TermConditionComponent
  },
  {
    path: 'blog',
    component: BlogComponent
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
