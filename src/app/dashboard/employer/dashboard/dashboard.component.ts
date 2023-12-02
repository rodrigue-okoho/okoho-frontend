import {Component, OnInit} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import {Account} from "../../../core/auth/account.model";
import {IEmployer} from "../../../core/models/employe.model";
import {HttpResponse} from "@angular/common/http";
import {IApplicantJob} from "../../../core/models/applicantJob.model";
import {IJob} from "../../../core/models/job.model";
import { IStatistic } from 'src/app/core/models/Statistic.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardEmployerComponent  implements OnInit{
  account: Account | null = null;
  entreprise: IEmployer|null = null;
  applies?: IApplicantJob[] | null;
  jobs?: IJob[] | null;
  statistic: IStatistic|null = null;
  constructor(private activateService: ActivateService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private route: ActivatedRoute,private backService:BackService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
    this.backService.employerProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<IEmployer>) => {
        this.entreprise=res.body;
        this.backService.statisticEntreprise(this.entreprise?.id).subscribe(
          (res: HttpResponse<IStatistic>) => {
            this.statistic = res.body});
        this.backService
          .employerApplys(this.entreprise?.id,"approuve",{})
          .subscribe(
            (res: HttpResponse<IApplicantJob[]>) => {
              this.applies=res.body;
            },
            () => {
            }
          );
      });

  }
}
