import {Component, OnInit} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute, Router} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {IJob} from "../../../core/models/job.model";
import {ICandidat} from "../../../core/models/candidat.model";
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "../../../core/config/pagination.constants";
import {IApplicantJob} from "../../../core/models/applicantJob.model";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-my-apply',
  templateUrl: './my-apply.component.html',
  styleUrls: ['./my-apply.component.scss']
})
export class MyApplyComponent implements OnInit{
  applies?: IApplicantJob[];
  isLoading = false;
  totalItems = 0;
  item="ApplicantJob"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  candidat: ICandidat | null = null;
  constructor(private activateService: ActivateService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,protected router: Router,
              private activatedRoute: ActivatedRoute,private backService:BackService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
    this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candidat = res.body
        this.handleNavigation();
      });

  }
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    this.backService
      .candidatApplys(this.candidat?.id,{
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IApplicantJob[]>) => {
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
  trackId(index: string, item: IApplicantJob): string {
    return item?.id!;
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

  protected onSuccess(data: IApplicantJob[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    console.log('###############################')
    console.log(headers.get('content-type'))
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
      this.router.navigate(['/applicant-job'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.applies = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
}
