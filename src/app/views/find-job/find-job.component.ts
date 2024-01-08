import {Component, OnInit} from '@angular/core';
import {IEmployer} from "../../core/models/employe.model";
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "../../core/config/pagination.constants";
import {FrontService} from "../../core/services/front.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {ICandidat} from "../../core/models/candidat.model";
import {combineLatest} from "rxjs";
import {IJob} from "../../core/models/job.model";

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent  implements OnInit {
  jobs?: IJob[];
  currentSearch: string;
  location:string;
  isLoading = false;
  totalItems = 0;
  item="Jobs"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  bycategory: string="";
  bycity: string="";
  keyword: string="";
  byexperience: string="";
  bysalary: string="";
  bydateposted: string="";
  bytype: string="";
  constructor( protected frontService: FrontService,
               protected activatedRoute: ActivatedRoute,
               protected router: Router,) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
    this.location = this.activatedRoute.snapshot.queryParams['location'] ?? '';
  }
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    if (this.currentSearch) {
      this.frontService
        .jobSearch({
          page: pageToLoad - 1,
          query: this.currentSearch,
          location: this.location,
          category: this.bycategory,
          experience: this.byexperience,
          dateposted: this.bydateposted,
          salary: this.bysalary,
          type: this.bytype,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe(
          (res: HttpResponse<IEmployer[]>) => {
            this.isLoading = false;
            this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          },
          () => {
            this.isLoading = false;
            this.onError();
          }
        );
      return;
    }

    this.frontService
      .jobQuery({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IJob[]>) => {
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

  search($event: any): void {
    this.currentSearch = "search";
    this.currentSearch=$event.target.value
    this.loadPage(1);
  }

  ngOnInit(): void {
    this.handleNavigation();
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

  protected onSuccess(data: IJob[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    console.log('###############################')
    console.log(headers.get('content-type'))
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
      this.router.navigate(['/find-job'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          search: this.currentSearch,
          location: this.bycity,
          category: this.bycategory,
          experience: this.byexperience,
          dateposted: this.bydateposted,
          salary: this.bysalary,
          type: this.bytype,
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
  searchByCity($event: any) {
    console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.bycity = $event.target.value;
    this.loadPage(1);
  }
  searchByExperience($event: any) {
    console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.byexperience = $event.target.value;
    this.loadPage(1);
  }

  searchByDatePosted($event: any) {
    console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.bydateposted = $event.target.value;
    this.loadPage(1);
  }

  searchByJobType($event: any) {
    if ($event.target.checked){
      console.log($event.target.value)
      this.currentSearch=$event.target.value
      this.bytype = $event.target.value;
      this.loadPage(1);
    }

  }

  searchBySalary($event: any) {
    console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.bytype = $event.target.value;
    this.loadPage(1);
  }

  sorted() {

  }
}
