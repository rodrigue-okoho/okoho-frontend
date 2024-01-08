import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivateService} from "../../../views/account/activate/activate.service";
import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {ActivatedRoute} from "@angular/router";
import {BackService} from "../../../core/services/back.service";
import {AccountService} from "../../../core/auth/account.service";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {HttpResponse} from "@angular/common/http";
import {Account} from "../../../core/auth/account.model";
import {ICandidat} from "../../../core/models/candidat.model";
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {SafeUrl} from '@angular/platform-browser';
import {IcategoryJob} from "../../../core/models/categoryJob.model";
import {countries} from "../../../core/util/country-data-store";
import {CountryISO} from "ngx-intl-tel-input";
import {Observable} from "rxjs";
import {MapDirectionsService} from "@angular/google-maps";
import {map} from "rxjs/operators";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public countries: any = countries;
  error = false;
  success = false;
  btn_status = false;
  account: Account | null = null;
  candidat: ICandidat | null = null;
  nameimage: any;
  place: any;
  private fileType: any;
  status = false;
  imageId: any = null;
  imageUrl: SafeUrl = '/assets/images/placeholder.png';
  salaryType: any;
  brancheForm: FormGroup;
  itemForm: FormGroup;
  itemSocialForm: FormGroup;
  itemContactForm: FormGroup;
  categories?: IcategoryJob[] | null;
  placehoder = "categories";
  center: google.maps.LatLngLiteral = {lat: 51.989858047086535, lng: 8.78541302551178};
  zoom = 4;
  directionResults:any

  circleCenter: google.maps.LatLngLiteral = {lat: 51.989858047086535, lng: 8.78541302551178};
  radius = 3;

  private canEditActivity: Boolean=false;

  isLoading0: Boolean = false;
  isLoading1: Boolean = false;
  isLoading2: Boolean = false;

  constructor(private activateService: ActivateService, private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService, private translateService: TranslateService,
              private sessionStorageService: SessionStorageService, private toaster: ToastrService,
              private modalService: NgbModal,private cd: ChangeDetectorRef,
              private route: ActivatedRoute, private backService: BackService,mapDirectionsService: MapDirectionsService,
              private accountService: AccountService,) {
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 51.989858047086535, lng: 8.78541302551178},
      origin: {lat: 51.989858047086535, lng: 8.78541302551178},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
      mapDirectionsService.route(request).subscribe((response:any)=>{
     this.directionResults=response.result
    })
  }

  E164PhoneNumber = '+237675066919';
  @ViewChild('f') f: NgForm;
  data = {mobile: "+237675066919"};
  CountryISO = CountryISO;
  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  ngOnInit(): void {
    this.E164PhoneNumber = "+237675066919"
    this.backService.categoryJobs().subscribe(
      (res: HttpResponse<IcategoryJob[]>) => {
        this.categories = res.body
      });
    this.brancheForm = this.formBuilder.group({
      branche: ["", [Validators.required]],
      experience: ["", [Validators.required]],
    })
    this.itemForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      placeofborn: ["", [Validators.required]],
      email: ["", [Validators.required]],
      categoryJobs: ["", Validators.required],
      phoneNumber: ["", [Validators.required]],
      codePhone: ["", [Validators.required]],
      country: ["", Validators.required],
      countryofborn: ["", Validators.required],
      qualification: ["", Validators.required],
      jobTitle: ["", Validators.required],
      educationLevel: ["", Validators.required],
      expectedSalary: ["", Validators.required],
      currentSalary: ["", Validators.required],
      salaryType: ["", Validators.required],
      experienceTime: ["", Validators.required],
      town: ["", Validators.required],
      description: ["", Validators.required],
      user_type: ["", Validators.required],
      age: ["", Validators.required],
      address: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      facebook: ["", Validators.required],
      linkedin: ["", Validators.required],
      twitter: ["", Validators.required],
      googleplus: ["", Validators.required],
      categories: ["", Validators.required],
      mode: [""],
    });
    this.itemSocialForm = this.formBuilder.group({
      email: ["", Validators.required],
      user_type: ["", Validators.required],
      facebook: ["", Validators.required],
      linkedin: ["", Validators.required],
      twitter: ["", Validators.required],
      googleplus: ["", Validators.required],
      mode: [""],
    });
    this.itemContactForm = this.formBuilder.group({
      country: ["", Validators.required],
      town: ["", Validators.required],
      address: ["", Validators.required],
      latitude: ["", Validators.required],
      longitude: ["", Validators.required],
      mode: [""],
    });
    this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.updateProfile();
  }

  private onError() {

  }

  onCountrySelected(country: any) {
    console.log(country);
  }

  private updateProfile() {
    this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
      (res: HttpResponse<ICandidat>) => {
        this.candidat = res.body
        this.btn_status = this.candidat?.userAccount?.firstName != null;
        this.itemForm = this.formBuilder.group({
          firstName: this.candidat?.userAccount?.firstName,
          lastName: this.candidat?.userAccount?.lastName,
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          placeofborn: this.candidat?.placeofborn,
          countryofborn:this.candidat?.countryofborn,
          gender: this.candidat?.gender,
          phoneNumber: this.candidat?.userAccount?.phoneNumber,
          codePhone: this.candidat?.userAccount?.codePhone,
          phone: this.candidat?.userAccount?.codePhone + this.candidat?.userAccount?.phoneNumber
          ,
          user_type: this.candidat?.userAccount?.userType,
          country: this.candidat?.country,
          qualification: this.candidat?.qualification,
          jobTitle: this.candidat?.jobTitle,
          educationLevel: this.candidat?.educationLevel,
          expectedSalary: this.candidat?.expectedSalary,
          currentSalary: this.candidat?.currentSalary,
          salaryType: this.candidat?.salaryType,
          experienceTime: this.candidat?.experienceTime,
          town: this.candidat?.town,
          description: this.candidat?.description,
          age: this.candidat?.age,
          dob: this.candidat?.dob,
          address: this.candidat?.userAccount?.codePhone,
          categoryJobs: this.candidat?.categoryJobs,
          mode: "profile",

        });
        this.itemSocialForm = this.formBuilder.group({
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          user_type: this.candidat?.userAccount?.userType,
          facebook: this.candidat?.facebook,
          twitter: this.candidat?.twitter,
          linkedin: this.candidat?.linkedin,
          googleplus: this.candidat?.googleplus,
          mode: "sociale",

        });
        this.itemContactForm = this.formBuilder.group({
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          user_type: this.candidat?.userAccount?.userType,
          country: this.candidat?.country,
          town: this.candidat?.town,
          address: this.candidat?.userAccount?.address,
          latitude: this.candidat?.userAccount?.latitude,
          longitude: this.candidat?.userAccount?.longitude,
          mode: "contact",

        });
        //this.itemForm.value.phone.dialCode=this.candidat?.userAccount?.codePhone
        console.log(this.itemForm.value.phone);
      },
      () => {
        // this.isLoading = false;
        this.onError();
      }
    )
  }

  countryChange() {
    console.log("test")
  }

  saveProfile() {
    this.isLoading0 = true;
    this.itemForm.value.phoneNumber = this.itemForm.value.phone.number;
    this.itemForm.value.codePhone = this.itemForm.value.phone.dialCode;
    this.backService.candidatSaveProfile(this.itemForm.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
        this.isLoading0 = false;
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.error.detail);
      });
      this.isLoading0 = false;
  }

  saveSociale() {
    this.isLoading1 = true;
    console.log(this.itemSocialForm.value)
    this.backService.candidatSaveProfile(this.itemSocialForm.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
        this.isLoading1 = false;
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
      this.isLoading1 = false;
  }

  saveContact() {
    this.isLoading2 = true;
    console.log(this.itemContactForm.value)
    this.backService.candidatSaveProfile(this.itemContactForm.value)
      .subscribe((res: any) => {
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.updateProfile();
        this.isLoading2 = false;
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('MESSAGES.SAVE_ERROR'), err.message);
      });
      this.isLoading2 =false;
  }

  uploadCv(event: any) {
    const file = event.target.files[0];
    this.status = event.target.files.length > 0;
    if (this.status === true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader?.result;
        this.fileType = file.type;
        this.nameimage = file.name;
        const values = {
          mode: "image",
          id: this.candidat?.id,
          email: this.candidat?.userAccount?.email,
          user_type: this.candidat?.userAccount?.userType,
          imageUrl: reader.result,
          name: file.name,
          type: file.type,
        };
        this.backService.candidatUploadImage(values).subscribe((result: any) => {
          this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
          this.imageId = result.id;
          this.accountService.fetch().subscribe(account => (this.account = account));
        });
      };
    }
  }

  ngAfterViewInit(): void {
    this.data = {mobile: '+237675066919'};
  }

  onchange() {
    console.log("test")
  }

  searchPosition() {

  }

  openLg(contentAddress: any) {
    this.brancheForm.reset();
    this.modalService.open(contentAddress, { size: 'lg' });
  }

  closeModal(modal:NgbActiveModal) {
    this.brancheForm.reset();
    modal.close('Close click')
  }

  saveActivity() {
    if(!this.canEditActivity) {
      this.brancheForm.value.id = null;
      this.brancheForm.value.owner_id = this.candidat?.id;
    }
    console.log(this.brancheForm.value)
    this.backService.candidateAddLanguage(this.brancheForm.value)
      .subscribe((res: any) => {
        this.backService.candidatProfile(this.localStorageService.retrieve('account_id')).subscribe(
          (res: HttpResponse<ICandidat>) => {
            this.candidat = res.body})
        this.toaster.success(this.translateService.instant('MESSAGES.SAVE_SUCCESS'), 'OK');
        this.brancheForm.reset();
        this.modalService.dismissAll();
      }, err => {
        console.log(err);
        this.toaster.error(this.translateService.instant('error.MESSAGES.SAVE_ERROR'), err.message);
      });
    this.canEditActivity = false;
  }
}
