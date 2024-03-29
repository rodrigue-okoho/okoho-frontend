import { Component, OnInit } from '@angular/core';
import { ActivateService } from "../../../views/account/activate/activate.service";
import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { ActivatedRoute } from "@angular/router";
import { BackService } from "../../../core/services/back.service";
import { AccountService } from "../../../core/auth/account.service";
import { Account } from "../../../core/auth/account.model";
import { IJob } from "../../../core/models/job.model";
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from "../../../core/config/pagination.constants";
import { HttpHeaders, HttpResponse } from "@angular/common/http";
import { combineLatest } from "rxjs";
import { IEmployer } from "../../../core/models/employe.model";
import { ICandidat } from "../../../core/models/candidat.model";
import {IAlert} from "../../../core/models/alert.model";

@Component({
  selector: 'app-candidat-alert',
  templateUrl: './candidat-alert.component.html',
  styleUrls: ['./candidat-alert.component.scss']
})
export class CandidatAlertComponent implements OnInit {
  error = false;
  success = false;
  account: Account | null = null;
  alerts?: IAlert[];
  isLoading = false;
  totalItems = 0;
  item = "Jobs"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  constructor(private activateService: ActivateService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    protected activatedRoute: ActivatedRoute,
    private backService: BackService,
    private accountService: AccountService,) { }

  ngOnInit(): void {
    this.handleNavigation();
  }
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.backService
      .employerAlertJob(this.localStorageService.retrieve('account_id'), {
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IEmployer[]>) => {
          this.isLoading = false;
          console.log(res.headers.get("X-Frame-Options"))
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
        },
        () => {
          this.isLoading = false;
          this.onError();
        }
      );
  }
  trackId(index: number, item: ICandidat): string {
    return item.id!;
  }
  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
  protected handleNavigation(): void {
    //combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap])
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPage(pageNumber, true);
      }
    });
  }

  protected onSuccess(data: ICandidat[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    console.log('###############################')
    console.log(headers.get('content-type'))
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    this.alerts = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
