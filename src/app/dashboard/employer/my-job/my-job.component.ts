import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import {Account} from "../../../core/auth/account.model";
import {IEmployer} from "../../../core/models/employe.model";
import {IJob} from "../../../core/models/job.model";
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "../../../core/config/pagination.constants";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {ICandidat} from "../../../core/models/candidat.model";
import {combineLatest} from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IcategoryJob } from 'src/app/core/models/categoryJob.model';
import { countries } from 'src/app/core/util/country-data-store';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent implements OnInit{
[x: string]: any;
  error = false;
  success = false;
  account: Account | null = null;
  jobs?: IJob[];
  isLoading = false;
  totalItems = 0;
  item="Jobs"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  entreprise: IEmployer|null = null;

  jobForm!: FormGroup;
  job_apply_type:any;
  categories?: IcategoryJob[]| null;
  public countries:any = countries;

  constructor(
              private localStorageService: LocalStorageService,
              protected activatedRoute: ActivatedRoute, private route: Router,
              private backService:BackService, private fb: FormBuilder,
              private toaster: ToastrService,private translateService: TranslateService,
              ) {}

  ngOnInit(): void {
    this.backService.employerProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<IEmployer>) => {
        this.entreprise=res.body;
        this.handleNavigation();
      });
  }

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.loading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.backService
      .employerJob(this.entreprise?.id,{
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IJob[]>) => {
          this.isLoading = false;
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
   this.loading=false
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    this.jobs = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
    this.loading=false
  }

  // TODO
  loading=false;

  deleteJob(job: IJob) {
    if(job !== null && (job.id !== null && job.id !== undefined)) {
      this.backService.deleteJob(job.id)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.DELETE_SUCCESS'), 'OK');
        this.loadPage();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.DELETE_ERROR'), err.message);
      });
    }
  }

  viewJob(job: IJob) {
    if(job !== null && job.id !== null && job.id !== undefined) {
      this.route.navigateByUrl("/find-job/detail/" + job.id);
    }
  }

  edit(job : IJob) {
    if(job !== null && job.id !== null && job.id !== undefined) {
      this.route.navigateByUrl("/dash-employer-edit-job/" + job.id);
    }
  
  
  
  
  
  
  
  
  
  
  
  }

  trackByFn(index: number, item: IJob): number {
    return index;
  }

}
