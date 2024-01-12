import {Component, OnInit} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import {Account} from "../../../core/auth/account.model";
import {IJob} from "../../../core/models/job.model";
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "../../../core/config/pagination.constants";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {IEmployer} from "../../../core/models/employe.model";
import {ICandidat} from "../../../core/models/candidat.model";
import {combineLatest} from "rxjs";
import {IApplicantJob} from "../../../core/models/applicantJob.model";
import {IcategoryJob} from "../../../core/models/categoryJob.model";

@Component({
  selector: 'app-applicant-job',
  templateUrl: './applicant-job.component.html',
  styleUrls: ['./applicant-job.component.scss']
})
export class ApplicantJobComponent implements OnInit{
  error = false;
  success = false;
  account: Account | null = null;
  applies?: IApplicantJob[];
  jobs?: IJob[] | null;
  itemJob?:IJob|null;
  isLoading = false;
  totalItems = 0;
  item="Jobs"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  entreprise: IEmployer|null = null;
  status?: string | null;
  placehoder: "select Job";
  loading=false;
  constructor(private activateService: ActivateService,
              private localStorageService: LocalStorageService,
              private sessionStorageService: SessionStorageService,
              protected activatedRoute: ActivatedRoute,
              private backService:BackService,
              private accountService: AccountService,) {}

  ngOnInit(): void {
    this.backService.employerProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<IEmployer>) => {
        this.entreprise=res.body;
        this.backService.employerJoblist(this.entreprise?.id).subscribe(
          (res: HttpResponse<IJob[]>) => {
            this.jobs=res.body});
        this.handleNavigation("all");
      });

  }
  loadPage(page?: number, dontNavigate?: boolean,status?:string): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.backService
      .employerApplys(this.entreprise?.id,status,{
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
  loadPageByJob(page?: number, dontNavigate?: boolean,status?:string,job_id?:string): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.backService
      .employerApplyByJob(job_id,status,{
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
  protected handleNavigation(status?:string,job_id?:string): void {
    console.log(job_id)
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      //if (pageNumber !== this.page || predicate !== this.predicate || ascending !== this.ascending) {
        this.predicate = predicate;
        this.ascending = ascending;
        this.loadPageByJob(pageNumber, true,status,job_id);
     // }
    });
  }

  protected onSuccess(data: IApplicantJob[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    console.log(headers.get('content-type'))
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
    }
    this.applies = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  changeStatus(status?: string) {
    this.status=status;
    this.handleNavigation(status)
  }

  changeJob(event:any) {
    this.itemJob=event;
    console.log(this.itemJob?.id)
      this.handleNavigation("all",this.itemJob?.id)
  }
}
