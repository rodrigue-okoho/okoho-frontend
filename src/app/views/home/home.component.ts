import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';
import {IJob} from "../../core/models/job.model";
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "../../core/config/pagination.constants";
import {FrontService} from "../../core/services/front.service";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {IStatistic} from "../../core/models/Statistic.model";
import {IEmployer} from "../../core/models/employe.model";
import {ICandidat} from "../../core/models/candidat.model";
import {BackService} from "../../core/services/back.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('2s ease-out')),
      transition('hide => show', animate('2s ease-in'))
    ]),
    trigger('visibilityChanged', [
      state('show', style({
        opacity: 1,
        transform: "translateY(100%)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateY(0)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
    trigger('fade', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('show <=> hide', animate('2s ease-in-out')),
    ]),
    trigger('fade_', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  state = 'hide'

  isLoading = false;
  jobs?: IJob[];
  recruteurs?: IEmployer[] | null;
  totalItems = 0;
  item = "Jobs"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  statistic:IStatistic|null;
  private readonly destroy$ = new Subject<void>();

  candidat: ICandidat | null = null;

  constructor(protected frontService: FrontService, protected backService: BackService,
              protected activatedRoute: ActivatedRoute,public el: ElementRef,
              private localStorageService: LocalStorageService, private translateService: TranslateService,
              private sessionStorageService: SessionStorageService, private toaster: ToastrService,
              protected router: Router) {
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop
    const scrollPosition = window.pageYOffset

    if (scrollPosition >= componentPosition) {
      this.state = 'show'
    } else {
      this.state = 'hide'
    }

  }
  ngOnInit(): void {
    this.frontService.statistic().subscribe(
      (res: HttpResponse<IStatistic>) => {
        this.statistic = res.body
      },
      () => {
        this.onError();
      }
    );
    this.frontService.employerTop().subscribe(
      (res: HttpResponse<IEmployer[]>) => {
        this.recruteurs = res.body
      },
      () => {
        this.onError();
      }
    );
this.handleNavigation()
  }
  applyJob(job:any) {
    const item = {
      "candidat": this.candidat?.id,
      "offerJob": job
    }
    if (this.candidat==null){
      this.toaster.error(this.translateService.instant('internalServerError'), "Vous n'etes pas connecté");
    }else {
      this.frontService.applyJob(item)
        .subscribe((res: any) => {
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        }, err => {
          console.log(err);
          this.toaster.error(this.translateService.instant('internalServerError'), err.message);
        });
    }

  }
  protected handleNavigation(): void {
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

  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.frontService
      .jobLast({
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

  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? ASC : DESC)];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IJob[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    console.log(headers.get('content-type'))
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
      this.router.navigate(['/home'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.jobs = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sorted() {

  }
}
