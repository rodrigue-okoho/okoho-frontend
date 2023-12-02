import {Component, OnInit} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import {ICandidat} from "../../../core/models/candidat.model";
import {Account} from "../../../core/auth/account.model";
import { HttpResponse } from '@angular/common/http';
import { IApplicantJob } from 'src/app/core/models/applicantJob.model';
import { IStatistic } from 'src/app/core/models/Statistic.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent   implements OnInit{
  account: Account | null = null;
  candidat: ICandidat|null = null;
  statistic: IStatistic|null = null;
  applies?: IApplicantJob[]|null;
  constructor(private activateService: ActivateService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              private route: ActivatedRoute,private backService:BackService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
    this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candidat = res.body
        this.backService.statisticCandidat(this.candidat?.id).subscribe(
          (res: HttpResponse<IStatistic>) => {
            this.statistic = res.body});
      
        this.backService
        .candidatApplys(this.candidat?.id,{})
        .subscribe(
          (res: HttpResponse<IApplicantJob[]>) => {
            this.applies=res.body;
          }
        );
    });
  }

}
