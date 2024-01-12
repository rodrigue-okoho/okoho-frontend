import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FrontService} from "../../core/services/front.service";
import {ICandidat} from "../../core/models/candidat.model";
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from "../../core/config/pagination.constants";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {combineLatest} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Account} from "../../core/auth/account.model";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {AccountService} from "../../core/auth/account.service";

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.scss']
})
export class CandidatsComponent  implements OnInit {
  account: Account | null = null;
  zoom = 12;
  loading = false;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  candidats?: ICandidat[];
  currentSearch: string;
  isLoading = false;
  totalItems = 0;
  item="Candidats"
  itemsPerPage = ITEMS_PER_PAGE;
  page?: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  byresume: string="";
  bycategory: string="";
  bylocation: string="";
  bygender: string="";
  bydateposted: string="";
  byexperience: string="";
  byeducation: string="";
  public form: FormGroup;
  constructor( protected frontService: FrontService,
               private formBuilder: FormBuilder,
               private localStorageService: LocalStorageService, private translateService: TranslateService,
               private sessionStorageService: SessionStorageService, private toaster: ToastrService,
               protected activatedRoute: ActivatedRoute,private accountService: AccountService,
               protected router: Router,) {
    this.currentSearch = this.activatedRoute.snapshot.queryParams['search'] ?? '';
  }
  loadPage(page?: number, dontNavigate?: boolean): void {
    this.isLoading = true;
    const pageToLoad: number = page ?? this.page ?? 1;

    if (this.currentSearch) {
      this.frontService
        .candidatSearch({
          page: pageToLoad - 1,
          query: this.currentSearch,
          keyword: this.byresume,
          location: this.bylocation,
          category: this.bycategory,
          dateposted: this.bydateposted,
          education: this.byeducation,
          experience: this.byexperience,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe(
          (res: HttpResponse<ICandidat[]>) => {
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
      .candidatQuery({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<ICandidat[]>) => {
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

  search(query: string): void {
    this.currentSearch = query;
    this.loadPage(1);
  }

  ngOnInit(): void {
    this.handleNavigation();
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      category: ["", [Validators.required]],
      location: ["", [Validators.required]],
      intitule: ["", [Validators.required]],
      education: ["", [Validators.required]],
      date_posted: ["", [Validators.required]],
      experience: ["", [Validators.required]],
      frequency: ["", [Validators.required]],
      type: ["job", [Validators.required]],
      owner_id: ["", [Validators.required]],
    })
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
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

    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.ngbPaginationPage = this.page;
    if (navigate) {
      this.router.navigate(['/candidats'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          search: this.currentSearch,
          keyword: this.byresume,
          location: this.bylocation,
          category: this.bycategory,
          dateposted: this.bydateposted,
          education: this.byeducation,
          experience: this.byexperience,
          sort: this.predicate + ',' + (this.ascending ? ASC : DESC),
        },
      });
    }
    this.candidats = data ?? [];
    this.ngbPaginationPage = this.page;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }

  searchByResume($event: any) {
  console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.byresume = $event.target.value;
    this.loadPage(1);
  }

  searchByLocation($event: any) {
    console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.bylocation = $event.target.value;
    this.loadPage(1);
  }

  searchByCategory($event: any) {
    console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.bycategory = $event.target.value;
    this.loadPage(1);
  }

  searchByGender($event: any) {
      console.log($event.target.value)
    this.currentSearch=$event.target.value
    this.bygender = $event.target.value;
    this.loadPage(1);
  }

  searchByDatePosted($event: any) {
    if ($event.target.checked){
      console.log($event.target.value)
      this.currentSearch=$event.target.value
      this.bydateposted = $event.target.value;
      this.loadPage(1);
    }

  }

  searchByExperience($event: any) {
    if ($event.target.checked){
      console.log($event.target.value)
      this.currentSearch=$event.target.value
      this.byexperience = $event.target.value;
      this.loadPage(1);
    }
  }

  searchByEducation($event: any) {
    if ($event.target.checked){
      console.log($event.target.value)
      this.currentSearch=$event.target.value
      this.byeducation = $event.target.value;
      this.loadPage(1);
    }
  }

  recentView($event: any) {
    console.log($event.target.value)
  }

  showing($event: any) {
    console.log($event.target.value)
  }
  saveAlert() {
    if (this.account !=null){
      if (this.account.userType=="entreprise_account"){
        this.form.value.owner_id = this.account.id;
        this.form.value.education = this.byeducation;
        this.form.value.location = this.bylocation;
        this.form.value.experience = this.byexperience;
        this.form.value.date_posted = this.bydateposted;
        this.form.value.category = this.bycategory;
        this.form.value.intitule = this.currentSearch;
        console.log(this.form.value)
        this.frontService.alertSave(this.form.value)
          .subscribe((res: any) => {
            this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
            // this.loading = false;
          }, err => {
            this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.error.detail);
          });
      }

    }

  }
}
