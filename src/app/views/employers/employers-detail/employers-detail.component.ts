import {Component} from '@angular/core';
import {FrontService} from "../../../core/services/front.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {IEmployer} from "../../../core/models/employe.model";
import {IJob} from "../../../core/models/job.model";
import {ASC, ITEMS_PER_PAGE, SORT} from "../../../core/config/pagination.constants";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-employers-detail',
  templateUrl: './employers-detail.component.html',
  styleUrls: ['./employers-detail.component.scss']
})
export class EmployersDetailComponent {
  employer: IEmployer | null;
  jobs?: IJob[];
  ngbPaginationPage = 1;
  currentSearch: string;
  isLoading = false;
  totalItems = 0;
  item="Jobs"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  constructor(protected frontService: FrontService,protected activatedRoute: ActivatedRoute, protected router: Router) {}
  options: google.maps.MapOptions = {
    center: {lat: 40, lng: -20},
    zoom: 4
  };
  center: google.maps.LatLngLiteral = {lat: 40, lng: -20};
  zoom = 4;
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id)
    this.frontService.employerDetail(id as string).subscribe(
      (res: HttpResponse<IEmployer>) => {
        this.employer=res.body
        this.center= {lat: 40, lng: -20};
      },
      () => {
        // this.isLoading = false;
        this.onError();
      }
    );
    this.handleNavigation();
  }
  protected handleNavigation(): void {
    //combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap])
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      const pageNumber = page !== null ? +page : 1;
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      const predicate = sort[0];
      const ascending = sort[1] === ASC;
      const id=this.activatedRoute.snapshot.paramMap.get('id');
      if (pageNumber !== this.page) {
        this.loadPage(pageNumber, true,id!);
      }
    });
  }
  loadPage(page?: number, dontNavigate?: boolean,entreprise?:string): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;
    this.frontService
      .jobByEntreprise(entreprise,{
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
  private onError() {

  }
  protected sort(): string[] {
    return [];
  }
  protected onSuccess(data: IJob[] | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    console.log('###############################')
    console.log(headers.get('content-type'))
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    this.jobs = data ?? [];
    this.ngbPaginationPage = this.page;
  }


}
